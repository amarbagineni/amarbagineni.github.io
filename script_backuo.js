

function generateBlogSummaries() {
const placeholder = document.getElementById("placeholder-blogs");
placeholder.innerHTML = ""; // Clear existing content

myStructure.forEach(blog => {
// Create container
const blogContainer = document.createElement("div");
blogContainer.className = "blog-container";

// Create title link
const titleLink = document.createElement("a");
titleLink.href = blog.link;
titleLink.innerText = blog.title;
titleLink.className = "blog-title";
titleLink.target = "_blank"; // Open in a new tab

// Create tags container
const tagsContainer = document.createElement("div");
tagsContainer.className = "tags-container";
blog.tags.forEach(tagId => {
    const tag = document.createElement("span");
    tag.className = "blog-tag";
    tag.innerText = tags[tagId];
    tagsContainer.appendChild(tag);
});

// Create date element
const dateElement = document.createElement("div");
dateElement.className = "blog-date";
dateElement.innerText = new Date(blog.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
});

// Append elements to blog container
blogContainer.appendChild(titleLink);
blogContainer.appendChild(tagsContainer);
blogContainer.appendChild(dateElement);

// Append blog container to placeholder
placeholder.appendChild(blogContainer);
});
}

// Call the function to generate summaries on page load
window.onload = generateBlogSummaries;
