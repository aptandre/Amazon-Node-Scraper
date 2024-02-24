document.getElementById('scrapeBtn').addEventListener('click', async () => {

    const keyword = document.getElementById('keyword').value;
    const loadingElement = document.getElementById('loading');
    loadingElement.classList.remove('invisible');

    try {
        const loadingElement = document.getElementById('loading');
        loadingElement.classList.remove('invisible');

        const response = await fetch(`http://localhost:3000/amazon-scraper/scrape?keyword=${keyword}`);
        const data = await response.json();

        displayResults(data);

    } catch (error) {
        console.log(error)

        const errorComponent = document.createElement('div');
        errorComponent.innerHTML = `

        <div class="bg-red-100 text-red-700 border border-red-500 rounded p-10 text-center my-20 mx-auto max-w-300">
            <p>Oops! Algo deu errado ao fazer a busca, tente novamente.</p>
        </div>

        `

        const warningsContainer = document.getElementById('warnings');
        warningsContainer.innerHTML = "";
        warningsContainer.appendChild(errorComponent);

    } finally {
        const loadingElement = document.getElementById('loading');
        console.log(loadingElement)
        loadingElement.classList.add('invisible');

}
    
});

function displayResults(data) {
    const resultsContainer = document.getElementById('results');
    resultsContainer.innerHTML = '';
    try {
        data.forEach(product => {
            const productDiv = document.createElement('div');
            productDiv.classList.add('product');
            productDiv.innerHTML = `
            <div class="bg-gray-200 shadow-md rounded-lg p-4">
                <h3 class="text-lg font-bold">${product.title}</h3>
                <p class="text-gray-600">Rating: ${product.rating}</p>
                <p class="text-gray-600">Reviews: ${product.reviews}</p>
                <img src="${product.image}" alt="${product.title}" class="mt-2 rounded-lg">
            </div>
    
            `;
            resultsContainer.appendChild(productDiv);
        });
    } catch (error) {

        const errorComponent = document.createElement('div');
        errorComponent.innerHTML = `

        <div class="bg-red-100 text-red-700 border border-red-500 rounded p-10 text-center my-20 mx-auto max-w-300">
        <p>Ocorreu um erro de comunicação entre o nosso servidor e o servidor da Amazon.</p>

        </div>

        `

        const warningsContainer = document.getElementById('warnings');
        warningsContainer.innerHTML = "";
        warningsContainer.appendChild(errorComponent);
    }
    
}
