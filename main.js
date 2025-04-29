const electron = require('electron');
const app = electron.app;
const fs = require('fs');
const windowManager = require('electron-window-manager')
const settingsFile = '/settings.json'

const createInitialWindow = () => {
	var library = '';
	windowManager.setDefaultSetup(
		{
			'width': 640,
			'height': 360
		}
	);

	// Get settings file, or open library dialog if non existent
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
		windowManager.open(undefined, undefined, '/index.html', false, {
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
})

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit();
	}
})