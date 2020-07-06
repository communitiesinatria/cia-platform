const router = require('express').Router()
const User = require('../../controller')

router.get('/testing', async (req, res) => {
    res.send(JSON.stringify((await User.ls()).map(user => user.username)));
})

module.exports = router;