const sidebarSeparator = document.getElementById('sidebar-separator');

function populatePlaylists() {
    // TODO: Read all m3u files in library directory and add below commented element for each
    
    sidebarSeparator.after(newElement);
};

populatePlaylists();

// TODO: Add on click functionality to below html
/*
<div class="bg-primaryColor clickable w-full rounded p-1 outline-1 outline-accentColor mb-3 inline-flex whitespace-nowrap overflow-ellipsis overflow-clip"
        id="test-playlist-button">
        <img class="object-none" src="../assets/music_note.svg">
        <p class="inline-block flex-1 whitespace-nowrap overflow-ellipsis overflow-hidden ml-1">
            test playlist
        </p>
    </div>
*/