const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
    selectFolder: () => ipcRenderer.invoke('dialog:openFolder'),
    writeSettings: (key, value) => ipcRenderer.send('write-settings', key, value),
    readSettings: (key) => ipcRenderer.invoke('read-settings', key),
    openMainWindow: () => ipcRenderer.send('open-main-window'),
    rootDir: () => ipcRenderer.invoke('root-dir')
});