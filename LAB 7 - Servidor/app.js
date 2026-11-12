const express = require("express");
const path = require("path");
const app = express();

app.disable("x-powered-by");
app.get("/", function (req, res) {
    res.redirect("/Home.html");
});
// Aceita os dois nomes usados nos enunciados das atividades.
app.get("/Projects.html", function (req, res) {
    res.sendFile(path.join(__dirname, "public", "Project.html"));
});
app.use(express.static(path.join(__dirname, "public")));
app.use(function (req, res) {
    res.status(404).type("text").send("Página não encontrada. Acesse /Home.html ou /Project.html.");
});

module.exports = app;
