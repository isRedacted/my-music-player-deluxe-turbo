const playlistContainer = document.getElementById('playlist-container');
const entryTemplate = '<div class="bg-primaryColor clickable w-full rounded p-1 outline-1 outline-accentColor mb-3 inline-flex whitespace-nowrap overflow-ellipsis overflow-clip" id="test-playlist-button"><img class="object-none" src="../assets/music_note.svg"><p class="inline-block flex-1 whitespace-nowrap overflow-ellipsis overflow-hidden ml-1">test playlist</p></div>';

async function populatePlaylists() {
    const playlistFiles = await window.electronAPI.readLibraryFiles('m3u');

    
};

// TODO
function entryClicked() {

};

populatePlaylists();