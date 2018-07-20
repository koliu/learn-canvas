# Base Setup

---

## Canvas 元素的宣告

```html
<canvas id="" width="150" height="150"></canvas>

- canvas 必須有結尾標籤
- 省略 width, height 時，預設是 width=300px, height=150px
- 背景色預設值：透明
- 也可套用如 border, margin, background 的 CSS
  - 若套用 CSS 寬高時畫面有扭曲現象，可以試著使用 canvas 標籤來設定的寬高
```

或是直接完全由 JS 產生：

```js
const canvas = document.createElement('canvas');
canvas.width = 1024;
canvas.height = 768;
canvas.style.width = '1024px';
canvas.style.height = '768px';
document.body.appendChild(canvas);
```


## 針對不支援時顯示替代內容

```html
<canvas id="stockGraph" width="150" height="150">
  current stock price: $3.15 +0.15
  <img src="images/clock.png" width="150" height="150" alt=""/>
</canvas>
```

[demo](../demo/01.html)

---

## 畫圖

### 矩形

- 預設以左上角為原點，也可轉換原點位置、旋轉網格以及縮放網格
- canvas 唯一一種原始圖形--矩形。所有的圖形都必須由一或多個繪圖路徑構成
- 矩形繪圖函數：
  - fillRect(x, y, width, height): 實心矩形
  - strokeRect(x, y, width, height): 空心矩形
  - clearRect(x, y, width, height): 使設定的範圍內都變成透明
  - [DEMO](../demo/02.html)

### 使用路徑繪製

- beginPath(): 宣告要開始使用路徑來畫
- moveTo(x, y): 移動畫筆到指定的(x, y)座標點(設定繪圖起始點)
- lineTo(x, y): 畫直線到 (x, y)
- closePath(): 閉合到繪圖起始點
- fill(): 填滿(實心)；可以省略 closePath，因為 fill 對任何開放的圖形都會自動閉合
- stroke(): 邊線(空心)
- 可以搭配下面設定顏色：
  - ctx.fillStyle = "rgba(0, 0, 200, 0.5)";
  - ctx.strokeStyle = "rgb(0, 0, 0)";
- [DEMO](../demo/03.html)

### 畫圓(弧)

```js
// radius: 半徑
// startAngle: 代表沿著弧形曲線上的起始點的弧度
// endAngle: 代表沿著弧形曲線上的結束點的弧度
// anticlockwise: true 代表逆時針作畫
// 弧度換算成角度：0 ~ 360 要寫成 0 ~ 2 * Math.PI
arc(x, y, radius, startAngle, endAngle, anticlockwise);
```

- [DEMO](../demo/03.html)


### Path2D object

- 為了簡化程式碼還有改善效能，可以利用 Path2D 物件把圖形先存起來，方便後面重複使用
- 也可以使用 SVG path
- [DEMO](../demo/04.html)

### 樣式

#### 填滿樣式

- globalAlpha: 全畫面圖形半透明值，預設 1.0 (不透明)
- strokeStyle: 填滿框線
- fullStyle: 填滿背景
- fullStyle, strokeStyle 值格式：
  - orange
  - #FFA500
  - rgb(255,165,0)
  - rgba(255,165,0,1)

#### 線條樣式

- lineWidth: 設定線條寬度。
- lineCap: 設定線條結尾的樣式。
  - butt: 預設
  - round: 線條頭尾各延伸 1/2 lineWidth 為半徑的半個圓
  - square: 線條頭尾各延伸 1/2 lineWidth
- lineJoin: 設定線條和線條間接合處的樣式。
- miterLimit: 限制當兩條線相交時交接處最大長度；所謂交接處長度(miter length)是指線條交接處內角頂點到外角頂點的長度。

#### 光暈

---

### 繪製起始點的移動

- translate(x, y): 由當下的起始點位置開始偏移
- rotate(deg): 由當下的起始點位置為原心進行旋轉 deg
- scale(x, y): 由當下的起始點位置為中心縮放(縮放後，距離的計算也會跟著縮放)

#### Reset Path Initial Parameters(Scaling, Translate...)

> Canvas 預設每一個 path 的起始參數(scale, translate...)都是根據前一個 path 為基礎，
> 若不想則必須進行參數重置。

方法一：context.setTransform: 適用於只想改變縮放、變形、位移。(效能較佳)

```js
/*
 * a: Horizontal scaling
 * b: Horizontal skewing
 * c: Vertical skewing
 * d: Vertical scaling
 * e: Horizontal moving
 * f: Vertical moving
 */
context.setTransform(a, b, c, d, e, f);
```

方法二：context.save & context.restore: 適用於回復到上一個記錄點(所有的 context parameters)。

```js
context.save(); // save all current params of context

/* ... */

context.restore();
```

save/restore 是 stack，所以是先進先出的概念：

```js

context.save(); // save-1

context.save(); // save-2

context.restore(); // restore to save-2

context.restore(); // restore to save-1
```

可以利用函數把一段圖型的狀態變化封裝在函數內：

```js
function draw(ctx, ...args) {
  ctx.save(); // 儲存進函數前的狀態
  ...
  ctx.restore(); // 還原至進函數前的狀態
}
```


References:

- [How can I reset the scale of a canvas' context?](https://stackoverflow.com/questions/33694446/how-can-i-reset-the-scale-of-a-canvas-context)
- [HTML5 translate method, how to reset to default?](https://stackoverflow.com/a/17559846)
- [MDN setTransform documentation](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/setTransform)

---

### 動畫

- setInterval(update, time)
- requestAnimationFrame(update): 向瀏覽器請求更新畫面(非固定時間)
- 更新影格：
  - clearRect 或 fillRect
  - 覆蓋前次繪製的圖形

### 互動

- canvas.addEventlistener("mousemove", () => {})
- canvas.addEventlistener("mousedown", () => {})
- canvas.addEventlistener("mouseup", () => {})
- canvas.addEventlistener("click", () => {})

### 程式結構

1. init: 初始化會使用到的物件及參數
2. update: 更新邏輯，如位置
3. draw: 更新畫面

```js
function init() {

}

function update() {

}
setInterval(update, time); // 定時更新邏輯

draw() {
  clearScreen();
  ...
  requestAnimationFrame(draw);
}
requestAnimationFrame(draw); // 儘快刷新畫面(不定時)

```

### 暫停/繼續功能

> 暫停：清除 Interval 及 requestAnimationFrame
> 繼續：重建 Interval 及 requestAnimationFrame

```js
let drawId;
let updateId;
if (pause) {
  updateId = window.setInterval(update, 1000 / 24);
  drawId = requestAnimationFrame(draw);
  pause = false;
} else {
  drawId = window.cancelAnimationFrame(drawId);
  updateId && window.clearInterval(updateId);
  pause = true;
}

```

### 物理基礎

- 無法精確描述軌跡，但可利用兩兩變化量來累積差異(微分概念)
- 速度=位置的變化量(在同一時間速率下)
- 加速度=速度的變化量
- xy 座標：
  - 指定長度與角度(極座標，類似 rotate())
  - 指定 x 與 y
- 三角函數：取角度用 atan2(y, x)
  - cos = 鄰邊 / 斜邊 = 斜邊的 x 分量
  - sin =　對邊 / 斜邊 = 斜邊的 y 分量
  - tan = 對邊 / 鄰邊 = x 與 y 分量的比例
  - (r, Θ) to (x, y):
    - x = r * cos(Θ)
    - y = r * sin(Θ)
  - (x, y) to (r, Θ):
    - r = (x^2 + y^2)^0.5
    - Θ = atan2(y, x))
  - 利用角度畫多(n)邊型
    - Θ = 360 / n
    - xi = r * cos(Θ * ni)
      yi = r * sin(Θ * ni)
