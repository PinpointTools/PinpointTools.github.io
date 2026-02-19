const contentDiv = document.getElementById('content');
const navDiv = document.getElementById('mainNavi');

async function loadContent(pageName) {
    const page = pageName || 'main';
    try {
        let response = await fetch(`/src/routes/${page}.html`);
        let html = await response.text();
        const isFullHtml = html.trim().toLowerCase().startsWith('<!doctype') || html.includes('<html');

        if (!response.ok || isFullHtml) {
            console.warn(`Page not found or invalid fragment: ${page}. Loading 404 page...`);
            response = await fetch(`/src/routes/404.html`);
            if (!response.ok) {
                throw new Error(`404 page missing`);
            }
            html = await response.text();
        }
        
        contentDiv.innerHTML = html;
    } catch (error) {
        console.error('Error loading page:', error);
        contentDiv.innerHTML = `<p>Error loading page. Please try again.</p>`;
    }
}

async function populateNav() {
    const pages = ['main', 'projects', 'contributors']; 
    
    const homeLink = document.createElement('a');
    homeLink.href = '#/main';
    homeLink.textContent = 'Home';
    navDiv.appendChild(homeLink);

    pages.forEach(page => {
        if (page === 'main') return;
        const link = document.createElement('a');
        link.href = `#/` + page;
        link.textContent = page.charAt(0).toUpperCase() + page.slice(1);
        navDiv.appendChild(link);
    });
}

function handleRouteChange() {
    const pageName = window.location.hash.substring(2);
    window.scrollTo(0, 0);
    loadContent(pageName);
}

async function init() {
    await populateNav();
    window.addEventListener('hashchange', handleRouteChange);
    handleRouteChange();
}

init();
