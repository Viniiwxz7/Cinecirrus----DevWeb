// Importa o framework Express, responsável pelo servidor e pelas rotas.
const express = require('express');
// Importa o mecanismo que permite usar arquivos Handlebars como páginas.
const { engine } = require('express-handlebars');
// Importa o modelo de Filme criado com Sequelize.
const Filme = require('./models/filme');
// Importa a conexão e os outros três modelos do banco.
const { sequelize, Artista, FichaTecnica, Diretor } = require('./models');

// Cria a aplicação Express.
const app = express();
// Usa a porta definida pelo ambiente ou a porta 3000 como padrão.
const PORT = process.env.PORT || 3000;

// Diz ao Express como processar arquivos com extensão .handlebars.
app.engine('handlebars', engine({ defaultLayout: 'main' }));
// Define Handlebars como mecanismo de visualização do Express.
app.set('view engine', 'handlebars');
// Informa que os templates ficam dentro da pasta views.
app.set('views', './views');
// Permite ler os dados enviados por formulários HTML.
app.use(express.urlencoded({ extended: true }));
// Libera CSS, imagens e outros arquivos da pasta public.
app.use(express.static('public'));

// Reúne as configurações das quatro entidades em um único objeto.
const configs = {
  // Configuração da entidade Filme.
  filmes: { model: Filme, label: 'Filme', plural: 'Filmes', icon: '🎬', fields: [['titulo', 'Título'], ['ano', 'Ano'], ['genero', 'Gênero'], ['sinopse', 'Sinopse']] },
  // Configuração da entidade Artista.
  artistas: { model: Artista, label: 'Artista', plural: 'Artistas', icon: '🎭', fields: [['nome', 'Nome'], ['nascimento', 'Nascimento'], ['pais', 'País'], ['biografia', 'Biografia']] },
  // Configuração da entidade Ficha Técnica.
  fichas: { model: FichaTecnica, label: 'Ficha Técnica', plural: 'Fichas técnicas', icon: '📋', fields: [['filme', 'Filme'], ['duracao', 'Duração'], ['fotografia', 'Fotografia'], ['trilhaSonora', 'Trilha sonora']] },
  // Configuração da entidade Diretor.
  diretores: { model: Diretor, label: 'Diretor', plural: 'Diretores', icon: '🎥', fields: [['nome', 'Nome'], ['pais', 'País'], ['obraPrincipal', 'Obra principal'], ['estilo', 'Estilo']] }
};

// Converte um registro do Sequelize em um formato simples para o Handlebars.
function viewData(config, row) {
  // Se não existir registro, devolve um objeto vazio.
  if (!row) return {};
  // Converte o registro Sequelize em um objeto JavaScript comum.
  const values = row.toJSON();
  // Pega os quatro valores na ordem configurada para a entidade.
  const fieldValues = config.fields.map(([name]) => values[name]);
  // Devolve nomes padronizados para o template genérico.
  return { id: values.id, title: fieldValues[0], main: fieldValues[1], category: fieldValues[2], description: fieldValues[3] };
}

// Cria automaticamente as quatro rotas CRUD básicas de uma entidade.
function routesFor(path, config) {
  // Rota GET que lista todos os registros.
  app.get(`/${path}`, async (req, res) => {
    // Busca todos os registros da tabela ordenados pelo ID.
    const rows = await config.model.findAll({ order: [['id', 'ASC']] });
    // Renderiza a tela genérica no modo lista.
    res.render('entity', { title: `Listar ${config.plural}`, label: config.label, icon: config.icon, baseUrl: `/${path}`, pageTitle: 'Listar Todos', isList: true, rows: rows.map(row => viewData(config, row)) });
  });

  // Rota GET que exibe o formulário de cadastro.
  app.get(`/${path}/cadastrar`, (req, res) => res.render('entity', { title: `Cadastrar ${config.label}`, label: config.label, icon: config.icon, baseUrl: `/${path}`, pageTitle: 'Cadastrar', fields: config.fields.map(([name, label]) => ({ name, label, labelLower: label.toLowerCase() })) }));

  // Rota POST que recebe e salva os dados enviados pelo formulário.
  app.post(`/${path}`, async (req, res) => {
    // Cria um novo registro usando os dados de req.body.
    await config.model.create(req.body);
    // Depois de salvar, volta para a tela de listagem.
    res.redirect(`/${path}`);
  });

  // Rota GET que mostra um registro pelo ID.
  app.get(`/${path}/:id`, async (req, res) => {
    // Busca no banco o registro cujo ID veio na URL.
    const row = await config.model.findByPk(req.params.id);
    // Se não encontrou, devolve erro 404.
    if (!row) return res.status(404).send('Registro não encontrado');
    // Renderiza a tela genérica no modo detalhe.
    res.render('entity', { title: `Detalhar ${config.label}`, label: config.label, icon: config.icon, baseUrl: `/${path}`, pageTitle: 'Detalhar', isDetail: true, row: viewData(config, row) });
  });

  // Rota POST que exclui um registro pelo ID.
  app.post(`/${path}/:id/excluir`, async (req, res) => {
    // Busca o registro para garantir que ele ainda existe.
    const row = await config.model.findByPk(req.params.id);
    // Se não encontrou, devolve erro 404.
    if (!row) return res.status(404).send('Registro não encontrado');
    // Remove o registro da tabela com o método destroy do Sequelize.
    await row.destroy();
    // Depois de excluir, volta para a listagem da entidade.
    res.redirect(`/${path}`);
  });
}

// Percorre as configurações e cria as rotas de cada entidade.
Object.entries(configs).forEach(([path, config]) => routesFor(path, config));

// Rota que mostra a tela com os componentes do Cirrus CSS.
app.get('/componentes', (req, res) => res.render('components', { title: 'Componentes' }));

// Rota inicial do projeto.
app.get('/', (req, res) => res.render('home', {
  // Define o título da página inicial.
  title: 'Início',
  // Transforma as configurações em dados para os cards da home.
  entities: Object.entries(configs).map(([url, config]) => ({ url: `/${url}`, plural: config.plural, icon: config.icon })),
  // Define os três fluxos exigidos pela atividade.
  flows: [{ number: 1, name: 'Cadastrar', description: 'Formulário com campos básicos.' }, { number: 2, name: 'Detalhar', description: 'Resumo de um registro selecionado.' }, { number: 3, name: 'Listar Todos', description: 'Tabela com todos os registros.' }, { number: 4, name: 'Excluir', description: 'Remove um registro com confirmação.' }]
}));

// Cria as tabelas e insere exemplos somente quando cada tabela está vazia.
async function seed() {
  // Cria as tabelas do banco caso elas ainda não existam.
  await sequelize.sync();
  // Insere filmes de exemplo na primeira execução.
  if (await Filme.count() === 0) await Filme.bulkCreate([{ titulo: 'A Viagem de Chihiro', ano: 2001, genero: 'Animação', sinopse: 'Uma menina atravessa um mundo mágico para salvar a família.' }, { titulo: 'O Auto da Compadecida', ano: 2000, genero: 'Comédia', sinopse: 'Dois amigos sobrevivem com criatividade no sertão.' }, { titulo: 'Interestelar', ano: 2014, genero: 'Ficção científica', sinopse: 'Uma missão espacial procura um novo lar para a humanidade.' }]);
  // Insere artistas de exemplo na primeira execução.
  if (await Artista.count() === 0) await Artista.bulkCreate([{ nome: 'Fernanda Montenegro', nascimento: 1929, pais: 'Brasil', biografia: 'Atriz brasileira de cinema, teatro e televisão.' }, { nome: 'Hayao Miyazaki', nascimento: 1941, pais: 'Japão', biografia: 'Diretor e animador de narrativas fantásticas.' }]);
  // Insere uma ficha técnica de exemplo na primeira execução.
  if (await FichaTecnica.count() === 0) await FichaTecnica.create({ filme: 'A Viagem de Chihiro', duracao: '2h 05min', fotografia: 'Atsushi Okui', trilhaSonora: 'Joe Hisaishi' });
  // Insere diretores de exemplo na primeira execução.
  if (await Diretor.count() === 0) await Diretor.bulkCreate([{ nome: 'Fernando Meirelles', pais: 'Brasil', obraPrincipal: 'Cidade de Deus', estilo: 'Narrativa urbana e ritmo intenso.' }, { nome: 'Christopher Nolan', pais: 'Reino Unido', obraPrincipal: 'Interestelar', estilo: 'Tempo, ciência e escolhas humanas.' }]);
}

// Prepara o banco antes de iniciar o servidor.
seed().then(() => app.listen(PORT, '0.0.0.0', () => console.log(`CineCirrus rodando em http://localhost:${PORT}`))).catch(error => { console.error('Erro ao iniciar:', error); process.exit(1); });
