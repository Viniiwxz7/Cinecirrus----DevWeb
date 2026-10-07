# CineCirrus — código comentado

Projeto educacional com **Express, Handlebars, Sequelize, SQLite e Cirrus CSS**.

## Execução no Windows

Abra o terminal dentro da pasta que contém o `package.json` e rode:

```cmd
npm install
npm run check
npm start
```

Depois abra `http://localhost:3000`.

## Ordem das pastas

```text
server.js                  servidor, rotas e inicialização
models/                    conexão e modelos do banco
views/                     páginas Handlebars
views/layouts/             layout compartilhado
public/                    CSS, logo e arquivos públicos
data/                      banco SQLite criado pelo Sequelize
tools/check.js             verificação automática
```

## Explicação rápida

O `server.js` importa o Express, configura Handlebars, carrega os modelos Sequelize, cria as rotas e inicia o servidor. Os modelos definem as tabelas de Filme, Artista, Ficha Técnica e Diretor. O arquivo `entity.handlebars` é reutilizado em quatro situações: Listar Todos, Detalhar, Cadastrar e Excluir.

A aplicação usa `req.body` para receber formulários, `findAll()` para listar, `findByPk()` para detalhar, `create()` para cadastrar e `destroy()` para excluir. O banco é criado em `data/cinecirrus.sqlite`.

Os arquivos possuem comentários explicativos no próprio código. Consulte também `CODIGO_EXPLICADO.md` para a ordem recomendada de estudo.

## Rotas

```text
/                         página inicial
/filmes                   listar filmes
/filmes/cadastrar         cadastrar filme
/filmes/1                 detalhar filme
POST /filmes/1/excluir    excluir filme
/artistas                 listar artistas
/artistas/cadastrar       cadastrar artista
/artistas/1               detalhar artista
POST /artistas/1/excluir  excluir artista
/fichas                   listar fichas técnicas
/fichas/cadastrar         cadastrar ficha técnica
/fichas/1                 detalhar ficha técnica
POST /fichas/1/excluir    excluir ficha técnica
/diretores                listar diretores
/diretores/cadastrar      cadastrar diretor
/diretores/1              detalhar diretor
POST /diretores/1/excluir excluir diretor
/componentes              exemplos de Card, Table, Form, Accordion, Tabs e Modal
```

## Observação sobre JSON

`package.json` não possui comentários porque JSON não aceita comentários. O arquivo `package.json` deve permanecer somente com a configuração válida das dependências e dos scripts.
