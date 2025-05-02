import { join } from 'path';
import { rootDir } from '../paths.js';

const preloadDir = join(rootDir, 'scripts', 'preload.js');

export const defaultTemplate = {
    width: 640,
    height: 360,
    show: false,
    resizable: true,
    backgroundColor: '#232323',
    webPreferences: {
        preload: preloadDir
    }
};
export const mainTemplate = {
    width: 1280,
    height: 720,
    resizable: true,
    minWidth: 640,
    minHeight: 360,
    show: false,
    backgroundColor: '#232323',
    webPreferences: {
        preload: preloadDir
    }
};
