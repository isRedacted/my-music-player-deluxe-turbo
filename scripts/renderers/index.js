// TODO: Populate with pages
async function populateBody () {
    const piss = await window.electronAPI.readSettings();
    console.log(piss['libraryDir']);
}

document.addEventListener('DOMContentLoaded', populateBody);