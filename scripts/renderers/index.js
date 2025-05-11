async function populateBody() {
    const rootDir = await window.electronAPI.rootDir();
    const sidebarURL = await window.electronAPI.join(rootDir, 'pages', 'sidebar.html');
    fetchAndInjectHTML(sidebarURL, 'sidebar');
    // TODO: Check settings for last window else default to home (WILL DO WHEN PLAYLIST VIEWS ARE IMPLEMENTED)
}

function fetchAndInjectHTML(url, containerId) {
    fetch(url)
        .then(res => res.text())
        .then(html => {
            const container = document.getElementById(containerId);
            container.innerHTML = html;

            // Extract and re-execute scripts
            const scripts = container.querySelectorAll('script');
            scripts.forEach(oldScript => {
                const newScript = document.createElement('script');
                [...oldScript.attributes].forEach(attr => {
                    newScript.setAttribute(attr.name, attr.value);
                });
                newScript.textContent = oldScript.textContent;
                oldScript.replaceWith(newScript);
            });
        });
}

document.addEventListener('DOMContentLoaded', populateBody);