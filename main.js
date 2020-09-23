// const canvas = document.getElementById("canvas");
const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");
const coords = [];
const floatingPolygons = [];
const shiftDirections = [
  [1, 1],
  [1, 0],
  [1, -1],
  [0, -1],
  [-1, -1],
  [-1, 0],
  [-1, 1],
  [0, 1],
];
let count = 1;
document.body.append(canvas);
canvas.width = innerWidth;
canvas.height = innerHeight - 4;

// canvas.onclick = (e) => console.log(e.layerX, e.layerY);

canvas.onclick = (e) => {
  fillCircle(e.layerX, e.layerY, count++, true);
  coords.push(e.layerX, e.layerY);
};

const startFill = (document.body.onkeydown = (e) => {
  if (e.key == "Enter") {
    // fillPolygon(...coords);
    const timer = floatPolygon([...coords]);
    coords.length = 0;
    // document.body.onkeydown = (e) => {
    //   if (e.key == "Enter") {
    //     clearInterval(timer);
    //     document.body.onkeydown = startFill;
    //   }
    // };
  }
});

canvas.onmousedown = (e) => {
  if (!e.altKey) return;
  canvas.onmousemove = (e) => fillCircle(e.layerX, e.layerY, count++, true);
  canvas.onmouseup = (e) => {
    canvas.onmousemove = null;
    canvas.onmouseup = null;
  };
};

setInterval(() => (count ? (count *= 0.85) : 0), 40);

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

function fillPolygon(...coords) {
  if (coords.length < 6) {
    console.error("minimum 3 points coordinates required");
  } else if (coords.length % 2) {
    console.error("type even number of coordinates");
  } else {
    ctx.beginPath();
    for (let i = 0; i < coords.length; i += 2) {
      ctx.lineTo(coords[i], coords[i + 1]);
    }
    ctx.fill();
    ctx.closePath();
  }
}

function floatPolygon(coords) {
  if (coords.length < 6) {
    console.error("minimum 3 points coordinates required");
  } else if (coords.length % 2) {
    console.error("type even number of coordinates");
  } else {
    const shiftCoords = [];
    for (let i = 0; i < coords.length; i += 2) {
      shiftCoords.push(...shiftDirections[rndNumber(8)]);
    }

    const polygon = { coords, color: rndNumber(360), life: 100 };
    floatingPolygons.push(polygon);

    drawFloatingPolygons(true);

    const timer = setInterval(() => {
      for (let i = 0; i < coords.length; i++) {
        coords[i] += shiftCoords[i] * 1;
      }
      // ctx.clearRect(0, 0, canvas.width, canvas.height);
      polygon.color += 3;
      polygon.life -= 0.25;
      if (!polygon.life) {
        clearInterval(timer);
        floatingPolygons.splice(floatingPolygons.indexOf(polygon), 1);
      }
    }, 100);

    return timer;
  }
}

function drawFloatingPolygons(start) {
  if (start && !drawFloatingPolygons.timer) {
    drawFloatingPolygons.timer = setInterval(() => {
      floatingPolygons.forEach((polygon) => {
        ctx.fillStyle = `hsl(${polygon.color}, 70%, ${
          100 - polygon.life / 2
        }%, ${polygon.life / (200 - polygon.life) / 2})`;
        fillPolygon(...polygon.coords);
      });
    }, 100);
  } else if (!start && drawFloatingPolygons.timer) {
    clearInterval(drawFloatingPolygons.timer);
    delete drawFloatingPolygons.timer;
  }
}

function rndNumber(max) {
  return Math.floor(Math.random() * max);
}
