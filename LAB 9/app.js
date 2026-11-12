const express = require('express');
const path = require('node:path');

function criarApp(banco) {
  const app = express();
  app.disable('x-powered-by');
  app.set('view engine', 'ejs');
  app.set('views', path.join(__dirname, 'views'));
  app.use(express.urlencoded({ extended: false, limit: '100kb' }));
  app.get('/', (req, res) => res.redirect('/Projects.html'));
  app.use(express.static(path.join(__dirname, 'public')));
  app.get('/blog', (req, res) => {
    res.render('blog', { posts: banco.buscarTodosPosts() });
  });
  app.post('/posts', (req, res) => {
    const limites = { titulo: 150, resumo: 500, conteudo: 20000 };
    const post = {};
    for (const [campo, limite] of Object.entries(limites)) {
      const valor = req.body?.[campo];
      if (typeof valor !== 'string' || !valor.trim() || valor.trim().length > limite) {
        return res.status(400).type('text').send(`Campo ${campo} obrigatório e limitado a ${limite} caracteres. Volte e revise o formulário.`);
      }
      post[campo] = valor.trim();
    }
    banco.cadastrarPost(post);
    res.redirect(303, '/blog');
  });
  app.use((req, res) => res.status(404).type('text').send('Página não encontrada. Acesse /Projects.html.'));
  app.use((erro, req, res, next) => {
    console.error(erro.message);
    const status = erro.status === 413 ? 413 : erro.status === 400 ? 400 : 500;
    res.status(status).type('text').send(status === 500 ? 'Não foi possível concluir a solicitação. Tente novamente.' : 'Formulário inválido ou muito grande.');
  });
  return app;
}
module.exports = { criarApp };
