var test = require("node:test");
var assert = require("node:assert/strict");
var app = require("../app");

test("páginas, cadastro, login, validação e resposta EJS", async function () {
    var servidor = await new Promise(function (resolve) {
        var instancia = app.listen(0, "127.0.0.1", function () { resolve(instancia); });
    });
    var base = "http://127.0.0.1:" + servidor.address().port;

    async function enviar(rota, dados) {
        return fetch(base + rota, { method: "POST", body: new URLSearchParams(dados) });
    }

    try {
        var inicio = await fetch(base + "/", { redirect: "manual" });
        assert.equal(inicio.status, 302);
        assert.equal(inicio.headers.get("location"), "/Projects.html");

        for (var rota of ["/Projects.html", "/cadastra", "/login", "/Cadastro.html", "/Login.html", "/estilo.css"]) {
            assert.equal((await fetch(base + rota)).status, 200, rota);
        }
        var projetos = await (await fetch(base + "/Projects.html")).text();
        assert.match(projetos, /Get - Post - Template/);
        assert.match(projetos, /href="\/login"/);

        assert.equal((await enviar("/cadastra", {})).status, 400);
        assert.equal((await enviar("/cadastra", { nome: "Teste", email: "invalido", senha: "teste123" })).status, 400);
        assert.equal((await enviar("/cadastra", { nome: "Teste", email: "curta@example.test", senha: "123" })).status, 400);

        var cadastro = await enviar("/cadastra", { nome: "Pessoa Teste", email: " PESSOA@example.test ", senha: "teste123" });
        assert.equal(cadastro.status, 201);
        assert.match(await cadastro.text(), /Cadastro realizado!/);
        assert.equal((await enviar("/cadastra", { nome: "Outro", email: "pessoa@example.test", senha: "outra123" })).status, 409);

        for (var dados of [{ email: "pessoa@example.test", senha: "errada123" }, { email: "ninguem@example.test", senha: "teste123" }]) {
            var erro = await enviar("/login", dados);
            assert.equal(erro.status, 401);
            assert.match(await erro.text(), /E-mail ou senha incorretos/);
        }
        assert.equal((await enviar("/login", {})).status, 400);

        var login = await enviar("/login", { email: " PESSOA@example.test ", senha: "teste123" });
        assert.equal(login.status, 200);
        var html = await login.text();
        assert.match(html, /Login realizado!/);
        assert.match(html, /Seja bem-vindo, Pessoa Teste!/);
        assert.doesNotMatch(html, /teste123/);

        await enviar("/cadastra", { nome: "<b>Nome</b>", email: "escape@example.test", senha: "teste123" });
        var escape = await enviar("/login", { email: "escape@example.test", senha: "teste123" });
        var resposta = await escape.text();
        assert.match(resposta, /&lt;b&gt;Nome&lt;\/b&gt;/);
        assert.doesNotMatch(resposta, /<b>Nome<\/b>/);
    } finally {
        await new Promise(function (resolve) { servidor.close(resolve); });
    }
});
