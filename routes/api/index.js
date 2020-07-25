const router = require('express').Router()
const { User, Event } = require('../../controller')
const roles = require('../../roles.json')
const axios = require('axios')

router.get('/testing', async (req, res) => {
    res.send(JSON.stringify((await User._ls())));
});

router.get('/events', async (req, res) => {
    res.send(JSON.stringify((await Event._ls())));
});

router.get('/team', async (req, res) => {

    const result = await Promise.all([User.getwithrole(roles.ADMIN), User.getwithrole(roles.CORE)]);

    let members = result.flat().filter(m => m.username !== 'admin');

    members = members.map(member => {

        return ((async () => {

            if (!member.profile_img) {
                let profile_img;

                try {
                    profile_img = (await axios.get(`https://api.github.com/users/${member.github}`)).data.avatar_url;
                } catch (error) {
                    profile_img = (await axios.get(`https://www.instagram.com/${member.instagram}/?__a=1`)).data.graphql.user.profile_pic_url;
                }
                member.profile_img = profile_img;
            }
            let name;
            try {
                name = (await axios.get(`https://api.github.com/users/${member.github}`)).data.name;
            } catch (error) {
                console.log(error)
            }

            member.name = name;
            return member

        })())
    });

    members = await Promise.all(members);

    res.send(JSON.stringify(members));

})

router.post('/register', async (req, res) => {

    const result = (await User.registeruser(req.body));
    res.send(JSON.stringify(result));
})






module.exports = router;