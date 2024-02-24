const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');

const app = express();
const port = 3000;

app.get('/amazon-scraper/scrape', async (req, res) => {
    const keyword = req.query.keyword;
    const url = `https://www.amazon.com/s?k=${keyword}`;

    try {

        const response = await axios.get(url);
        const data = await scrapeData(response.data);
        res.json(data);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Fail: an error occured while trying to stablish connection.' });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
