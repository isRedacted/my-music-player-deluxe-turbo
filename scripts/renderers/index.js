const sidebar = document.getElementById('sidebar');
const mainContentArea = document.getElementById('main-content-area');

// TODO: Populate with pages
async function populateBody() {
    const rootDir = await window.electronAPI.rootDir();
    const sidebarURL = await window.electronAPI.join(rootDir, 'pages', 'sidebar.html');
    // TODO: Use fetch to load sidebar
    // TODO: Check settings for last window else default to home (WILL DO WHEN PLAYLIST VIEWS ARE IMPLEMENTED)
}

document.addEventListener('DOMContentLoaded', populateBody);