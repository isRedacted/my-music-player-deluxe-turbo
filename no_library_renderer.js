// Event handlers
// Library icon pick
document.getElementById("libraryPicker").addEventListener('click', async () => {
    const folder = await window.electronAPI.selectFolder();
    document.getElementById("libraryInput").innerHTML = folder;
});

document.getElementById("libraryProceed").addEventListener('click', () => {
    libraryDir = document.getElementById("libraryInput").value;
    if (libraryDir != null) {
        
    }
});