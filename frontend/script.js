document.getElementById('scrapeBtn').addEventListener('click', async () => {

    const keyword = document.getElementById('keyword').value;

    const loadingElement = document.getElementById('loading');
    loadingElement.classList.remove('hidden');

    const warningsContainer = document.getElementById('warnings');
    warningsContainer.innerHTML = ""

    try {

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

        warningsContainer.appendChild(errorComponent);

    } finally {
        loadingElement.classList.add('hidden');
    }
});

function displayResults(data) {
    const loadingElement = document.getElementById('loading');

    const resultsContainer = document.getElementById('results');
    resultsContainer.innerHTML = '';

    const warningsContainer = document.getElementById('warnings');
    warningsContainer.innerHTML = "";

    try {
        data.forEach(product => {
            const productDiv = document.createElement('div');
            productDiv.classList.add('product');
            productDiv.innerHTML = `

            <div class="bg-white shadow-md rounded-lg overflow-hidden">
                <img src="${product.image}" alt="${product.title}" class="w-full h-40 object-cover">
                <div class="p-4">
                    <h3 class="text-lg font-bold mb-2">${product.title}</h3>
                    <p class="text-gray-600 mb-2">Rating: ${product.rating}</p>
                    <p class="text-gray-600 mb-4">Reviews: ${product.reviews}</p>
                </div>
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

        warningsContainer.appendChild(errorComponent);

    } finally {
        loadingElement.classList.add('hidden');
    }
    
}
