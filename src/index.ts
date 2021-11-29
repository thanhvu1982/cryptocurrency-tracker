import { app, BrowserWindow, Tray } from 'electron';
import path from 'path';
import isDev from 'electron-is-dev';

declare const MAIN_WINDOW_WEBPACK_ENTRY: string;

let tray: Tray;
let window: BrowserWindow;

if (require('electron-squirrel-startup')) {
  app.quit();
}

const createWindow = (): void => {
  window = new BrowserWindow({
    height: 500,
    width: isDev ? 1000 : 330,
    show: false,
    frame: false,
    fullscreenable: false,
    resizable: false,
  });

  window.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);
  window.webContents.openDevTools();

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
  tray = new Tray(path.join(__dirname, '../../assets/icon.png'));
  tray.on('click', () => {
    if (window.isVisible()) {
      window.hide();
    } else {
      showWindow();
    }
  });
};

app.dock.hide();

app.on('ready', () => {
  createTray();
  createWindow();
});
