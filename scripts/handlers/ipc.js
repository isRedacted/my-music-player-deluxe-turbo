import { ipcMain, dialog, app } from 'electron';
import * as settings from './settings.js';
import * as templates from '../window_templates.js';

export function registerIPCHandlers(win) {
	// Folder select handler
	ipcMain.handle('dialog:openFolder', async () => {
		const result = await dialog.showOpenDialog({
			title: 'Select Music Library Folder',
			defaultPath: app.getPath('music'),
			properties: ['openDirectory']
		});
		return result.canceled ? null : result.filePaths[0];
	});
	// Handle JSON read/write operations
	ipcMain.handle('read-settings', (event) => {
		return settings.readSettings();
	});
	ipcMain.handle('write-settings', (event, key, value) => {
		settings.writeSettings(key, value);
	});
	// Open main window
	ipcMain.on('open-main-window', (event) => {
		//TODO: Close the library window and open the main window
	});
}