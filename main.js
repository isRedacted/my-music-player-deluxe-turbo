const { app, ipcMain, dialog } = require('electron');
const path = require('path');
const windowManager = require('electron-window-manager');
const fs = require('fs');
const registerIpcHandlers = require('./ipcHandlers')

const settingsFile = './settings.json';

const createInitialWindow = () => {
	var library = '';
	windowManager.setDefaultSetup(
		{
			'width': 640,
			'height': 360,
			'showDevTools': true,
			'webPreferences': {
				'preload': path.join(__dirname, 'preload.js')
			}
		}
	);

	// Get settings file and open main window, or open library dialog window if non existent
	if (fs.existsSync(settingsFile)) {
		fs.readFile(settingsFile, 'utf-8', (err, data) => {
			if (err) {
				console.error('Something has gone catastrophically wrong:', err);
				return;
			} else {
				var settings = JSON.parse(data);
				library = settings.library
			}
		})
		windowManager.open(undefined, undefined, '/index.html', {
			'width': 1280,
			'height': 720,
			'resizable': true
		});
	} else {
		windowManager.open(undefined, undefined, '/no_library.html');
	}
}

app.on('ready', () => {
	windowManager.init();
	createInitialWindow();
	registerIpcHandlers();
})

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit();
	}
})