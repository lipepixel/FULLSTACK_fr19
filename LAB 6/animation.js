let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
let imagem = new Image();
let largura = 60;
let altura = 80;

// A imagem começa no centro do canvas.
let x = (canvas.width - largura) / 2;
let y = (canvas.height - altura) / 2;

function desenhar() {
    if (imagem.complete && imagem.naturalWidth > 0) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(imagem, x, y, largura, altura);
    }
}

imagem.onload = desenhar;
imagem.src = "desenho.webp";

function moverImagem(evento) {
    let posicao = canvas.getBoundingClientRect();

    // Converte a posição da tela para a área interna do canvas.
    let mouseX = (evento.clientX - posicao.left - canvas.clientLeft) * canvas.width / canvas.clientWidth;
    let mouseY = (evento.clientY - posicao.top - canvas.clientTop) * canvas.height / canvas.clientHeight;

    // Descontar a metade coloca o ponteiro no centro da imagem.
    x = mouseX - largura / 2;
    y = mouseY - altura / 2;

    // Impede que qualquer parte da imagem ultrapasse as bordas.
    if (x < 0) x = 0;
    if (y < 0) y = 0;
    if (x > canvas.width - largura) x = canvas.width - largura;
    if (y > canvas.height - altura) y = canvas.height - altura;

    desenhar();
}

// pointermove funciona com mouse e também com o toque no celular.
document.addEventListener("pointermove", moverImagem);
