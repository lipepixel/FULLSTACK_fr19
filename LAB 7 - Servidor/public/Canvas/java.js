let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

ctx.beginPath();
ctx.lineWidth = 2;
ctx.fillStyle = "red";
ctx.strokeStyle = "red";
ctx.fillRect(0, 0, 50, 50);
ctx.stroke(0, 0, 50, 50);
ctx.closePath();


