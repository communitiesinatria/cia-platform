const { User, Post } = require('../../controller')
const { signAccessToken, verifyToken } = require('./jwt')

const route = require('express').Router();

// User authentication route
route.post('/', async (req, res) => {
	if ((req.body.email || req.body.username) && req.body.password) {
		const user = (await User.authenticateUserCredentials(req.body))
		if (user) {
			res.send(String(await signAccessToken(user)));
		} else {
			res.status(400).send('Invalid Credentials');
		}
		res.end();
	} else {
		res.status(401).send('Bad request, no shit');
		res.end();
	}
});

// get router details
route.get('/user', autherize, async (req, res) => {
	if (req.user_id) {
		res.send(JSON.stringify(await User.getUserData(req.user_id)));
	} else {
		res.status(400).send('u have failed, remember that');
	}
});

route.post('/posts', autherize, async (req, res) => {
	if (req.user_id) { // if autherized
		try {
			res.send(JSON.stringify(await Post.postPost(req.body)));
		} catch (error) {
			res.status(401).send(error);
		}
	} else { // if for whatever reson its not authorized and manages to get throught the middleware
		res.status(400).send();
	}
});

route.get('/posts', async (req, res) => {
	try {
		res.send(JSON.stringify(await Post.getPosts()));
	} catch (error) {
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