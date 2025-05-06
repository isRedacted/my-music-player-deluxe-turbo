import { app } from 'electron';
import { existsSync, readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

const rootDir = app.getAppPath();

const settingsFile = join(rootDir, 'settings.json');

// Read settings and return JSON object, throw an error if not found
export function readSettings(key) {
	const settings = (readFileSync(settingsFile, { encoding: 'utf-8' }));
	const settingsJSON = JSON.parse(settings);
	if (key) {
		return settingsJSON[key]
	} else {
		return settingsJSON
	}
};
// Read settings and write to file
export function writeSettings(key, value) {
	let settings = {}
	try {
		settings = readSettings();
	} catch (e) { }
	finally {
		settings[key] = value;
		writeFileSync(settingsFile, JSON.stringify(settings, undefined, 4));
	}
};
// Check if settings exists
export function exists() {
	return existsSync(settingsFile);
};
// Get settings file and open main window, or open library dialog window if (settings file doesn't exist / libraryDir not in settings / libraryDir no longer exists)
export function checkLibraryDir() {
	let settingsJSON = {};
	try {
		settingsJSON = readSettings();
	} finally {
		const libraryDir = settingsJSON['libraryDir'];
		return exists() && settingsJSON.hasOwnProperty('libraryDir') && existsSync(libraryDir);
	}
}