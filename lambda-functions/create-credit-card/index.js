const mysql = require('mysql')

var response
var context_global
var data_conn
var request

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
			endExecute(JSON.stringify({ err, stack: err.stack }), true)
		} else {
			createCreditCard()
		}
	})
}

function createCreditCard() {

	let sql = `
		INSERT INTO 
			credit_card
			(credit_card_number, expiration_date, cardholder, cvv, flag, customer_fk)
		VALUES (
			"${request.credit_card_number}",
			"${request.expiration_date}",
			"${request.cardholder}",
			"${request.cvv}",
			"${request.flag}",
			"${request.customer_fk}"
		)
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

	had_error ? response(message) : response(null, message)

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

		endExecute(err, true)

	}
}