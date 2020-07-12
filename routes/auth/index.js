const { User } = require('../../controller')
const { signAccessToken } = require('./jwt_helpers')

const route = require('express').Router();


route.post('/', async (request, response) => {
	console.log(request.body);
	if ((request.body.email || request.body.username) && request.body.password) {

		const user = (await User.authenticateUserCredentials(request.body))
		if (user) {

			//response.cookie('token', await signAccessToken(user), { maxAge: 900000, httpOnly: true });

			response.send(String(await signAccessToken(user)));

		} else {
			response.status(400).send('Invalid Credentials');
		}
		response.end();

	} else {
		response.status(401).send();
		response.end();
	}
});


module.exports = route