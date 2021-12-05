import { contextBridge, ipcRenderer } from 'electron';

export const api = {
  on: (channel: string, callback?: (data: any) => any) => {
    ipcRenderer.on(channel, (_, data) => callback(data));
  },
  send: (channel: string, data?: any) => {
    ipcRenderer.send(channel, data);
  },
};

contextBridge.exposeInMainWorld('Main', api);
