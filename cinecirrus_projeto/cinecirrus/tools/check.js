const fs = require('fs');
const required = ['server.js', 'package.json', 'models/database.js', 'models/filme.js', 'models/index.js', 'views/layouts/main.handlebars', 'views/entity.handlebars'];
const missing = required.filter(file => !fs.existsSync(file));
if (missing.length) { console.error('Arquivos ausentes:', missing.join(', ')); process.exit(1); }
const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
for (const dependency of ['express', 'express-handlebars', 'sequelize', 'sqlite3']) {
  if (!packageJson.dependencies[dependency]) { console.error(`Dependência ausente: ${dependency}`); process.exit(1); }
}
console.log('OK: Express, Handlebars, Sequelize, SQLite e templates encontrados.');
