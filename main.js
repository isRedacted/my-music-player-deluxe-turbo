const { app, ipcMain, dialog } = require('electron');
const path = require('path');
const windowManager = require('electron-window-manager');
const fs = require('fs');
const { error } = require('console');
const { workerData } = require('worker_threads');

const settingsFile = path.join(__dirname, '/settings.json');
// Read settings, throw an error if not found
function readSettings() {
	const settings = (fs.readFileSync(settingsFile, { encoding: 'utf-8' }));
	return JSON.parse(settings);
}
// Read settings and/or write to file
function writeSettings(key, value) {
	let settings = {};
	try {
		settings = readSettings();
	} finally {
		settings[key] = value;
		fs.writeFileSync(settingsFile, JSON.stringify(settings));
	}
}

// Set window templates
windowManager.setDefaultSetup(
	{
		'width': 640,
		'height': 360,
		'webPreferences': {
			'preload': path.join(__dirname, 'preload.js')
		}
	}
);
windowManager.templates.set('main', {
	'width': 1280,
	'height': 720,
	'resizable': true,
	'webPreferences': {
		'preload': path.join(__dirname, 'preload.js')
	}
});

const createInitialWindow = () => {

	// Get settings file and open main window, or open library dialog window if non existent
	try {
		let settings = readSettings();
		if (!settings.hasOwnProperty('libraryDir')) {
			throw new Error
		} else {
			windowManager.open('main', false, '/index.html', 'main');
		}
	} catch (err) {
		windowManager.open('noLibrary', false, '/no_library.html');
	}
}

// IPC api handlers
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
ipcMain.handle('write-settings-sync', (event, key, value) => {
	let settings;
	try {
		settings = readSettings();
	} catch (err) {
		settings = {};
	}
	settings[key] = value;
	fs.writeFileSync(settingsFile, JSON.stringify(settings));
})

// Open new window
ipcMain.on('open-main-window', (event) => {
	//TODO: Close the library window and open the main window
	windowManager.closeAll();
	windowManager.createNew(undefined, undefined, '/index.html', false, {
		'width': 1280,
		'height': 720,
		'resizable': true
	});
})

app.on('ready', () => {
	windowManager.init();
	createInitialWindow();
});

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit();
	}
});