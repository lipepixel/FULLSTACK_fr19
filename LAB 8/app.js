var express = require("express");
var path = require("path");
var crypto = require("crypto");
var app = express();

app.use(express.urlencoded({ extended: false, limit: "10kb" }));
app.use(express.static(path.join(__dirname, "Public")));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Os usuários ficam na memória e são apagados ao reiniciar o servidor.
var usuarios = [];

function mostrarResposta(resposta, titulo, mensagem, voltar) {
    var classe = "sucesso";
    if (resposta.statusCode >= 400) {
        classe = "erro";
    }
    resposta.render("resposta", { titulo, mensagem, voltar, classe });
}

app.get("/", function (requisicao, resposta) {
    resposta.redirect("/Projects.html");
});

app.get("/cadastra", function (requisicao, resposta) {
    resposta.sendFile(path.join(__dirname, "Public", "Cadastro.html"));
});

app.get("/login", function (requisicao, resposta) {
    resposta.sendFile(path.join(__dirname, "Public", "Login.html"));
});

app.post("/cadastra", function (requisicao, resposta) {
    var dados = requisicao.body || {};
    var nome = typeof dados.nome === "string" ? dados.nome.trim() : "";
    var email = typeof dados.email === "string" ? dados.email.trim().toLowerCase() : "";
    var senha = typeof dados.senha === "string" ? dados.senha : "";

    if (nome === "" || nome.length > 80 || email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || senha.length < 6 || senha.length > 128) {
        resposta.status(400);
        return mostrarResposta(resposta, "Confira os dados", "Preencha seu nome, um e-mail válido e uma senha de 6 a 128 caracteres.", "/cadastra");
    }

    for (var i = 0; i < usuarios.length; i++) {
        if (usuarios[i].email === email) {
            resposta.status(409);
            return mostrarResposta(resposta, "E-mail já cadastrado", "Esse e-mail já está cadastrado. Tente fazer login.", "/login");
        }
    }

    // O salt e o hash permitem verificar a senha sem guardar seu texto original.
    var sal = crypto.randomBytes(16).toString("hex");
    var senhaHash = crypto.scryptSync(senha, sal, 64).toString("hex");
    usuarios.push({ nome, email, sal, senhaHash });

    resposta.status(201);
    mostrarResposta(resposta, "Cadastro realizado!", "Agora você pode entrar usando seu e-mail e sua senha.", "/login");
});

app.post("/login", function (requisicao, resposta) {
    var dados = requisicao.body || {};
    var email = typeof dados.email === "string" ? dados.email.trim().toLowerCase() : "";
    var senha = typeof dados.senha === "string" ? dados.senha : "";

    if (email === "" || email.length > 254 || senha.length < 6 || senha.length > 128) {
        resposta.status(400);
        return mostrarResposta(resposta, "Confira os dados", "Preencha seu e-mail e sua senha de 6 a 128 caracteres.", "/login");
    }

    for (var i = 0; i < usuarios.length; i++) {
        if (usuarios[i].email === email) {
            var senhaHash = crypto.scryptSync(senha, usuarios[i].sal, 64).toString("hex");
            if (senhaHash === usuarios[i].senhaHash) {
                return mostrarResposta(resposta, "Login realizado!", "Seja bem-vindo, " + usuarios[i].nome + "!", "/Projects.html");
            }
        }
    }

    resposta.status(401);
    mostrarResposta(resposta, "Não foi possível entrar", "E-mail ou senha incorretos.", "/login");
});

module.exports = app;
