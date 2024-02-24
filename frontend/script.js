document.getElementById('scrapeBtn').addEventListener('click', async () => {
    const keyword = document.getElementById('keyword').value;
    const response = await fetch(`/api/scrape?keyword=${keyword}`);
    const data = await response.json();
    displayResults(data);
});

function displayResults(data) {
    const resultsContainer = document.getElementById('results');
    resultsContainer.innerHTML = '';
    data.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.classList.add('product');
        productDiv.innerHTML = `
            <h3>${product.title}</h3>
            <p>Rating: ${product.rating}</p>
            <p>Reviews: ${product.reviews}</p>
            <img src="${product.image}" alt="${product.title}">
        `;
        resultsContainer.appendChild(productDiv);
    });
}
