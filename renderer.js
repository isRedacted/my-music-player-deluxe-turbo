// Main split pane stuff
const splitInstance = Split(['#sidebar', '#main-content-area'], {
    sizes: [15, 85],
    maxSize: [450, Infinity],
    gutterSize: 5
});