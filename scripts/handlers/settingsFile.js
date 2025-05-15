import { app } from 'electron';
import { existsSync, readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

const rootDir = app.getAppPath();

const settingsFile = join(rootDir, 'settings.json');

// Read settings and return JSON object, throw an error if not found
export function readSettingsFile(key) {
	const settings = (readFileSync(settingsFile, { encoding: 'utf-8' }));
	const settingsJSON = JSON.parse(settings);
	if (key) {
		return settingsJSON[key]
	} else {
		return settingsJSON
	}
};
// Read settings and write to file
export function writeSettingsFile(key, value) {
	let settings = {};
	if (settingsFileExists()) {
		settings = readSettingsFile();
	}
	settings[key] = value;
	writeFileSync(settingsFile, JSON.stringify(settings, undefined, 4));
};
// Check if settings exists
export function settingsFileExists() {
	return existsSync(settingsFile);
};
// Get settings file and open main window, or open library dialog window if (settings file doesn't exist / libraryDir not in settings / libraryDir no longer exists)
export function checkLibraryDir() {
	let settingsJSON = {};
	try {
		settingsJSON = readSettingsFile();
	} finally {
		const libraryDir = settingsJSON['libraryDir'];
		return settingsExists() && settingsJSON.hasOwnProperty('libraryDir') && existsSync(libraryDir);
	}
}