
let selectedTag = null;

function generateBlogSummaries() {
    const placeholder = document.getElementById("placeholder-blogs");
    placeholder.innerHTML = ""; // Clear existing content

    // Filtered articles
    const filteredBlogs = selectedTag
        ? myStructure.filter(blog => blog.tags.includes(selectedTag))
        : myStructure;

    filteredBlogs.forEach(blog => {
        // Create container
        const blogContainer = document.createElement("div");

        // Create title and date container
        const titleDateContainer = document.createElement("div");
        titleDateContainer.className = "title-date-container";

        // Create title link
        const titleLink = document.createElement("a");
        titleLink.href = blog.link;
        titleLink.innerText = blog.title;
        titleLink.className = "title-link";
        titleLink.target = "_blank"; // Open in a new tab

        // Create date element
        const dateElement = document.createElement("div");
        dateElement.className = "date-element";
        dateElement.innerText = new Date(blog.date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });

        // Append title and date to the title-date container
        titleDateContainer.appendChild(titleLink);
        titleDateContainer.appendChild(dateElement);

        // Create tags container
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

        // Create summary element
        const summaryElement = document.createElement("p");
        summaryElement.className = "summary";
        summaryElement.innerText = blog.summary;

        // Append elements to blog container
        blogContainer.appendChild(titleDateContainer);
        blogContainer.appendChild(tagsContainer);
        blogContainer.appendChild(summaryElement);

        // Append blog container to placeholder
        placeholder.appendChild(blogContainer);

        // Add a separator line between blog entries
        const separator = document.createElement("div");
        separator.className = "separator";
        placeholder.appendChild(separator);
    });
}

function renderFilter() {
    const filterContainer = document.getElementById("filter-container");
    filterContainer.innerHTML = ""; // Clear existing content

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

// Call the function to generate summaries on page load
window.onload = () => {
    renderFilter();
    generateBlogSummaries();
};