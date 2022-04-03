const express = require('express')
const path = require('path')
const stocks = require('./stocks')

const app = express()
app.use(express.static(path.join(__dirname, 'static')))

app.get('/stocks', async (req, res) => {
  const stockSymbols = await stocks.getStocks()
  res.send({ stockSymbols })
  console.log("Available Stocks:")
  console.log(stockSymbols)
})

app.get('/stocks/:symbol', async (req, res) => {
  try {
    const { params: { symbol } } = req
    const data = await stocks.getStockPoints(symbol, new Date())
    res.send(data)
    console.log(`${symbol} Stocks`)
    console.log(data)
  }catch(e) {
    console.log("CRASHED PLEASE TRY AGAIN") // Log message to console if app crashes
  }
})

app.listen(3000, () => console.log('Server is running!'))
