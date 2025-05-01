// Main split pane stuff
const splitInstance = Split(['#sidebar', '#main-content-area'], {
    sizes: [25, 75],
    maxSize: [500, Infinity]
});