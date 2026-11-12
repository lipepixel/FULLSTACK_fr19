const { test } = require('node:test');
const assert = require('node:assert/strict');
const { mkdtempSync, rmSync } = require('node:fs');
const { tmpdir } = require('node:os');
const { join } = require('node:path');
const { once } = require('node:events');
const { abrirBanco } = require('../database');
const { criarApp } = require('../app');

test('cadastro, listagem, validação e persistência no SQLite', async () => {
  const pasta = mkdtempSync(join(tmpdir(), 'blog-test-'));
  const arquivo = join(pasta, 'posts.sqlite');
  let banco = abrirBanco(arquivo);
  const servidor = criarApp(banco).listen(0, '127.0.0.1');
  await once(servidor, 'listening');
  const base = `http://127.0.0.1:${servidor.address().port}`;
  try {
    let resposta = await fetch(base, { redirect: 'manual' });
    assert.equal(resposta.status, 302);
    assert.equal(resposta.headers.get('location'), '/Projects.html');
    for (const rota of ['/Projects.html', '/cadastrar_post.html', '/style.css']) {
      assert.equal((await fetch(base + rota)).status, 200);
    }
    assert.match(await (await fetch(base + '/blog')).text(), /Nenhum post cadastrado/);
    resposta = await fetch(base + '/posts', { method: 'POST', body: new URLSearchParams({ titulo: '   ', resumo: 'a', conteudo: 'b' }) });
    assert.equal(resposta.status, 400);
    assert.equal(banco.buscarTodosPosts().length, 0);
    const post = { titulo: "Olá <script>alert(1)</script> ' SQL", resumo: 'Resumo de teste', conteudo: 'Conteúdo completo\nSegunda linha' };
    resposta = await fetch(base + '/posts', { method: 'POST', body: new URLSearchParams(post), redirect: 'manual' });
    assert.equal(resposta.status, 303);
    assert.equal(resposta.headers.get('location'), '/blog');
    const html = await (await fetch(base + '/blog')).text();
    assert.match(html, /&lt;script&gt;/);
    assert.ok(!html.includes('<script>alert(1)</script>'));
    assert.ok(html.includes(post.resumo));
    assert.ok(html.includes(post.conteudo));
    banco.cadastrarPost({ titulo: 'Segundo', resumo: 'Mais recente', conteudo: 'Texto' });
    assert.equal(banco.buscarTodosPosts()[0].titulo, 'Segundo');
    assert.equal((await fetch(base + '/inexistente')).status, 404);
    banco.fechar();
    banco = abrirBanco(arquivo);
    const posts = banco.buscarTodosPosts();
    assert.equal(posts.length, 2);
    assert.equal(posts[1].titulo, post.titulo);
  } finally {
    await new Promise(resolve => servidor.close(resolve));
    banco.fechar();
    rmSync(pasta, { recursive: true, force: true });
  }
});
