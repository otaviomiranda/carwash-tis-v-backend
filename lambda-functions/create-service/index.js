const mysql = require('mysql')

var request
var response
var context_global
var data_conn

function getDataConnection() {

	data_conn = mysql.createConnection({
		host: process.env.DB_HOST,
		user: process.env.DB_USER,
		password: process.env.DB_PASSWORD,
		database: process.env.DB_NAME,
		port: process.env.DB_PORT
	})

	data_conn.connect((err) => {
		if (err) {
			console.log(err, err.stack)
			endExecute({ err, stack: err.stack }, true)
		} else {
			createService()
		}
	})
}

function createService() {

	let sql = `
		INSERT INTO 
			service
			(customer_id, car_id, request_date, payment, service_provider_id, value, status)
		VALUES (?,?,?,?,?,?,?)
	`

	data_conn.query(sql, [request.customer_id, request.car_id, request.request_date, request.payment, request.service_provider_id, request.value, request.status], function (err, result) {
		if (err) {
			console.log(err)
			endExecute({ err, stack: err.stack }, true)
		} else {
			endExecute(result);
		}
	})

}

function endExecute(message, had_error = false) {

	if (data_conn)
		data_conn.destroy();

	had_error ? response(JSON.stringify({ errorType: 'Bad Request', httpStatus: 404, trace: message })) : response(null, message)

	context_global.done();
}

exports.handler = (event, context, callback) => {

	request = event.resource ? JSON.parse(event.body) : event
	response = callback
	context_global = context

	try {

		getDataConnection()

	} catch (err) {

		console.log(err)

		endExecute({ err }, true)

	}
}