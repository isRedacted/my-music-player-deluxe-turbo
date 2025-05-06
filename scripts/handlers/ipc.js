import { ipcMain, dialog, app, BrowserWindow } from 'electron';
import { join } from 'path';
import * as settings from './settings.js';
import * as templates from '../window_templates.js';

const rootDir = app.getAppPath();

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
	ipcMain.handle('read-settings', (event, key) => {
		return settings.readSettings(key);
	});
	ipcMain.on('write-settings', (event, key, value) => {
		settings.writeSettings(key, value);
	});

	// Open main window
	ipcMain.on('open-main-window', () => {
		win.close();
		win = new BrowserWindow(templates.mainTemplate);
		win.loadFile(join(rootDir, 'pages', 'index.html'));
		win.once('ready-to-show', () => {
			win.show();
		})
	});

	// Send the app root directory to the renderer
	ipcMain.handle('root-dir', () => {
		return rootDir;
	});

	// Return a joined url
	ipcMain.handle('join', (event, ...paths) => {
		return join(...paths);
	});

	// Read and return files recursively in a folder, with arguments for extension(s)
	ipcMain.handle('read-library-files', (event, path, ...ext) => {
	});
}