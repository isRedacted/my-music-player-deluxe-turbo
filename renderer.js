// Main split pane stuff
let isResizing = false;

document.getElementById("handle").addEventListener('mouseover', () => {
    document.body.style.cursor = 'col-resize';
});

document.getElementById("handle").addEventListener('mouseout', () => {
    document.body.style.cursor = '';
});

document.getElementById('handle').addEventListener('mousedown', () => {
    isResizing = true;
});

document.getElementById('handle').addEventListener('mouseup', () => {
    isResizing = false;
});

document.getElementById('handle').addEventListener('mousemove', (e) => {
    if (!isResizing) return;
    const offsetRight = document.body.offsetWidth - (e.clientX);
    document.getElementById('left-pane').style.width = `${e.clientX}px`;
});