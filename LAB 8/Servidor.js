var http = require("http");
var app = require("./app");

var servidor = http.createServer(app);
servidor.listen(80, "0.0.0.0", function () {
    console.log("LAB 8 rodando na porta 80.");
    console.log("Projetos: http://localhost/Projects.html");
    console.log("Cadastro: http://localhost/cadastra");
    console.log("Login: http://localhost/login");
});

servidor.on("error", function (erro) {
    console.error("Não foi possível iniciar o servidor:", erro.message);
    process.exitCode = 1;
});
