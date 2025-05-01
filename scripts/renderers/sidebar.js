const handle = document.getElementById('handle');
const sidebar = document.getElementById('sidebar');
const mainSplitView = document.getElementById('main-split-area');

let isResizing = false;
let animationFrameId = null;

// Default width is in vw
let defaultSidebarWidth = 20;

let minSidebarWidth = vwToPx(15);
let maxSidebarWidth = vwToPx(50);
let mainRect = mainSplitView.getBoundingClientRect();

function vwToPx(vw) {
    return (vw / 100) * window.innerWidth;
}

// Take a mousemove event and change the width of the sidebar
function updateSidebarWidth(e) {
    // Calculate new width position offset by the left coordinate of the boundary to keep in line with mouse
    let newSidebarWidthPx = e.clientX - mainRect.left;
    // Keep new width contained in the min and max width
    newSidebarWidthPx = Math.max(minSidebarWidth, Math.min(newSidebarWidthPx, maxSidebarWidth));

    const newSidebarWidth = (newSidebarWidthPx / mainRect.width) * 100;
    sidebar.style.width = `${newSidebarWidth}vw`;
}

async function saveSidebarWidth() {
    // Save sidebar location
    await window.electronAPI.writeSettings("lastSidebarWidth", sidebar.style.width);
}

document.addEventListener('DOMContentLoaded', async () => {
    let settings = await window.electronAPI.readSettings();
    let lastSidebarWidth = settings['lastSidebarWidth'];
    if (lastSidebarWidth == undefined) {
        sidebar.style.width = `${defaultSidebarWidth}vw`;
    } else {
        sidebar.style.width = lastSidebarWidth;
    }
});

handle.addEventListener('mousedown', (e) => {
    // Recalculate sidebar width and containing boundary
    minSidebarWidth = 0;
    maxSidebarWidth = vwToPx(50);
    mainRect = mainSplitView.getBoundingClientRect();

    document.body.style.cursor = 'col-resize';

    // Yes, we are indeed resizing
    isResizing = true;
    e.preventDefault();
});

window.addEventListener('mouseup', async () => {
    // No, we are indeed not resizing
    isResizing = false;

    // Cancel the current animation frame
    if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = null;
    }
    document.body.style.cursor = '';
    saveSidebarWidth();
});

window.addEventListener('mousemove', (e) => {
    if (!isResizing) return;

    // Update the DOM animation frame to debounce sidebar width update
    if (!animationFrameId) {
        animationFrameId = requestAnimationFrame(() => {
            updateSidebarWidth(e);
            animationFrameId = null;
        })
    }

})