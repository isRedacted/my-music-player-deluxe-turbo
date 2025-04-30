const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
    selectFolder: () => ipcRenderer.invoke('dialog:openFolder'),
    readJSON: () => ipcRenderer.invoke('read-json'),
    writeJSON: (data) => ipcRenderer.invoke('write-json', data)
});