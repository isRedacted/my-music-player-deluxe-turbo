import { existsSync, readFileSync, writeFileSync } from 'fs';

const settingsFile = '../../settings.json';

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
	existsSync(settingsFile);
};