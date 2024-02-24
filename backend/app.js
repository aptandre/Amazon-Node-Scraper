const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');

const app = express();
const port = 3000;

function scrapeData(html) {
    const $ = cheerio.load(html);
    const products_list = [];

    cheerio('div[data-component-type="s-search-result"]').each((index, element) => {
        const title = $(element).find('h2').text().trim();
        const rating = $(element).find('span.a-icon-star-small').text().split(' ')[0];
        const reviews = $(element).find('span.a-size-base').text().trim();
        const image = $(element).find('img').attr('src');

        products_list.push({ title, rating, reviews, image });
    });

    return products_list;
}

app.get('/amazon-scraper/scrape', async (req, res) => {

    const keyword = req.query.keyword;
    const url = `https://www.amazon.com.br/s?k=${keyword}`;

    try {

        const response = await axios.get(url);
        const data = await scrapeData(response.data);
        res.json(data);

    } catch (error) {
        console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAA")
        console.error(error);
        res.status(500).json({ error: 'Fail: an error occured while trying to stablish connection.' });
    }

});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});