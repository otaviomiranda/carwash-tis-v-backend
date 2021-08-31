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
			endExecute({ err: err, stack: err.stack }, true)
		} else {
			getAccount()
		}
	})
}

function getAccount() {

	let sql = `
		SELECT
			person_id, 
			first_name, 
			last_name, 
			phone, 
			is_customer 
		FROM person 
		WHERE 
			email = ?
			AND password = ?
	`

	data_conn.query(sql, [request.email, request.password], function (err, result) {
		if (err) {
			console.log(err)
			endExecute({ err, stack: err.stack }, true)
		} else {
			if (result[0])
				getForeignReference(result[0])
			else
				endExecute({ err: 'Email and password did not match' }, true)
		}
	})

}

function getForeignReference(person) {

	let id = person.person_id
	let type = person.is_customer == 0 ? 'service_provider' : 'customer'

	let sql = `
		SELECT 
			${(type + '_id')} 
		FROM ${type}
		WHERE 
			person_fk = ?
	`

	data_conn.query(sql, [id], function (err, result) {
		if (err) {
			console.log(err)
			endExecute({ err, stack: err.stack }, true)
		} else {

			person[(type + '_id')] = result[0][(type + '_id')]
			endExecute({ result: person })
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