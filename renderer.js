const handle = document.getElementById('handle');
const sidebar = document.getElementById('sidebar');
const mainSplitView = document.getElementById('main-split-area');

let isResizing = false;
let animationFrameId = null;

function vwToPx(vw) {
    return (vw / 100) * window.innerWidth;
}

function updateSidebarWidth(e) {
    const minSidebarWidth = vwToPx(15);
    const maxSidebarWidth = vwToPx(50);
    const mainRect = mainSplitView.getBoundingClientRect();

    let newSidebarWidthPx = e.clientX - mainRect.left;
    newSidebarWidthPx = Math.max(minSidebarWidth, Math.min(newSidebarWidthPx, maxSidebarWidth));

    const newSidebarWidth = (newSidebarWidthPx / mainRect.width) * 100;
    sidebar.style.width = `${newSidebarWidth}vw`;
}

handle.addEventListener('mousedown', (e) => {
    isResizing = true;
    e.preventDefault();
});

window.addEventListener('mouseup', () => {
    isResizing = false;
    if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = null;
    }
});

window.addEventListener('mousemove', (e) => {
    if (!isResizing) return;

    if (!animationFrameId) {
        animationFrameId = requestAnimationFrame(() => {
            updateSidebarWidth(e);
            animationFrameId = null;
        })
    }

})