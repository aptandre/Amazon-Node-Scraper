### Aplicação de Webscraping da Amazon

Esta aplicação foi criada como parte de um processo seletivo, o desafio era, basicamente, criar uma API para se comunicar com o site da amazon e fazer o webscraping de todos os produtos da primeira página com base em uma palavra-chave que seria passada pelo usuário através de uma interface gráfica.

Na construção da API, foram utilizados o **axios** para fazer as requisições e o **cheerio** para fazer o parsing do HTML. Já na interface gráfica, utilizei **Tailwind CSS** para a estilização dos elementos da interface.

#### Execução

#### 1. Execução

Para executar a aplicação, basta clonar este repositório e realizar os seguintes passos:
**1.1** Na pasta raiz do projeto, utilizar o comando ``npm install`` no terminal para instalar as dependências;

**1.2** Navegar até o diretório ``amazon-scraper/backend`` e utilizar o comando `node app.js` para rodar a API da aplicação;

**1.3** Abrir o arquivo ``index.html``, localizado dentro da pasta ``amazon-scraper/backend`` pode ser aberto tanto por alguma extensão do Visual Studio Code (como, por exemplo, o live server) quanto por algum browser como o Google Chrome, Mozilla Firefox ou Microsoft Edge.

**Após isso, a aplicaçãop deve estar pronta para ser utilizada.**

![alt text](image.png)
