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
