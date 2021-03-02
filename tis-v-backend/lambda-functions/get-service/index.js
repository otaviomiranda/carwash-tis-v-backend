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
			getService()
		}
	})
}

function getService() {

	let sql = `
		SELECT
			customer_id, 
			car_id, 
			created_at,  
			payment,
			service_provider_id,
			is_finalized
		FROM service 
		WHERE 
			service_id = "${request.service_id}"
	`

	data_conn.query(sql, function (err, result) {
		if (err) {
			console.log(err)
			endExecute({ err, stack: err.stack }, true)
		} else {
			endExecute({ result })
		}
	})

}

function endExecute(message, had_error = false) {

	if (data_conn)
		data_conn.destroy();

	had_error ? response(message) : response(null, JSON.stringify(message))

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