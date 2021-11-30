import { app, BrowserWindow, Menu, Tray } from 'electron';
import * as installer from 'electron-devtools-installer';
import isDev from 'electron-is-dev';
import path from 'path';

declare const MAIN_WINDOW_WEBPACK_ENTRY: string;

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
    resizable: false,
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
  if (isDev) await installExtensions();
  createTray();
  createWindow();
});
