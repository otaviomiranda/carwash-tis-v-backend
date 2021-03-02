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
			createAccount()
		}
	})
}

function createAccount() {

	let sql = `
		INSERT INTO 
			person
			(first_name, last_name, birth_date, phone, email, password, cpf, is_customer)
		VALUES (
			"${request.first_name}",
			"${request.last_name}",
			"${request.birth_date}",
			"${request.phone}",
			"${request.email}",
			"${request.password}",
			"${request.cpf}",
			"${request.is_customer}"
		)
	`

	data_conn.query(sql, function (err, result) {
		if (err) {
			console.log(err)
			endExecute({ err, stack: err.stack }, true)
		} else {
			createForeignReference(request.is_customer, result.insertId)
		}
	})

}

function createForeignReference(is_customer, insert_id) {

	let table = is_customer == 0 ? 'service_provider' : 'customer'
	
	let sql = `
		INSERT INTO 
			${table}
			(person_fk)
		VALUES (${insert_id})
	`

	data_conn.query(sql, function (err, result) {
		if (err) {
			console.log(err)
			endExecute({ err, stack: err.stack }, true)
		} else {

			table += '_id'

			endExecute({
				result: {
					person_id: insert_id,
					[table]: result.insertId
				}
			 })
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