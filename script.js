let selectedTag = null;

function generateBlogSummaries() {
    const placeholder = document.getElementById("placeholder-blogs");
    const filterContainer = document.getElementById("filter-container");
    placeholder.innerHTML = ""; // Clear existing content

    // Filtered articles
    const filteredBlogs = selectedTag
        ? myStructure.filter(blog => blog.tags.includes(selectedTag))
        : myStructure;

    filteredBlogs.forEach(blog => {
        // Create container
        const blogContainer = document.createElement("div");
        blogContainer.className = "bg-white border border-gray-300 rounded-lg mb-4 p-4";

        // Create title and date container
        const titleDateContainer = document.createElement("div");
        titleDateContainer.className = "flex justify-between items-center";

        // Create title link
        const titleLink = document.createElement("a");
        titleLink.href = blog.link;
        titleLink.innerText = blog.title;
        titleLink.className = "text-lg font-semibold text-blue-600 hover:underline";
        titleLink.target = "_blank"; // Open in a new tab

        // Create date element
        const dateElement = document.createElement("div");
        dateElement.className = "text-sm text-gray-500";
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
        tagsContainer.className = "mt-2";
        blog.tags.forEach(tagId => {
            const tag = document.createElement("span");
            tag.className = "inline-block bg-blue-600 text-white text-xs px-2 py-1 rounded-full mr-2 cursor-pointer";
            tag.innerText = tags[tagId];
            tag.onclick = () => {
                selectedTag = tagId;
                renderFilter();
                generateBlogSummaries();
            };
            tagsContainer.appendChild(tag);
        });

        // Append elements to blog container
        blogContainer.appendChild(titleDateContainer);
        blogContainer.appendChild(tagsContainer);

        // Append blog container to placeholder
        placeholder.appendChild(blogContainer);
    });
}

function renderFilter() {
    const filterContainer = document.getElementById("filter-container");
    filterContainer.innerHTML = ""; // Clear existing content

    if (selectedTag) {
        const filterPill = document.createElement("div");
        filterPill.className = "inline-block bg-gray-200 text-gray-700 text-xs px-3 py-1 rounded-full cursor-pointer";
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
