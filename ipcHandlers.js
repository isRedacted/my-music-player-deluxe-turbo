const ipcMain = require('electron');
const fs = require('fs');

// Folder select handler
function registerIpcHandlers() {
    ipcMain.handle('dialog:openFolder', async () => {
        const result = await dialog.showOpenDialog({
            title: 'Select Music Library Folder',
            defaultPath: app.getPath('music'),
            properties: ['openDirectory']
        });
        return result.canceled ? null : result.filePaths[0];
    });

    // Handle JSON read/write operations
    ipcMain.handle('read-json', () => {
        const data = JSON.parse(fs.readFileSync(jsonFile, 'utf-8'))
    });
}
module.exports = registerIpcHandlers;