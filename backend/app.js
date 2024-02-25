// Imports requeridos
import express from 'express';
import axios from 'axios';
import { load } from 'cheerio';
import cors from 'cors';

// Declaração da aplicação express e configuração da porta.
const app = express();
const port = 3000;

// Função de scraping, nesse caso irá receber um html e utilizar o cheerio para manipulá-lo.
function scrapeData(html) {
    // Carregamento do html com o cheerio
    const $ = load(html);
    const products_list = [];

    // Separação de cada elemento necessário ao scraping com base na classe
    // dos elementos no HTML.
    $('div[data-component-type="s-search-result"]').each((index, element) => {
        const title = $(element).find('h2').text().trim();
        const rating = $(element).find('.a-icon-star-small .a-icon-alt').text();
        const reviews = $(element).find('.a-size-base.s-underline-text').text();
        const image = $(element).find('img').attr('src');

        // Adição à lista de produtos
        products_list.push({ title, rating, reviews, image });
    });

    // Retorna a lista de produtos
    return products_list;
}

// Necessário para que o app consiga fazer requisições para o mesmo PC no qual ele está sendo hosteado.
app.use(cors());
// Endpoint de scraping. Como a porta está configurada para 3000 o endereço completo fica
// http://localhost:3000/amazon-scraper/scrape
app.get('/amazon-scraper/scrape', async (req, res) => {

    // Pega a palavra a ser buscada
    const keyword = req.query.keyword;
    // Monta a URL
    const url = `https://www.amazon.com.br/s?k=${keyword}`;

    try {

        // Utiliza o Axios para fazer a requisição para o servidor da Amazon.
        const response = await axios.get(url, {
            headers: {
                Accept: "application/json",
                "User-Agent": "axios 0.21.1"
              }
        });
        // Utiliza a função de scraping acima para construir os dados
        const data = scrapeData(response.data);
        res.json(data);

    } catch (error) {
        // Em caso de eror, é retornado um status 500 da aplicação.
        console.log(error);
        res.status(500).json({ error: 'Fail: an error occured while trying to stablish connection.' });
    }

});

// Função auxiliar para ajudar na execução, apenas mostra que a aplicação está sendo executada
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});