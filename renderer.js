// Event handlers
// Library icon pick
document.getElementById("libraryPicker").addEventListener('click', async () => {
    const folder = await window.electronAPI.selectFolder();
    console.log(folder);
});