const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
    selectFolder: () => ipcRenderer.invoke('dialog:openFolder'),
    writeSettingsFile: (key, value) => ipcRenderer.send('write-settings-file', key, value),
    readSettingsFile: (key) => ipcRenderer.invoke('read-settings-file', key),
    openMainWindow: () => ipcRenderer.send('open-main-window'),
    rootDir: () => ipcRenderer.invoke('root-dir'),
    join: (...paths) => ipcRenderer.invoke('join', ...paths),
    basename: (filePath) => ipcRenderer.invoke('basename', filePath),
    readLibraryFiles: (ext) => ipcRenderer.invoke('read-library-files', ext)
});