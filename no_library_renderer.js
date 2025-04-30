const remote = require('remote');
const windowManager = require('electron-window-manager');

// Library icon pick
document.getElementById("libraryPicker").addEventListener('click', async () => {
    const folder = await window.electronAPI.selectFolder();
    document.getElementById("libraryInput").innerHTML = folder;
});

document.getElementById("libraryProceed").addEventListener('click', async () => {
    libraryDir = document.getElementById("libraryInput").textContent;
    if (libraryDir != null) {
        await window.electronAPI.writeSettingsSync("libraryDir", libraryDir);
        window.electronAPI.openMainWindow();
    }
});