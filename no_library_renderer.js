// Library icon pick
document.getElementById("libraryBox").addEventListener('click', async () => {
    const folder = await window.electronAPI.selectFolder();
    if (folder != null) {
        document.getElementById("libraryInput").innerHTML = folder;
    }
});

document.getElementById("libraryProceed").addEventListener('click', async () => {
    libraryDir = document.getElementById("libraryInput").textContent;
    if (libraryDir != '') {
        await window.electronAPI.writeSettingsSync("libraryDir", libraryDir);
        window.electronAPI.openMainWindow();
    }
});