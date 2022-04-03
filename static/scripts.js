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
  url = "http://127.0.0.1:3000/stocks";
  http.onreadystatechange = (e) => {
    if(http.readyState === 4) { // Only run next code block if request completed.
      stocksList = JSON.parse(http.responseText) // convert JSON string to JS array
      for(key in stocksList) { // loop through original JSON array
        for(let i = 0; i < stocksList[key].length; i++) { // Loop through JS array
          let li = document.createElement('li');
          document.getElementById("stocksList").appendChild(li); // Add li to ul in index.html
          li.setAttribute("id", "stock");
          li.setAttribute("onclick", "getStockInfo()")
          li.innerHTML = stocksList[key][i]; // Set html of list item to stock name.
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
    if(http.readyState === 4) { // Check req complete
      document.getElementById("stockName").innerHTML = `${stockName} Values` // set title of section to stock name + values
      let stockInformation = JSON.parse(http.responseText);
      for(key in stockInformation) { // Loop through returned JSON
        let li = document.createElement('li');
        document.getElementById("stockValues").appendChild(li)
        li.innerHTML = stockInformation[key].value // Put JSON value with Key "value" into
      }
    }
  }
  http.open("GET", url)
  http.send();
}
