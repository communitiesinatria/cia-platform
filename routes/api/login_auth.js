const User = require('../../controller')
const express = require('express');
//var session = require('express-session');
var path = require('path');
const login_route = express.Router();

/*login_route.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));
*/


login_route.post('/auth', async (request, response) => {
	console.log(req.body);
	var password = request.body.password;
	var email = request.body.email;
	if (email && password) {

		const isValid = (await User.authenticateUserCredentials({email,password}))
			if (isValid) {
				// request.session.loggedin = true;
				// request.session.username = email;
				response.redirect('/home');
			} else {
				response.send('Incorrect Username and/or Password!');
			}			
			response.end();
		
	} else {
		response.send('Please enter Username and Password!');
		response.end();
	}
});

login_route.get('/home', function(request, response) {
	if (request.session.loggedin) {
		response.send('Welcome back, ' + request.session.username + '!');
	} else {
		response.send('Please login to view this page!');
	}
	response.end();
});

module.exports = login_route