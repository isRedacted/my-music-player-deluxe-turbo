import { fdir } from 'fdir';
import { readSettingsFile, settingsExists } from './settings.js';

let libraryDir;

if (settingsExists()) {
    libraryDir = readSettingsFile('libraryDir');
}

// Read and return files recursively in a folder, with arguments for an array of extension(s).
// Extension format is just the letters e.g. 'm3u'
// TODO: Fix extension whitelisting to include multiple extensions
export async function readLibraryFiles(ext) {
    if (libraryDir === undefined) {
        libraryDir = readSettingsFile('libraryDir');
    }
    let extSearch = '!*.{';
    extSearch = extSearch + ext.join(', ') + '}';

    const libraryFiles = await new fdir()
    .filter((path) => path.endsWith(ext))
    .withRelativePaths()
    .crawl(libraryDir)
    .withPromise();
    
    return libraryFiles;
}