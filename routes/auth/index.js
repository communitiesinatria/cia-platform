const { User } = require('../../controller')
const { signAccessToken, verifyToken } = require('./jwt_helpers')

const route = require('express').Router();


route.post('/', async (req, res) => {
	console.log(req.body);
	if ((req.body.email || req.body.username) && req.body.password) {

		const user = (await User.authenticateUserCredentials(req.body))
		if (user) {

			//response.cookie('token', await signAccessToken(user), { maxAge: 900000, httpOnly: true });

			res.send(String(await signAccessToken(user)));

		} else {
			res.status(400).send('Invalid Credentials');
		}
		res.end();

	} else {
		res.status(401).send();
		res.end();
	}
});

route.get('/user', autherize, async (req, res) => {
	console.log(req.user_id)
	if (req.user_id) {
		res.send(JSON.stringify(await User.getUserData(req.user_id)));
	} else {
		res.status(400).send();
	}
})

async function autherize(req, res, next) {

	if (req.cookies.token) {

		try {
			req.user_id = (await verifyToken(req.cookies)).aud
			next();
		} catch (error) {
			res.status(401).send('Token invalid')
		}

	} else {
		res.status(401).send()
	}

}

module.exports = route