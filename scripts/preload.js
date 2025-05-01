const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
    selectFolder: () => ipcRenderer.invoke('dialog:openFolder'),
    writeSettings: (key, value) => ipcRenderer.invoke('write-settings', key, value),
    readSettings: () => ipcRenderer.invoke('read-settings'),
    openMainWindow: () => ipcRenderer.send('open-main-window')
});