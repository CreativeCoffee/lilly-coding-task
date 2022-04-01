const canvas = document.getElementById('chart')
const ctx = canvas.getContext('2d')
const http = new XMLHttpRequest();
let url;

function drawLine (start, end, style) {
  ctx.beginPath()
  ctx.strokeStyle = style || 'black'
  ctx.moveTo(...start)
  ctx.lineTo(...end)
  ctx.stroke()
}

function drawTriangle (apex1, apex2, apex3) {
  ctx.beginPath()
  ctx.moveTo(...apex1)
  ctx.lineTo(...apex2)
  ctx.lineTo(...apex3)
  ctx.fill()
}

drawLine([50, 50], [50, 550])
drawTriangle([35, 50], [65, 50], [50, 35])

drawLine([50, 550], [950, 550])
drawTriangle([950, 535], [950, 565], [965, 550])

document.getElementById("getStocks").addEventListener("click", () =>{
  console.log("clicked") // check event listener pops
  //const http = new XMLHttpRequest();
  url = "http://127.0.0.1:3000/stocks";
  http.onreadystatechange = (e) => {
    if(http.readyState === 4) {
      stocksList = JSON.parse(http.responseText) // convert JSON string to JS array
      for(key in stocksList) {
        for(let i = 0; i < stocksList[key].length; i++) {
          let li = document.createElement('li');
          document.getElementById("stocksList").appendChild(li);
          li.setAttribute("id", "stock");
          li.setAttribute("onclick", "getStockInfo()")
          li.innerHTML = stocksList[key][i];
      }
    }
    }
  }
  http.open("GET", url);
  http.send();
});

function getStockInfo() {
  let stockName = document.getElementById("stock").innerHTML;
  url = `http://127.0.0.1:3000/stocks/${stockName}`
  http.onreadystatechange = (e) => {
    if(http.readyState === 4) {
      document.getElementById("stockName").innerHTML = `${stockName} Values`
      let stockInformation = JSON.parse(http.responseText);
      for(key in stockInformation) {
        let li = document.createElement('li');
        document.getElementById("stockValues").appendChild(li)
        li.innerHTML = stockInformation[key].value
      }
    }
  }
  http.open("GET", url)
  http.send();
}
