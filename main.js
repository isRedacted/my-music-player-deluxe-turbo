import { app, BrowserWindow } from 'electron';
import { join } from 'path';
import * as templates from './scripts/window_templates.js';
import * as settingsFile from './scripts/handlers/settingsFile.js';
import { registerIPCHandlers } from './scripts/handlers/ipc.js';

const rootDir = app.getAppPath();
let win;

const createInitialWindow = () => {
	// TODO: Fix this nested if statement...somehow
	if (settingsFile.settingsFileExists()) {
		if (settingsFile.readSettingsFile('libraryDir')) {
			win = new BrowserWindow(templates.mainTemplate);
			win.loadFile(join(rootDir, 'pages', 'index.html'));
		} else {
			win = new BrowserWindow(templates.defaultTemplate);
			win.loadFile(join(rootDir, 'pages', 'no_library.html'));
		}
	} else {
		win = new BrowserWindow(templates.defaultTemplate);
		win.loadFile(join(rootDir, 'pages', 'no_library.html'));
	}

	win.once('ready-to-show', () => {
		win.show();
	});
	registerIPCHandlers(win);
}

app.whenReady().then(() => {
	createInitialWindow();

	app.on('activate', () => {
		if (BrowserWindow.getAllWindows().length === 0) {
			createInitialWindow();
		}
	});
});

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit();
	}
});