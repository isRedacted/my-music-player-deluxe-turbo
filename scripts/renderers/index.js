const sidebar = document.getElementById('sidebar');
const mainContentArea = document.getElementById('main-content-area');

async function populateBody() {
    const rootDir = await window.electronAPI.rootDir();
    const sidebarURL = await window.electronAPI.join(rootDir, 'pages', 'sidebar.html');
    const sidebarFetch = await fetch(sidebarURL);
    sidebar.innerHTML = await sidebarFetch.text();
    // TODO: Check settings for last window else default to home (WILL DO WHEN PLAYLIST VIEWS ARE IMPLEMENTED)
}

// TODO: Functions to change window to home and to different playlists
function toHome(){
    
};

function toPlaylist(playlistURL) {

};

document.addEventListener('DOMContentLoaded', populateBody);