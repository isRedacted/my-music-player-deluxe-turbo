import { ipcMain, dialog, app, BrowserWindow } from 'electron';
import { basename, extname, join } from 'path';
import * as settingsFile from './settings.js';
import * as templates from '../window_templates.js';
import { readLibraryFiles } from './library.js';

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

	// Handle JSON settings read/write operations
	ipcMain.handle('read-settings-file', (event, key) => {
		return settingsFile.readSettingsFile(key);
	});
	ipcMain.on('write-settings-file', (event, key, value) => {
		settingsFile.writeSettingsFile(key, value);
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

	// Return url basename
	ipcMain.handle('basename', (event, filePath) => {
		return basename(filePath, extname(filePath));
	});

	// Read library files of an array of extensions
	ipcMain.handle('read-library-files', (event, ext) => {
		return readLibraryFiles(ext);
	});
}