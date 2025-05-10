const playlistContainer = document.getElementById('playlist-container');


function playlistTemplate(name, url) {
    const entryTemplate = `<div class="bg-primaryColor clickable w-full rounded p-1 outline-1 outline-accentColor mb-3 inline-flex whitespace-nowrap overflow-ellipsis overflow-clip" id="test-playlist-button"><img class="object-none" src="../assets/music_note.svg"><p class="inline-block flex-1 whitespace-nowrap overflow-ellipsis overflow-hidden ml-1" title="${name}">${name}</p></div>`;
    return entryTemplate;
}

async function populatePlaylists() {
    const playlistFiles = await window.electronAPI.readLibraryFiles(['m3u']);
    for (let p of playlistFiles) {
        p = await window.electronAPI.basename(p);
        playlistContainer.innerHTML += playlistTemplate(p);
    }
};

// TODO
function entryClicked() {

};

populatePlaylists();