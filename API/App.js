import express from 'express'
import bodyParser from 'body-parser'
import ChartData from './ChartData.js'

const app = express()

app.use(bodyParser.json())
app.use(function (_req, res, next) {
	res.header('Access-Control-Allow-Origin', '*')
	res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE')
	res.header(
		'Access-Control-Allow-Headers',
		'Origin, X-Requested-With, Content-Type, Accept'
	)
	next()
})

app.get('/data?', (req, res) => {
	const from = req.query.from
	const to = req.query.to

	const chartData = new ChartData()
	const data = chartData.getData(from, to)
	res.status(200).set({ 'Content-Type': 'application/json' }).json(data)
})

// app.get('/stock/getmax/:type', (req, res) => {
// 	const type = req.params.type

// 	const stock = new Stock()
// 	const data = stock.getMax(type)
// 	res.status(200).set({ 'Content-Type': 'application/json' }).json(data)
// })

export default app