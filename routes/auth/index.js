const { User } = require('../../controller')
const { signAccessToken } = require('../jwt_helpers/jwt_helper')

const route = require('express').Router();

//var session = require('express-session');

/*route.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));*/

route.post('/', async (request, response) => {
	console.log(request.body);
	if ((request.body.email || request.body.username) && request.body.password) {

		const user = (await User.authenticateUserCredentials(request.body))
		if (user) {

			console.log('sending_accesstoken')

			response.cookie('token', await signAccessToken(user));

			response.redirect('/irenic');

		} else {
			response.send('Incorrect Username and/or Password!');
		}
		response.end();

	} else {
		response.send('Please enter Username and Password!');
		response.end();
	}
});

/* route.get('/home', function (request, response) {
	if (request.session.loggedin) {
		response.send('Welcome back, ' + request.session.username + '!');
	} else {
		response.send('Please login to view this page!');
	}
	response.end();
}); */

module.exports = route