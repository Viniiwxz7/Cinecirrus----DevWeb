const express = require('express');
const { engine } = require('express-handlebars');
const Filme = require('./models/filme');
const { sequelize, Artista, FichaTecnica, Diretor } = require('./models');

const app = express();
const PORT = process.env.PORT || 3000;

app.engine('handlebars', engine({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
app.set('views', './views');
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

const configs = {
  filmes: { model: Filme, label: 'Filme', plural: 'Filmes', icon: '🎬', fields: [['titulo', 'Título'], ['ano', 'Ano'], ['genero', 'Gênero'], ['sinopse', 'Sinopse']] },
  artistas: { model: Artista, label: 'Artista', plural: 'Artistas', icon: '🎭', fields: [['nome', 'Nome'], ['nascimento', 'Nascimento'], ['pais', 'País'], ['biografia', 'Biografia']] },
  fichas: { model: FichaTecnica, label: 'Ficha Técnica', plural: 'Fichas técnicas', icon: '📋', fields: [['filme', 'Filme'], ['duracao', 'Duração'], ['fotografia', 'Fotografia'], ['trilhaSonora', 'Trilha sonora']] },
  diretores: { model: Diretor, label: 'Diretor', plural: 'Diretores', icon: '🎥', fields: [['nome', 'Nome'], ['pais', 'País'], ['obraPrincipal', 'Obra principal'], ['estilo', 'Estilo']] }
};

function viewData(config, row) {
  if (!row) return {};
  const values = row.toJSON();
  const fieldValues = config.fields.map(([name]) => values[name]);
  return { id: values.id, title: fieldValues[0], main: fieldValues[1], category: fieldValues[2], description: fieldValues[3] };
}

function routesFor(path, config) {
  app.get(`/${path}`, async (req, res) => {
    const rows = await config.model.findAll({ order: [['id', 'ASC']] });
    res.render('entity', { title: `Listar ${config.plural}`, label: config.label, icon: config.icon, baseUrl: `/${path}`, pageTitle: 'Listar Todos', isList: true, rows: rows.map(row => viewData(config, row)) });
  });

  app.get(`/${path}/cadastrar`, (req, res) => res.render('entity', { title: `Cadastrar ${config.label}`, label: config.label, icon: config.icon, baseUrl: `/${path}`, pageTitle: 'Cadastrar', fields: config.fields.map(([name, label]) => ({ name, label, labelLower: label.toLowerCase() })) }));

  app.post(`/${path}`, async (req, res) => {
    await config.model.create(req.body);
    res.redirect(`/${path}`);
  });

  app.get(`/${path}/:id`, async (req, res) => {
    const row = await config.model.findByPk(req.params.id);
    if (!row) return res.status(404).send('Registro não encontrado');
    res.render('entity', { title: `Detalhar ${config.label}`, label: config.label, icon: config.icon, baseUrl: `/${path}`, pageTitle: 'Detalhar', isDetail: true, row: viewData(config, row) });
  });
}

Object.entries(configs).forEach(([path, config]) => routesFor(path, config));

app.get('/componentes', (req, res) => res.render('components', { title: 'Componentes' }));
app.get('/', (req, res) => res.render('home', {
  title: 'Início',
  entities: Object.entries(configs).map(([url, config]) => ({ url: `/${url}`, plural: config.plural, icon: config.icon })),
  flows: [
    { number: 1, name: 'Cadastrar', description: 'Formulário com campos básicos.' },
    { number: 2, name: 'Detalhar', description: 'Resumo de um registro selecionado.' },
    { number: 3, name: 'Listar Todos', description: 'Tabela com todos os registros.' }
  ]
}));

async function seed() {
  await sequelize.sync();
  if (await Filme.count() === 0) await Filme.bulkCreate([
    { titulo: 'A Viagem de Chihiro', ano: 2001, genero: 'Animação', sinopse: 'Uma menina atravessa um mundo mágico para salvar a família.' },
    { titulo: 'O Auto da Compadecida', ano: 2000, genero: 'Comédia', sinopse: 'Dois amigos sobrevivem com criatividade no sertão.' },
    { titulo: 'Interestelar', ano: 2014, genero: 'Ficção científica', sinopse: 'Uma missão espacial procura um novo lar para a humanidade.' }
  ]);
  if (await Artista.count() === 0) await Artista.bulkCreate([{ nome: 'Fernanda Montenegro', nascimento: 1929, pais: 'Brasil', biografia: 'Atriz brasileira de cinema, teatro e televisão.' }, { nome: 'Hayao Miyazaki', nascimento: 1941, pais: 'Japão', biografia: 'Diretor e animador de narrativas fantásticas.' }]);
  if (await FichaTecnica.count() === 0) await FichaTecnica.create({ filme: 'A Viagem de Chihiro', duracao: '2h 05min', fotografia: 'Atsushi Okui', trilhaSonora: 'Joe Hisaishi' });
  if (await Diretor.count() === 0) await Diretor.bulkCreate([{ nome: 'Fernando Meirelles', pais: 'Brasil', obraPrincipal: 'Cidade de Deus', estilo: 'Narrativa urbana e ritmo intenso.' }, { nome: 'Christopher Nolan', pais: 'Reino Unido', obraPrincipal: 'Interestelar', estilo: 'Tempo, ciência e escolhas humanas.' }]);
}

seed().then(() => app.listen(PORT, '0.0.0.0', () => console.log(`CineCirrus rodando em http://localhost:${PORT}`))).catch(error => { console.error(error); process.exit(1); });
