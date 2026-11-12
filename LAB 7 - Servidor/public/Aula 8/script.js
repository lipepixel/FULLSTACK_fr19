let idades = [18,19];
console.log(idades);

idades.push(20);
console.log(idades);

idades.pop();
console.log(idades);

/* let retangulo = {
    x: 10,
    y: 10,
    l: 50,
    a: 50,
    cor1: "blue",
    cor2: "red"
} */

class retangulo {
    constructor(x, y, l, a, cor1, cor2) {
        this.x = x;
        this.y = y;
        this.l = l;
        this.a = a;
        this.cor1 = cor1;
        this.cor2 = cor2;
    }
    desenha(){
        ctx.beginPath();
        ctx.linewidth = 2;
        ctx.fillStyle = this.cor1;
        ctx.strokeStyle = this.cor2;
        ctx.fillRect(this.x, this.y, this.l, this.a);
        ctx.closePath();
    }
}

class circulo {
    constructor(x, y, r, cor1, cor2) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.cor1 = cor1;
        this.cor2 = cor2;
    }  
    desenha(){
        ctx.beginPath();
        ctx.linewidth = 2;
        ctx.fillStyle = this.cor1;
        ctx.strokeStyle = this.cor2;
        ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
        ctx.fill();
        ctx.stroke();
        ctx.closePath();
    }
}




let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

let r1 = new retangulo(10, 10, 50, 50, "red", "blue");
let r2 = new retangulo(340, 10, 50, 50, "green", "yellow");
let r3 = new retangulo(10, 340, 50, 50, "purple", "orange");
let r4 = new retangulo(340, 340, 50, 50, "pink", "black");
r1.desenha();
r2.desenha();
r3.desenha();
r4.desenha();

let c1 = new circulo(200, 200, 30, "blue", "red");
c1.desenha();

function animacao(){
    // apaga canvas
    ctx.clearRect(0, 0, 400,400);
    
    // move objeto
    if(r1.x == 350){
        aux = -1;
    }
    if(r1.x == 0){
        aux = +1;
    }

    r1.x += aux

    // desenha objeto
    r1.desenha();

    requestAnimationFrame(animacao);
}

animacao();
