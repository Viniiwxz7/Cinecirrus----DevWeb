# Código explicado — CineCirrus

## Observação importante

Os arquivos JavaScript, CSS e Handlebars foram organizados com comentários no próprio código. O arquivo `package.json` é JSON puro e não pode receber comentários: se colocarmos comentários nele, o `npm install` apresentará erro. Por isso, a explicação do `package.json` está neste documento e no README.

## Ordem para estudar

1. Comece pelo `server.js`: ele liga todas as partes.
2. Leia `models/database.js`: ele mostra a conexão com SQLite.
3. Leia `models/filme.js` e `models/index.js`: eles mostram as tabelas.
4. Leia `views/layouts/main.handlebars`: ele é a moldura das páginas.
5. Leia `views/entity.handlebars`: ele reutiliza a mesma tela para listar, detalhar e cadastrar.
6. Leia `public/styles.css`: ele complementa o Cirrus CSS.
7. Execute `npm run check` para confirmar a organização.

## Resumo da arquitetura

O navegador acessa uma rota Express. O Express consulta o modelo Sequelize. O Sequelize lê, grava ou exclui no SQLite. Depois, o Express envia os dados para o Handlebars. O Handlebars mistura os dados com o HTML e devolve a página pronta ao navegador.

A exclusão usa `POST /entidade/:id/excluir` e o método `destroy()` do Sequelize. A tela pede confirmação antes de enviar o formulário.

```text
Navegador → Express → Sequelize → SQLite
Navegador ← Handlebars ← dados do Sequelize
```

## Comandos

```cmd
npm install
npm run check
npm start
```

Depois abra `http://localhost:3000`.
