const serviceAccount = require('carwash-efb5d-firebase-adminsdk-2ieb4-be93fec209.json')
const admin = require('firebase-admin')

var request
var response
var context_global

function dispatchMessage(payload) {

	admin.initializeApp({
		credential: admin.credential.cert(serviceAccount),
		databaseURL: "https://carwash-efb5d.firebaseio.com"
	});

	/* 	admin.messaging().send(payload)
			.then((response) => {
				endExecute({ message: `Successfully sent message: ${response}` });
			})
			.catch((error) => {
				console.log('Error sending message:', error);
				endExecute({ error }, true);
			}); */

	let options = {
		priority: 'high',
		timeToLive: 240000
	}

	admin.messaging().sendToTopic(request.topic, request.payload, options)
		.then((response) => {
			endExecute({ message: `Successfully sent message: ${JSON.stringify(response)}` });
		})
		.catch((error) => {
			console.log('Error sending message:', error);
			endExecute({ error }, true);
		});

}

function endExecute(message, had_error = false) {
	admin.app().delete()
	had_error ? response(JSON.stringify({ errorType: 'Bad Request', httpStatus: 404, trace: message })) : response(null, message)
	context_global.done()

}

exports.handler = (event, context, callback) => {

	request = event.resource ? JSON.parse(event.body) : event
	response = callback
	context_global = context

	try {

		dispatchMessage(request);

	} catch (err) {

		console.log(err)

		endExecute({ err }, true)

	}
}