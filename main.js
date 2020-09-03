// const canvas = document.getElementById("canvas");
const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");
document.body.append(canvas);
canvas.width = innerWidth;
canvas.height = innerHeight - 4;
canvas.onclick = (e) => console.log(e.layerX, e.layerY);

function fillTriangle(x1, y1, x2, y2, x3, y3) {
  ctx.beginPath();
  ctx.lineTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.lineTo(x3, y3);
  ctx.fillStyle = prompt("type a color", ctx.fillStyle);
  ctx.fill();
  ctx.closePath();
}
