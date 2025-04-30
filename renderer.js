// Event handlers
// Library icon pick
document.getElementById("libraryPicker").addEventListener('click', async () => {
    const folder = await window.electronAPI.selectFolder();
    document.getElementById("libraryInput").innerHTML = folder;
});