let selectedTag = null;

function generateBlogSummaries() {
    const placeholder = document.getElementById("placeholder-blogs");
    placeholder.innerHTML = "";

    const filteredBlogs = selectedTag
        ? myStructure.filter(blog => blog.tags.includes(selectedTag))
        : myStructure;

    filteredBlogs.forEach(blog => {
        const blogContainer = document.createElement("div");
        blogContainer.className = "blog-entry";

        const titleDateContainer = document.createElement("div");
        titleDateContainer.className = "title-date-container";

        const titleLink = document.createElement("a");
        titleLink.href = blog.link;
        titleLink.innerText = blog.title;
        titleLink.className = "title-link";
        titleLink.target = "_blank";

        const dateElement = document.createElement("div");
        dateElement.className = "date-element";
        dateElement.innerText = new Date(blog.date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });

        titleDateContainer.appendChild(titleLink);
        titleDateContainer.appendChild(dateElement);

        const tagsContainer = document.createElement("div");
        tagsContainer.className = "tags-container";
        blog.tags.forEach(tagId => {
            const tag = document.createElement("span");
            tag.className = `tag tag-${tagId}`;
            tag.innerText = tags[tagId];
            tag.onclick = () => {
                selectedTag = tagId;
                renderFilter();
                generateBlogSummaries();
            };
            tagsContainer.appendChild(tag);
        });

        const summaryElement = document.createElement("p");
        summaryElement.className = "summary";
        summaryElement.innerText = blog.summary;

        blogContainer.appendChild(titleDateContainer);
        blogContainer.appendChild(tagsContainer);
        blogContainer.appendChild(summaryElement);

        placeholder.appendChild(blogContainer);

        const separator = document.createElement("div");
        separator.className = "separator";
        placeholder.appendChild(separator);
    });
}

function renderFilter() {
    const filterContainer = document.getElementById("filter-container");
    filterContainer.innerHTML = "";

    if (selectedTag) {
        const filterPill = document.createElement("div");
        filterPill.className = "filter-pill";
        filterPill.innerText = `${tags[selectedTag]} ×`;
        filterPill.onclick = () => {
            selectedTag = null;
            renderFilter();
            generateBlogSummaries();
        };
        filterContainer.appendChild(filterPill);
    }
}

window.onload = () => {
    renderFilter();
    generateBlogSummaries();
};
