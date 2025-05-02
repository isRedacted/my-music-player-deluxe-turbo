import { existsSync, readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const settingsFile = join(__dirname, '..', '..', 'settings.json');

// Read settings and return JSON object, throw an error if not found
export function readSettings() {
	try {
		const settings = (readFileSync(settingsFile, { encoding: 'utf-8' }));
		return JSON.parse(settings);
	} catch (e) {
		return {};
	}
};
// Read settings and write to file
export function writeSettings(key, value) {
	const settings = readSettings();
	settings[key] = value;
	writeFileSync(settingsFile, JSON.stringify(settings, undefined, 4));
};
// Check if settings exists
export function exists() {
	return existsSync(settingsFile);
};
// Get settings file and open main window, or open library dialog window if (settings file doesn't exist / libraryDir not in settings / libraryDir no longer exists)
export function checkLibraryDir() {
	const settingsJSON = readSettings();
	const libraryDir = settingsJSON['libraryDir'];
	return exists() && settingsJSON.hasOwnProperty('libraryDir') && existsSync(libraryDir);
}