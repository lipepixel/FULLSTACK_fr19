const { DatabaseSync } = require('node:sqlite');
const { mkdirSync } = require('node:fs');
const { dirname, join } = require('node:path');

function abrirBanco(arquivo = process.env.DB_PATH || join(__dirname, 'data', 'blog.sqlite')) {
  if (arquivo !== ':memory:') mkdirSync(dirname(arquivo), { recursive: true });
  const db = new DatabaseSync(arquivo);
  db.exec(`CREATE TABLE IF NOT EXISTS posts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    titulo TEXT NOT NULL,
    resumo TEXT NOT NULL,
    conteudo TEXT NOT NULL,
    criado_em TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))
  )`);
  return {
    cadastrarPost({ titulo, resumo, conteudo }) {
      // Parâmetros vinculados evitam que o texto seja interpretado como SQL.
      return db.prepare('INSERT INTO posts (titulo, resumo, conteudo) VALUES (?, ?, ?)')
        .run(titulo, resumo, conteudo);
    },
    buscarTodosPosts() {
      return db.prepare('SELECT * FROM posts ORDER BY id DESC').all();
    },
    fechar() { db.close(); }
  };
}
module.exports = { abrirBanco };
