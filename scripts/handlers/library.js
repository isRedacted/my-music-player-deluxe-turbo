import { fdir } from 'fdir';
import { readSettings, settingsExists } from './settings.js';

let libraryDir;

if (settingsExists()) {
    libraryDir = readSettings('libraryDir');
}

// Read and return files recursively in a folder, with arguments for an array of extension(s).
// Extension format is just the letters e.g. 'm3u'
// TODO: Fix extension whitelisting to include multiple extensions
export async function readLibraryFiles(ext) {
    if (libraryDir === undefined) {
        libraryDir = readSettings('libraryDir');
    }
    let extSearch = '!*.{';
    extSearch = extSearch + ext.join(', ') + '}';

    const libraryFiles = await new fdir()
    .filter((path, isDirectory) => path.endsWith(ext))
    .withRelativePaths()
    .crawl(libraryDir)
    .withPromise();

    console.log(libraryFiles);
    
    return libraryFiles;
}