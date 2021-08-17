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
			updateAccount()
		}
	})
}

function updateAccount() {

	let sql = `
		UPDATE  
			person
			SET first_name="${request.first_name}",
			last_name=	   "${request.last_name}",
			birth_date=	   "${request.birth_date}",
			phone=		   "${request.phone}",
			email=		   "${request.email}",
			password=	   "${request.password}",
			cpf=		   "${request.cpf}"
			WHERE person_id="${request.person_id}"`

	data_conn.query(sql, function (err, result) {
		if (err) {
			console.log(err)
			endExecute(JSON.stringify({ err, stack: err.stack }), true)
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