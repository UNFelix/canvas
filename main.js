// const canvas = document.getElementById("canvas");
const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");
let count = 1;
document.body.append(canvas);
canvas.width = innerWidth;
canvas.height = innerHeight - 4;
// canvas.onclick = (e) => console.log(e.layerX, e.layerY);
canvas.onclick = (e) => fillCircle(e.layerX, e.layerY, count++, true);

function fillTriangle(x1, y1, x2, y2, x3, y3, defaultColor) {
  ctx.beginPath();
  ctx.lineTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.lineTo(x3, y3);
  if (!defaultColor) ctx.fillStyle = prompt("type a color", ctx.fillStyle);
  ctx.fill();
  ctx.closePath();
}

function fillCircle(x, y, r, defaultColor) {
  ctx.beginPath();
  ctx.arc(x, y, r, 0, 7);
  if (!defaultColor) ctx.fillStyle = prompt("type a color", ctx.fillStyle);
  ctx.fill();
  ctx.closePath();
}
