import { app, BrowserWindow, ipcMain, Menu, Tray } from 'electron';
import * as installer from 'electron-devtools-installer';
import isDev from 'electron-is-dev';
import * as path from 'path';
import { fetchCurrencies } from './apis/coinmarketcapApis';
import Store from 'electron-store';
import Websocket from 'ws';
import { COINMARKETCAP_SOCKET } from './constants/configs';
import { Price, PriceResponse } from './models/Price';
import { Observable, Subscriber } from 'rxjs';

declare const MAIN_WINDOW_WEBPACK_ENTRY: string;
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string;
const TRACKED_CURRENCY_IDS = 'trackedCurrencyIds';

const store = new Store({
  schema: {
    trackedCurrencyIds: {
      type: 'string',
      default: '[]',
    },
  },
});

let tray: Tray;
let window: BrowserWindow;

if (require('electron-squirrel-startup')) {
  app.quit();
}

const installExtensions = async () => {
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS;

  return Promise.all([
    installer.default(installer.REDUX_DEVTOOLS, forceDownload),
    installer.default(installer.REACT_DEVELOPER_TOOLS, forceDownload),
  ]);
};

const createWindow = (): void => {
  window = new BrowserWindow({
    height: 420,
    width: isDev ? 1000 : 376,
    show: false,
    frame: false,
    fullscreenable: false,
    resizable: isDev,
    webPreferences: {
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
    },
  });

  window.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);
  if (isDev) window.webContents.openDevTools();

  window.on('blur', () => {
    if (!window.webContents.isDevToolsOpened()) {
      window.hide();
    }
  });
};

const showWindow = (): void => {
  const windowBounds = window.getBounds();
  const trayBounds = tray.getBounds();

  const x = Math.round(
    trayBounds.x + trayBounds.width / 2 - windowBounds.width / 2,
  );
  const y = Math.round(trayBounds.y + trayBounds.height + 4);
  window.setPosition(x, y, false);
  window.show();
};

const createTray = (): void => {
  tray = new Tray(path.resolve(__dirname, 'assets/icon.png'));
  tray.on('click', () => {
    if (window.isVisible()) {
      window.hide();
    } else {
      showWindow();
    }
  });
  const contextMenu = Menu.buildFromTemplate([
    { label: 'Quit', type: 'normal', click: () => app.quit() },
  ]);
  tray.on('right-click', () => {
    tray.popUpContextMenu(contextMenu);
  });
};

app.dock.hide();

app.on('ready', async () => {
  createTray();
  if (isDev) await installExtensions();

  const currencies = await fetchCurrencies();
  let trackedCurrencyIds = JSON.parse(
    (store.get(TRACKED_CURRENCY_IDS) || '[]') as string,
  );
  let trackedCurrencyPrices: Price[] = [];
  let trackedCurrencyIdsSubscriber: Subscriber<number[]>;

  const trackedCurrencyIdsObservable = new Observable<number[]>(
    (subscriber) => {
      trackedCurrencyIdsSubscriber = subscriber;
    },
  );

  let ws: Websocket;

  const initWs = (currencyIds: number[]) => {
    ws?.close();

    const _ws = new Websocket(COINMARKETCAP_SOCKET, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.55 Safari/537.36',
      },
    });

    _ws.on('open', () => {
      _ws.send(
        JSON.stringify({
          method: 'subscribe',
          id: 'price',
          data: {
            cryptoIds: currencyIds,
            index: null,
          },
        }),
      );
    });

    _ws.on('error', () => {
      app.quit();
    });

    return _ws;
  };

  ws = initWs(trackedCurrencyIds);

  const trackedCurrencyPricesObservable = new Observable<Price[]>(
    (subscriber) => {
      const listen = () => {
        ws.on('message', (data) => {
          const price = JSON.parse(data.toString('utf8')) as PriceResponse;
          const foundTrackedPriceId = trackedCurrencyPrices.findIndex(
            (p) => p.id === price.d.cr.id,
          );
          if (foundTrackedPriceId === -1)
            trackedCurrencyPrices.push(price.d.cr);
          else trackedCurrencyPrices[foundTrackedPriceId] = price.d.cr;
          subscriber.next(trackedCurrencyPrices);
        });
      };
      listen();

      trackedCurrencyIdsObservable.subscribe({
        next(ids) {
          ws = initWs(ids);
          listen();
        },
      });
    },
  );

  ipcMain.on('ready', (event) => {
    event.reply('ready', {
      currencies,
      trackedCurrencyIds,
      trackedCurrencyPrices,
    });
  });

  ipcMain.on('updateTrackedCurrencyIds', (event, data) => {
    trackedCurrencyIds = data;
    store.set(TRACKED_CURRENCY_IDS, JSON.stringify(data));
    trackedCurrencyPrices = trackedCurrencyPrices.filter((p) =>
      trackedCurrencyIds.includes(p.id),
    );
    trackedCurrencyIdsSubscriber.next(data);
  });

  ipcMain.on('updatePrice', (event) => {
    trackedCurrencyPricesObservable.subscribe({
      next(prices) {
        event.reply('updatePrice', prices);
      },
    });
  });

  createWindow();
});
