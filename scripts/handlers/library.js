import recursiveReadDir from 'recursive-readdir';
import { readSettings, settingsExists } from './settings.js';

let libraryDir;

if (settingsExists()) {
    libraryDir = readSettings('libraryDir');
}

// Read and return files recursively in a folder, with arguments for an array of extension(s).
// Extension format is just the letters e.g. 'm3u'
// TODO: Fix extension whitelisting
export async function readLibraryFiles(ext) {
    if (libraryDir === undefined) {
        libraryDir = readSettings('libraryDir');
    }
    let extSearch = '*.{';
    extSearch = extSearch + ext.join(', ') + '}';
    console.log(extSearch);

    const libraryFiles = await recursiveReadDir(libraryDir, [extSearch]);
    return libraryFiles;
}