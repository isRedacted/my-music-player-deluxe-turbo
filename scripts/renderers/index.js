import { join } from "path";

const rootDir = await window.electronAPI.rootDir();

// TODO: Populate with pages
async function populateBody() {
    const settings = await window.electronAPI.readSettings();
    // TODO: Check settings for last window else default to home
    const sidebar = await fetch(join(rootDir, 'pages', 'sidebar.html'));
}

document.addEventListener('DOMContentLoaded', populateBody);