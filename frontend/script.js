document.getElementById('scrapeBtn').addEventListener('click', async () => {

    const keyword = document.getElementById('keyword').value;

    try {
        const response = await fetch(`/amazon-scraper/scrape?keyword=${keyword}`);
        const data = await response.json();

        displayResults(data);

    } catch (error) {
        console.log(error)
        const resultsContainer = document.getElementById('results');

        const errorComponent = document.createElement('div');
        errorComponent.innerHTML = `
        <div class="bg-red-100 text-red-700 border border-red-500 rounded p-10 text-center my-20 mx-auto max-w-300">
        <p>Oops! Algo deu errado ao fazer a busca, tente novamente.</p>
        </div>
        `

        resultsContainer.appendChild(errorComponent)
    }
    
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
