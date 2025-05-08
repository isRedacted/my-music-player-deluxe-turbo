import recursiveReadDir from 'recursive-readdir';

const libraryDir = settings.readSettings('libraryDir');

// Ignore function to not return directories or non-matching extensions
function ignoreFunc(file, stats, ext) {
    return !stats.isDirectory() && !file.endsWith(ext);
}

// Read and return files recursively in a folder, with arguments for extension(s). WILL throw an 
// Extension format is just the letters e.g. 'm3u'
function searchLibrary(ext) {
    const files = fs.readdirSync(libraryDir);
    let fileList = [];

    for (const file of files) {
        const filePath = path.join(libraryDir, file);
        const stat = fs.statSync(filePath);

        if (stat.isDirectory()) {
            readDirectoryRecursive(filePath, ext, fileList); // Recursive call for subdirectories
        } else if (ext.includes(path.extname(file)) === `.${ext}`) {
            fileList.push(filePath);
        }
    }

    return fileList;
}