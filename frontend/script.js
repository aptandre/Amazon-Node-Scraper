// Função para fazer a requisição para a API.
document.getElementById('scrapeBtn').addEventListener('click', async () => {

    // Pegar a palavra a ser procurada
    const keyword = document.getElementById('keyword').value;

    // Pegar e limpar o container de resultados
    const resultsContainer = document.getElementById('results');
    resultsContainer.innerHTML = '';

    // Atualizar o componente de carregamento
    const loadingElement = document.getElementById('loading');
    loadingElement.classList.remove('hidden');

    // Atualizar os avisos de erro
    const warningsContainer = document.getElementById('warnings');
    warningsContainer.innerHTML = ""

    try {

        // Tratamento de exceção para palavras vazias.
        if (!keyword.trim()) {
            throw new Error('A palavra-chave não pode estar vazia.');
        }

        // Requisição para o servidor
        const response = await fetch(`http://localhost:3000/amazon-scraper/scrape?keyword=${keyword}`);
        const data = await response.json();

        // Função de disponibilização dos resultados
        displayResults(data);

    } catch (error) {
        console.log(error)

        // Em caso de erro, aparece um componente com a mensagem explicando o que aconteceu.
        const errorComponent = document.createElement('div');
        errorComponent.innerHTML = `

        <div class="bg-red-100 text-red-700 border border-red-500 rounded p-10 text-center my-10 mx-auto max-w-300">
            <p>Oops! Algo deu errado ao fazer a busca, tente novamente.</p>
        </div>

        `

        warningsContainer.appendChild(errorComponent);

    } finally {

        // Atualização do componente de carregamento.
        loadingElement.classList.add('hidden');
    }
});

function displayResults(data) {
    // Pegar o componente de carregamento.
    const loadingElement = document.getElementById('loading');

    // Pegar o componente de resultados e limpar o seu valor.
    const resultsContainer = document.getElementById('results');
    resultsContainer.innerHTML = '';

    // Pegar o componente de avisos e limpar o seu valor.
    const warningsContainer = document.getElementById('warnings');
    warningsContainer.innerHTML = "";

    try {
        // Itera pelo array recebido e faz um componente para cada
        // exibindo os resultados obtidos.
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

        // Em caso de erro, aparece um componente com a mensagem explicando o que aconteceu.
        const errorComponent = document.createElement('div');
        errorComponent.innerHTML = `

        <div class="bg-red-100 text-red-700 border border-red-500 rounded p-10 text-center my-10 mx-auto max-w-300">
            <p>Ocorreu um erro de comunicação entre o nosso servidor e o servidor da Amazon.</p>
        </div>

        `

        warningsContainer.appendChild(errorComponent);

    } finally {

        // Atualização do componente de carregamento.
        loadingElement.classList.add('hidden');

    }
    
}
