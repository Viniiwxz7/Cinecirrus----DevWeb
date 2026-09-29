# CineCirrus — Express + Handlebars + Sequelize

Projeto educacional básico com as entidades Filme, Artista, Ficha Técnica e Diretor. A interface usa Cirrus CSS e o servidor usa **Node.js, Express, Handlebars e Sequelize** com SQLite.

## Como executar sem Python

É necessário ter Node.js instalado. Dentro da pasta do projeto, execute:

```bash
npm install
npm run check
npm start
```

Depois abra `http://localhost:3000`.

Para desenvolvimento, também pode usar:

```bash
npm run dev
```

Para parar o servidor, pressione `Ctrl + C`.

## O que cada tecnologia faz

**Express** recebe as requisições HTTP e define as rotas como `/filmes`, `/filmes/cadastrar` e `/filmes/1`.

**Handlebars** monta o HTML a partir dos arquivos da pasta `views`. O arquivo `views/layouts/main.handlebars` é o molde principal, e `views/entity.handlebars` é um template reutilizado pelas quatro entidades.

**Sequelize** transforma tabelas do banco em modelos JavaScript. Os modelos estão em `models/filme.js` e `models/index.js`.

**SQLite** é o banco local usado pelo Sequelize. O arquivo é criado automaticamente em `data/cinecirrus.sqlite` quando o servidor inicia.

**Cirrus CSS** fornece os estilos e componentes visuais por CDN.

## Rotas principais

| Tela | Rota de exemplo |
|---|---|
| Início | `/` |
| Listar filmes | `/filmes` |
| Cadastrar filme | `/filmes/cadastrar` |
| Detalhar filme | `/filmes/1` |
| Listar artistas | `/artistas` |
| Cadastrar artista | `/artistas/cadastrar` |
| Detalhar artista | `/artistas/1` |
| Listar fichas | `/fichas` |
| Cadastrar ficha | `/fichas/cadastrar` |
| Detalhar ficha | `/fichas/1` |
| Listar diretores | `/diretores` |
| Cadastrar diretor | `/diretores/cadastrar` |
| Detalhar diretor | `/diretores/1` |
| Componentes | `/componentes` |

## Estrutura em linguagem humana

- `server.js`: inicia o Express, configura Handlebars, cria as rotas e insere dados iniciais no banco.
- `models/database.js`: abre a conexão Sequelize com o SQLite.
- `models/filme.js`: define a tabela de filmes.
- `models/index.js`: define as tabelas de artistas, fichas e diretores.
- `views/layouts/main.handlebars`: cabeçalho, menu, rodapé e importação do Cirrus CSS.
- `views/home.handlebars`: página inicial com cards das entidades.
- `views/entity.handlebars`: template genérico para Listar Todos, Detalhar e Cadastrar.
- `views/components.handlebars`: demonstra Card, Table, Form, Accordion, Tabs e Modal.
- `public/styles.css`: pequenas personalizações de cores e layout.
- `tools/check.js`: verifica os arquivos e dependências principais.

## Como explicar o `server.js`

1. `require('express')` importa o servidor Express.
2. `express-handlebars` permite escrever HTML com templates reutilizáveis.
3. Os arquivos de `models` importam os modelos Sequelize.
4. `express.urlencoded` lê os dados enviados pelos formulários.
5. `express.static('public')` libera CSS e logo para o navegador.
6. O objeto `configs` evita escrever quatro vezes as mesmas rotas.
7. `routesFor` cria as rotas de listar, cadastrar, salvar e detalhar.
8. `findAll` busca todos os registros no banco.
9. `findByPk` busca um registro pelo ID.
10. `create` salva o formulário usando Sequelize.
11. `sequelize.sync()` cria as tabelas automaticamente.
12. `bulkCreate` e `create` colocam dados de exemplo na primeira execução.
13. `app.listen` inicia o servidor na porta 3000.

O projeto continua sem usar o componente `button`; os comandos visuais são links estilizados.
