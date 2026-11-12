// Sorteia um número inteiro de 0 a 99.
let numeroSorteado = Math.floor(Math.random() * 100);
let quantidade = 0;
let terminou = false;

function verificar() {
    let campo = document.getElementById("numero");
    let resultado = document.getElementById("resultado");
    let tentativa = Number(campo.value);

    if (terminou) {
        return;
    }

    if (campo.value.trim() === "" || !Number.isInteger(tentativa) || tentativa < 0 || tentativa > 99) {
        resultado.textContent = "Digite um número inteiro entre 0 e 99.";
        resultado.className = "erro";
        return;
    }

    quantidade = quantidade + 1;
    document.getElementById("contador").textContent = "Tentativas: " + quantidade;

    let mensagem;
    if (tentativa === numeroSorteado) {
        mensagem = "Você colocou " + tentativa + ". Acertou! Esse era o número secreto!";
        resultado.className = "acerto";
        terminou = true;
        campo.disabled = true;
        document.getElementById("adivinhar").disabled = true;
    } else if (tentativa < numeroSorteado) {
        mensagem = "Você colocou " + tentativa + ". Errou! O número secreto é maior.";
        resultado.className = "erro";
    } else {
        mensagem = "Você colocou " + tentativa + ". Errou! O número secreto é menor.";
        resultado.className = "erro";
    }

    resultado.textContent = mensagem;

    // Guarda cada palpite e sua dica em uma linha da lista.
    let linha = document.createElement("li");
    linha.textContent = mensagem;
    linha.className = resultado.className;
    document.getElementById("tentativas").appendChild(linha);

    if (terminou) {
        document.getElementById("reiniciar").focus();
    } else {
        campo.value = "";
        campo.focus();
    }
}

function novoJogo() {
    numeroSorteado = Math.floor(Math.random() * 100);
    quantidade = 0;
    terminou = false;

    let campo = document.getElementById("numero");
    campo.disabled = false;
    campo.value = "";
    document.getElementById("adivinhar").disabled = false;
    document.getElementById("contador").textContent = "Tentativas: 0";
    document.getElementById("tentativas").textContent = "";
    document.getElementById("resultado").textContent = "Novo número sorteado. Vamos de novo!";
    document.getElementById("resultado").className = "";
    campo.focus();
}
