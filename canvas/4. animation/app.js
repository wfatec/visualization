// import shine from './assets/icon-shine.png'

const canvas = document.getElementById("canvas");
const canvas1 = document.getElementById("canvas1");
const canvas2 = document.getElementById("canvas2");
const canvas3 = document.getElementById("canvas3");

const setColorTick2 = (ctx, $this) => {
  // 填充外环颜色
  ctx.save();
  ctx.beginPath();
  ctx.fillStyle = $this.fillStyle;
  if ($this.hover) {
    ctx.shadowColor = "rgba(255, 200, 87,1)";
    ctx.shadowBlur = 60;
  }
  ctx.moveTo(0, 0);
  ctx.arc(0, 0, $this.cHeight, 50, $this.index + 50, false);
  // ctx.closePath()
  ctx.fill();
  ctx.globalCompositeOperation = "destination-out";
  // 填充内环颜色
  ctx.beginPath();
  ctx.fillStyle = "#fff";
  ctx.ellipse(-1, 0, $this.cHeight - 4, $this.cHeight - 14, 0, 0, 2 * Math.PI);
  ctx.fill();
  ctx.restore();
};
const setColorTick = (ctx, $this) => {
  ctx.save();
  for (var i = 0; i <= $this.index; i++) {
    ctx.beginPath();
    ctx.lineWidth = 20;
    ctx.strokeStyle = $this.strokeStyle;
    if ($this.hover === true) {
      ctx.shadowColor = "rgba(255, 200, 87,1)";
      ctx.shadowBlur = 40;
    }
    ctx.arc(
      0,
      0,
      $this.cHeight,
      ((270 - (360 / 50) * i) * Math.PI) / 180,
      ((270 - (360 / 50) * (i + 1) + 0.5) * Math.PI) / 180,
      true
    );
    ctx.stroke();
  }
  ctx.restore();
};

const $this = {
  moveflag: true,
  hover1: true,
  hover2: true,
  hover3: true,
  hover4: true,
  percent1: 90,
  percent2: 90,
  percent3: 90,
  score: 50, // 百分比
  lineNums: 50, // 外环线数量
  deg1: (Math.PI * 12) / (6 * 50),
  isEnd: false,
  setColorTick2,
  setColorTick,
};

const render = () => {
  const cWidth = canvas.width;
  const cHeight = canvas.height;
  const ctx = canvas.getContext("2d");
  var gradientLine = ctx.createLinearGradient(64, 200, 200, 0);
  gradientLine.addColorStop(0, "rgba(188,167,124,0.4)");
  gradientLine.addColorStop(1, "rgba(89,89,101,0.08)");
  ctx.save();
  ctx.clearRect(0, 0, cWidth, cHeight);
  ctx.translate(cWidth / 2, cHeight / 2);
  // ctx.scale(1.9, 0.6)
  ctx.save();
  ctx.beginPath();
  ctx.lineWidth = 2;
  ctx.fillStyle = gradientLine;
  ctx.strokeStyle = gradientLine;
  ctx.ellipse(-1, 0, cWidth / 4.5, cHeight / 4.5, 0, 0, 2 * Math.PI);
  // ctx.arc(0, 0, cHeight / 2, 0, 2 * Math.PI)
  if ($this.hover4) {
    ctx.shadowColor = "rgba(255, 200, 87,1)";
    ctx.shadowBlur = 30;
  }
  ctx.fill();
  ctx.stroke();
  ctx.restore();
  ctx.restore();
};

const render1 = (moveflag) => {
  const canvas = canvas1;
  const cWidth = canvas.width;
  const cHeight = canvas.height;
  const percent = $this.percent1;
  const ctx = canvas.getContext("2d");
  // 色彩段数与彩色刻度条保持一致,线条无间隔,所以段数 * 2
  var gradient = ctx.createLinearGradient(0, 0, 100, 0);
  gradient.addColorStop("0", "rgba(240, 212, 155,1)");
  gradient.addColorStop("0.5", "rgba(230, 199, 138,1)");
  gradient.addColorStop("1.0", "rgba(220, 187, 119,1)");
  var gradientLine = ctx.createLinearGradient(0, 0, 100, 0);
  gradientLine.addColorStop("0", "rgba(240, 212, 155,0.6)");
  gradientLine.addColorStop("0.5", "rgba(230, 199, 138,0.6)");
  gradientLine.addColorStop("1.0", "rgba(220, 187, 119,0.6)");

  let dotSpeed = 0.04; // 数字增加速度
  let angle = 0;
  let colorIndex = 0;
  let colorSpeed = dotSpeed / $this.deg1;

  var img = new Image();
  (async function drawFrame() {
    ctx.save();
    ctx.clearRect(0, 0, cWidth, cHeight);
    ctx.translate(cWidth / 2, cHeight / 2);
    ctx.scale(1.9, 0.8);
    // 因圆本身缺口为120°,为了让缺口朝正下方,所以旋转角度为150°
    ctx.rotate((45 * Math.PI) / 180);

    let aim = ($this.score * $this.deg1) / 2;
    if (angle < aim) {
      angle += dotSpeed; // 动点旋转速度
    }

    // 外环线
    ctx.save();
    ctx.beginPath();
    ctx.lineWidth = 1;
    ctx.strokeStyle = gradientLine;

    ctx.arc(0, 0, cHeight / 2.1, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.restore();

    if (percent > 0) {
      let colorTick = {};
      if (colorIndex < percent / 2) {
        colorIndex += colorSpeed;
      }
      try {
        colorTick.cHeight = cHeight / 2.1 - 10;
        colorTick.strokeStyle = gradient;
        colorTick.hover = $this.hover1;
        if (moveflag === true) {
          colorTick.index = percent / 2;
        } else {
          colorTick.index = colorIndex;
        }
        $this.setColorTick(ctx, colorTick);
      } catch (e) {}
      if (colorIndex < percent / 2)
        window.requestAnimationFrame(await drawFrame);
      else {
        $this.isEnd = true;
        if ($this.hover1 && percent > 33) {
          img.src = "./assets/icon-shine.png";
          img.onload = function () {
            ctx.drawImage(img, 80, 60);
          };
        }
      }
    }
    // 内环线
    ctx.save();
    ctx.beginPath();
    ctx.lineWidth = 1;
    ctx.strokeStyle = gradientLine;
    ctx.arc(0, 0, cHeight / 2.1 - 20, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.restore();

    ctx.restore();
  })();
};

const render2 = (moveflag) => {
  const canvas = canvas2;
  const cWidth = canvas.width;
  const cHeight = canvas.height;
  const percent = $this.percent2;
  const ctx = canvas.getContext("2d");
  // 色彩段数与彩色刻度条保持一致,线条无间隔,所以段数 * 2
  var gradient = ctx.createLinearGradient(0, 0, 100, 0);
  gradient.addColorStop("0", "rgba(234,205,145,0.6)");
  gradient.addColorStop("0.5", "rgba(234,205,145,0.5)");
  gradient.addColorStop("1", "rgba(234,205,145,0.1)");
  var gradientLine = ctx.createLinearGradient(0, 0, 100, 0);
  gradientLine.addColorStop("0", "rgba(240, 212, 155,0.6)");
  gradientLine.addColorStop("0.5", "rgba(230, 199, 138,0.6)");
  gradientLine.addColorStop("1.0", "rgba(220, 187, 119,0.6)");

  // 画圆弧
  let rad = (Math.PI * 2) / 100; // 将360度分成100份
  let val = 0;
  (function draw() {
    ctx.save();
    ctx.clearRect(0, 0, cWidth, cHeight);
    ctx.translate(cWidth / 2, cHeight / 2);
    ctx.scale(2.1, 0.8);

    // 外环线
    ctx.save();
    ctx.beginPath();
    ctx.lineWidth = 1;
    ctx.strokeStyle = gradientLine;
    ctx.arc(0, 0, cHeight / 2.1, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.restore();

    val++;
    if (percent > 0) {
      let colorTick = {};
      try {
        colorTick.cHeight = cHeight / 2.1;
        colorTick.fillStyle = gradientLine;
        colorTick.hover = $this.hover2;
        if (moveflag === true) {
          colorTick.index = percent * rad;
        } else {
          colorTick.index = val * rad;
        }
        $this.setColorTick2(ctx, colorTick);
      } catch (e) {}
      if (val <= percent) window.requestAnimationFrame(draw);
      else $this.isEnd = true;
    }

    // 内环线
    ctx.save();
    ctx.beginPath();
    ctx.lineWidth = 1;
    ctx.strokeStyle = gradientLine;
    ctx.ellipse(
      -1,
      0,
      cHeight / 2.1 - 3,
      cHeight / 2.1 - 13,
      0,
      0,
      2 * Math.PI
    );
    ctx.stroke();
    ctx.restore();

    if (percent > 0) {
      // 内环刻度线
      ctx.save();
      ctx.beginPath();
      ctx.lineWidth = 8;
      ctx.strokeStyle = gradientLine;
      ctx.moveTo(102, -24);
      ctx.lineTo(112, -26);
      ctx.stroke();
      ctx.restore();
    }
    ctx.restore();
  })();
};

const render3 = () => {
  const canvas = canvas3;
  const cWidth = canvas.width;
  const cHeight = canvas.height;
  const ctx = canvas.getContext("2d");
  // 色彩段数与彩色刻度条保持一致,线条无间隔,所以段数 * 2
  var gradient = ctx.createLinearGradient(0, 0, 100, 0);
  gradient.addColorStop("0", "rgba(234,205,145,0.6)");
  gradient.addColorStop("0.5", "rgba(234,205,145,0.5)");
  gradient.addColorStop("1", "rgba(234,205,145,0.1)");
  var gradientLine = ctx.createLinearGradient(0, 0, 100, 0);
  gradientLine.addColorStop("0", "rgba(240, 212, 155,0.6)");
  gradientLine.addColorStop("0.5", "rgba(230, 199, 138,0.6)");
  gradientLine.addColorStop("1.0", "rgba(220, 187, 119,0.6)");

  let r1 = 1;
  let r2 = 360;
  if ($this.moveflag && $this.hover3 === false) {
    r1 = 360;
    r2 = 1;
  }

  (function draw() {
    ctx.save();
    ctx.clearRect(0, 0, cWidth, cHeight);
    ctx.translate(cWidth / 2, cHeight / 2);
    ctx.scale(2.5, 0.9);

    const pie = 2 * Math.PI;
    // 1号圆
    ctx.save();
    ctx.beginPath();
    ctx.rotate((r1 * Math.PI) / 180);

    ctx.lineWidth = 2;
    ctx.strokeStyle = gradientLine;
    ctx.arc(0, 0, cHeight / 2, 0, pie / 36);
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(0, 0, cHeight / 2, pie / 18, pie / 9);
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(0, 0, cHeight / 2, pie / 5.4, pie / 5.2);
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(0, 0, cHeight / 2, pie / 5, pie / 4.8);
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(0, 0, cHeight / 2, pie / 4.6, pie / 4.4);
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(0, 0, cHeight / 2, pie / 4.2, pie / 2.8);
    ctx.stroke();

    ctx.restore();

    // 2号圆
    ctx.save();
    ctx.beginPath();
    ctx.rotate((r2 * Math.PI) / 180);

    ctx.lineWidth = 1;
    ctx.strokeStyle = gradientLine;
    ctx.arc(0, 0, cHeight / 2 - 15, pie / 3.5, pie / 2.2);
    ctx.stroke();
    ctx.restore();

    // 3号圆
    ctx.save();
    ctx.beginPath();
    ctx.rotate((r1 * Math.PI) / 180);

    ctx.lineWidth = 1;
    ctx.strokeStyle = gradientLine;
    ctx.arc(0, 0, cHeight / 2 - 30, 0, pie);
    ctx.stroke();
    ctx.restore();
    // 4号圆
    ctx.save();
    ctx.beginPath();
    ctx.rotate((r2 * Math.PI) / 180);

    ctx.lineWidth = 1;
    ctx.strokeStyle = gradientLine;
    ctx.arc(0, 0, cHeight / 2 - 38, pie / 3, pie / 2.1);
    ctx.stroke();
    ctx.restore();
    // 5号圆
    ctx.save();
    ctx.beginPath();
    ctx.rotate((r1 * Math.PI) / 180);
    ctx.lineWidth = 2;
    ctx.strokeStyle = gradientLine;
    let xAngle = 1 * (pie / 180);
    ctx.rotate(-Math.PI / 2); // 起点
    for (let i = 0; i < pie / 1.45; i += xAngle) {
      ctx.moveTo(0, cHeight / 2 - 47);
      ctx.lineTo(0, cHeight / 2 - 45);
      ctx.rotate(xAngle); // 通过旋转角度和画点的方式绘制圆
    }
    // ctx.arc(0, 0, 105, 0, pie / 1.45)
    ctx.stroke();
    ctx.restore();
    // 6号圆
    ctx.save();
    ctx.beginPath();
    ctx.rotate((r2 * Math.PI) / 180);
    ctx.lineWidth = 2;
    ctx.strokeStyle = gradientLine;
    ctx.arc(0, 0, cHeight / 2 - 50, pie / 1.4, pie / 1.1);
    ctx.stroke();
    ctx.restore();

    ctx.restore();
    if (r1 <= 360) {
      r1 += 3;
    }
    if (r2 >= 1) {
      r2 -= 3;
    }
    requestAnimationFrame(draw);
  })();
};

render();
render1();
render2();
render3();
