import { app, BrowserWindow } from 'electron';
import { join } from 'path';
import * as templates from './scripts/window_templates.js';
import * as settings from './scripts/handlers/settings.js';
import { registerIPCHandlers } from './scripts/handlers/ipc.js';

let win;
const preloadDir = join()

const createInitialWindow = () => {
	// Get settings file and open main window, or open library dialog window if non existent
	const settingsJSON = settings.readSettings();
	if (!settingsJSON.hasOwnProperty('libraryDir') || !settings.exists()) {
		win = new BrowserWindow(templates.defaultTemplate);
		win.loadFile('./pages/no_library.html')
	} else {
		win = new BrowserWindow(templates.mainTemplate);
		win.loadFile('./pages/index.html')
	}
	win.once('ready-to-show', () => {
		win.show();
	})
}

app.whenReady().then(() => {
	createInitialWindow();
	registerIPCHandlers(win);

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