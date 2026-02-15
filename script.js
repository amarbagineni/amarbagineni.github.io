let selectedTag = null;

function renderTagButtons() {
    const container = document.getElementById("tag-buttons");
    container.innerHTML = "";

    Object.keys(tags).forEach(tagId => {
        const btn = document.createElement("button");
        btn.className = `tag-btn tag-btn-${tagId}`;
        btn.innerText = tags[tagId];
        if (selectedTag === parseInt(tagId)) {
            btn.classList.add("active");
        }
        btn.onclick = () => {
            const id = parseInt(tagId);
            selectedTag = selectedTag === id ? null : id;
            renderTagButtons();
            renderFilter();
            generateBlogSummaries();
        };
        container.appendChild(btn);
    });
}

function generateBlogSummaries() {
    const placeholder = document.getElementById("placeholder-blogs");
    placeholder.innerHTML = "";

    const filteredBlogs = selectedTag
        ? myStructure.filter(blog => blog.tags.includes(selectedTag))
        : myStructure;

    filteredBlogs.forEach(blog => {
        const entry = document.createElement("div");
        entry.className = "blog-entry";

        const left = document.createElement("div");
        left.className = "entry-left";

        const titleLink = document.createElement("a");
        titleLink.href = blog.localLink || blog.link;
        titleLink.innerText = blog.title;
        titleLink.className = "title-link";
        if (!blog.localLink) titleLink.target = "_blank";

        const summaryEl = document.createElement("span");
        summaryEl.className = "summary";
        summaryEl.innerText = blog.summary;

        left.appendChild(titleLink);
        left.appendChild(summaryEl);

        const tagCell = document.createElement("div");
        tagCell.className = "entry-tag";
        blog.tags.forEach(tagId => {
            const tag = document.createElement("span");
            tag.className = `tag tag-${tagId}`;
            tag.innerText = tags[tagId];
            tag.onclick = (e) => {
                e.stopPropagation();
                selectedTag = tagId;
                renderTagButtons();
                renderFilter();
                generateBlogSummaries();
            };
            tagCell.appendChild(tag);
        });

        const dateEl = document.createElement("div");
        dateEl.className = "date-element";
        dateEl.innerText = new Date(blog.date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });

        entry.appendChild(left);
        entry.appendChild(tagCell);
        entry.appendChild(dateEl);

        placeholder.appendChild(entry);
    });
}

function renderFilter() {
    const filterContainer = document.getElementById("filter-container");
    filterContainer.innerHTML = "";

    if (selectedTag) {
        const pill = document.createElement("div");
        pill.className = "filter-pill";
        pill.innerText = `Showing: ${tags[selectedTag]} ×`;
        pill.onclick = () => {
            selectedTag = null;
            renderTagButtons();
            renderFilter();
            generateBlogSummaries();
        };
        filterContainer.appendChild(pill);
    }
}

function toggleTheme() {
    const html = document.documentElement;
    const current = html.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    const color = next === 'dark' ? '#0c0c0c' : '#faf9f7';
    const slatCount = 8;

    const overlay = document.createElement('div');
    overlay.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;z-index:99999;pointer-events:none;display:flex;flex-direction:column;';

    for (let i = 0; i < slatCount; i++) {
        const slat = document.createElement('div');
        slat.style.cssText = `flex:1;background:${color};transform:scaleY(0);transform-origin:top;transition:transform 0.3s cubic-bezier(0.4,0,0.2,1);transition-delay:${i * 0.03}s;`;
        overlay.appendChild(slat);
    }

    document.body.appendChild(overlay);

    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            overlay.querySelectorAll('div').forEach(slat => {
                slat.style.transform = 'scaleY(1)';
            });
        });
    });

    setTimeout(() => {
        html.setAttribute('data-theme', next);
        localStorage.setItem('theme', next);
        document.querySelectorAll('.theme-toggle').forEach(btn => {
            btn.textContent = next === 'dark' ? '☀️' : '🌙';
        });

        overlay.querySelectorAll('div').forEach((slat, i) => {
            slat.style.transformOrigin = 'bottom';
            slat.style.transitionDelay = `${i * 0.03}s`;
            slat.style.transform = 'scaleY(0)';
        });

        setTimeout(() => overlay.remove(), 400);
    }, slatCount * 30 + 300);
}

// Apply saved theme on load
(function() {
    const saved = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', saved);
    document.addEventListener('DOMContentLoaded', () => {
        document.querySelectorAll('.theme-toggle').forEach(btn => {
            btn.textContent = saved === 'dark' ? '☀️' : '🌙';
        });
    });
})();

window.onload = () => {
    renderTagButtons();
    renderFilter();
    generateBlogSummaries();
};
