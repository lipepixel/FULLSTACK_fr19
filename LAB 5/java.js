let canvas = document.getElementById("canvas1");
let ctx = canvas.getContext("2d");

// A largura e a altura permitem desenhar quadrados e retângulos.
function desenhar_quadrado(x, y, largura, altura, cor) {
    ctx.fillStyle = cor;
    ctx.fillRect(x, y, largura, altura);
}

function desenhar_linha(x1, y1, x2, y2, cor) {
    ctx.beginPath();
    ctx.strokeStyle = cor;
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
}

// Os ângulos são medidos em radianos. 2 * Math.PI faz um círculo.
function desenhar_arco(x, y, raio, inicio, fim, cor, preencher) {
    ctx.beginPath();
    if (preencher) {
        ctx.moveTo(x, y);
    }
    ctx.arc(x, y, raio, inicio, fim);
    if (preencher) {
        ctx.fillStyle = cor;
        ctx.fill();
    } else {
        ctx.strokeStyle = cor;
        ctx.stroke();
    }
}

function escrever(texto, x, y, tamanho, cor) {
    ctx.font = tamanho + "px Arial";
    ctx.fillStyle = cor;
    ctx.textAlign = "center";
    ctx.fillText(texto, x, y);
}

function desenhar_triangulo(x1, y1, x2, y2, x3, y3, cor) {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.lineTo(x3, y3);
    ctx.closePath();
    ctx.fillStyle = cor;
    ctx.fill();
}

// ===== DESENHO 1: FORMAS GEOMÉTRICAS =====
desenhar_quadrado(0, 0, 50, 50, "blue");
desenhar_quadrado(250, 0, 50, 50, "red");
escrever("Canvas", 150, 50, 20, "#333333");

desenhar_linha(50, 50, 150, 150, "blue");
desenhar_linha(250, 50, 150, 150, "red");

desenhar_arco(150, 150, 80, Math.PI, 2 * Math.PI, "#409640", false);
desenhar_arco(150, 150, 60, Math.PI, 2 * Math.PI, "#409640", false);
desenhar_arco(150, 115, 15, 0, 2 * Math.PI, "cyan", true);
desenhar_arco(150, 115, 15, 0, 2 * Math.PI, "blue", false);

desenhar_quadrado(0, 120, 30, 60, "cyan");
desenhar_quadrado(270, 135, 30, 30, "cyan");
desenhar_linha(0, 150, 300, 150, "gray");
desenhar_linha(150, 150, 150, 300, "gray");
desenhar_quadrado(110, 150, 40, 40, "red");

desenhar_arco(70, 220, 15, 0, 2 * Math.PI, "yellow", true);
desenhar_arco(70, 220, 15, 0, 2 * Math.PI, "#409640", false);
desenhar_arco(220, 220, 15, 0, 2 * Math.PI, "yellow", true);
desenhar_arco(220, 220, 15, 0, 2 * Math.PI, "#409640", false);

desenhar_arco(150, 300, 80, Math.PI, 2 * Math.PI, "#409640", false);
desenhar_arco(150, 300, 60, Math.PI, 2 * Math.PI, "#409640", false);
desenhar_arco(150, 300, 40, Math.PI, 2 * Math.PI, "cyan", true);
desenhar_arco(150, 300, 40, Math.PI, 2 * Math.PI, "#409640", false);

desenhar_quadrado(0, 240, 30, 60, "yellow");
desenhar_quadrado(30, 270, 30, 30, "yellow");
desenhar_quadrado(270, 240, 30, 60, "black");
desenhar_quadrado(240, 270, 30, 30, "black");

// ===== DESENHO 2: PAISAGEM =====
canvas = document.getElementById("canvas2");
ctx = canvas.getContext("2d");

desenhar_quadrado(0, 0, 300, 300, "#8ffbd8");
desenhar_arco(225, 75, 38, 0, 2 * Math.PI, "#ffff33", true);

desenhar_quadrado(112, 150, 75, 75, "#8b4513");
desenhar_triangulo(112, 150, 150, 112, 187, 150, "tomato");
desenhar_quadrado(120, 165, 22, 22, "#42b9e8");
desenhar_quadrado(157, 165, 22, 22, "#42b9e8");
desenhar_quadrado(142, 187, 15, 38, "#69421c");

desenhar_quadrado(0, 225, 300, 75, "gray");

desenhar_quadrado(37, 187, 15, 38, "#8b4513");
desenhar_arco(45, 172, 23, 0, 2 * Math.PI, "forestgreen", true);
desenhar_quadrado(262, 225, 15, 38, "#8b4513");
desenhar_arco(270, 210, 23, 0, 2 * Math.PI, "forestgreen", true);

desenhar_arco(0, 225, 38, 1.5 * Math.PI, 2 * Math.PI, "#4285ff", true);
desenhar_quadrado(0, 225, 38, 75, "#4285ff");
desenhar_quadrado(0, 263, 112, 37, "#4285ff");
desenhar_arco(112, 300, 37, 1.5 * Math.PI, 2 * Math.PI, "#4285ff", true);
