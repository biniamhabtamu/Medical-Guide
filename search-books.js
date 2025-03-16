// Open Library API Endpoint
const API_URL = "https://openlibrary.org/search.json";

// DOM Elements
const searchInput = document.getElementById("searchInput");
const searchButton = document.getElementById("searchButton");
const searchResults = document.getElementById("searchResults");

// Fetch Books from Open Library API
async function fetchBooks(query) {
    try {
        const response = await fetch(`${API_URL}?q=${query}&limit=10`); // Limit to 10 results
        const data = await response.json();
        displayResults(data.docs);
    } catch (error) {
        console.error("Error fetching books:", error);
        searchResults.innerHTML = "<p class='text-danger'>Failed to fetch books. Please try again later.</p>";
    }
}

// Display Search Results
function displayResults(books) {
    if (!books || books.length === 0) {
        searchResults.innerHTML = "<p class='text-muted'>No books found. Try a different search term.</p>";
        return;
    }

    const resultsHTML = books
        .map((book) => {
            const title = book.title || "No Title Available";
            const authors = book.author_name?.join(", ") || "Unknown Author";
            const coverId = book.cover_i;
            const thumbnail = coverId
                ? `https://covers.openlibrary.org/b/id/${coverId}-M.jpg`
                : "https://via.placeholder.com/128x196"; // Fallback image
            const link = `https://openlibrary.org${book.key}`; // Link to the book on Open Library

            return `
                <div class="card mb-3">
                    <div class="row g-0">
                        <div class="col-md-3">
                            <img src="${thumbnail}" class="img-fluid rounded-start" alt="${title}">
                        </div>
                        <div class="col-md-9">
                            <div class="card-body">
                                <h5 class="card-title">${title}</h5>
                                <p class="card-text"><strong>Author(s):</strong> ${authors}</p>
                                <a href="${link}" target="_blank" class="btn btn-primary">View Book</a>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        })
        .join("");

    searchResults.innerHTML = resultsHTML;
}

// Event Listeners
searchButton.addEventListener("click", () => {
    const query = searchInput.value.trim();
    if (query) {
        fetchBooks(query);
    } else {
        searchResults.innerHTML = "<p class='text-muted'>Please enter a search term.</p>";
    }
});

searchInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        searchButton.click();
    }
});