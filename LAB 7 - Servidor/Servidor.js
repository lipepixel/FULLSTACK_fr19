const app = require("./app");

// 0.0.0.0 permite conexões de outros computadores da rede.
const servidor = app.listen(80, "0.0.0.0", function () {
    console.log("Servidor rodando na porta 80.");
    console.log("Home: http://localhost/Home.html");
    console.log("Projetos: http://localhost/Project.html");
});

servidor.on("error", function (erro) {
    console.error("Não foi possível iniciar o servidor:", erro.message);
    process.exitCode = 1;
});
