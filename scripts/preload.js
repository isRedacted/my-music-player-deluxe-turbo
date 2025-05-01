const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
    selectFolder: () => ipcRenderer.invoke('dialog:openFolder'),
    writeSettingsSync: (key, value) => ipcRenderer.invoke('write-settings-sync', key, value),
    openMainWindow: () => ipcRenderer.send('open-main-window')
});