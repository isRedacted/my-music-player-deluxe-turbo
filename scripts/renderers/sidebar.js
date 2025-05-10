const playlistContainer = document.getElementById('playlist-container');

// What will populate the sidebar
function playlistTemplate(name, playlistUrl) {
    const entryTemplate = `<div class="clickable playlist-button" url="${playlistUrl}"><img class="object-none" src="../assets/music_note.svg"><p class="playlist-button-text" title="${name}">${name}</p></div>`;
    return entryTemplate;
}

// Place all found playlists into an array, call the playlist template function, and insert the finished array into the html playlist container
async function populatePlaylists() {
    const playlistFiles = await window.electronAPI.readLibraryFiles(['m3u']);
    let playlistString = [];
    for (let p of playlistFiles) {
        const pBasename = await window.electronAPI.basename(p);
        playlistString.push(playlistTemplate(pBasename, p));
    }
    playlistContainer.innerHTML = playlistString.join('');
};

// TODO: Have function swap main content area view to chosen playlist, or library if undefined
function entryClicked(playlistUrl) {

};

populatePlaylists();