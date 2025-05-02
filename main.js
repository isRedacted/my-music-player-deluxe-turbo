import { app, BrowserWindow } from 'electron';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import * as templates from './scripts/window_templates.js';
import * as settings from './scripts/handlers/settings.js';
import { registerIPCHandlers } from './scripts/handlers/ipc.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
let win;
const preloadDir = join(__dirname, 'scripts', 'preload.js');

const createInitialWindow = () => {
	if (settings.checkLibraryDir()) {
		win = new BrowserWindow(templates.mainTemplate);
		win.loadFile('./pages/index.html')
	} else {
		win = new BrowserWindow(templates.defaultTemplate);
		win.loadFile('./pages/no_library.html');
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