import fs from 'fs'

class ChartData {
	convertCsvToJson() {
		const filePath = './ChartData.csv'
		var f = fs.readFileSync(
			filePath,
			{ encoding: 'latin1' },
			function (err) {
				console.log(err)
			}
		)
		console.log(f)

		// Split on row
		f = f.split('\r\n')

		// Get first row for column headers
		const headers = f.shift().split(';')
		var json = []
		f.forEach(function (d) {
			// Loop through each row
			const tmp = {}
			const row = d.replaceAll(',', '.').split(';')
			for (var i = 0; i < headers.length; i++) {
				if (i === 0) {
					const dateParts = row[i].split('/')

					// month is 0-based, that's why we need dataParts[1] - 1
					const dateObject = new Date(
						+dateParts[2],
						dateParts[1] - 1,
						+dateParts[0]
					)
					tmp[headers[i]] = dateObject
				} else {
					tmp[headers[i]] = parseFloat(row[i])
				}
			}
			// Add object to list
			json.push(tmp)
		})
		return json
	}
	getData(from, to) {
		const start = new Date(from).getTime()
		const end = new Date(to).getTime()
		const json = this.convertCsvToJson()
		if (from && to) {
			this.data = json.filter((d) => {
				const time = d.Date.getTime()
				return start <= time && time <= end
			})
		} else {
			this.data = json
		}

		return this.data
	}
}

export default ChartData
