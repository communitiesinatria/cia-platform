const { UserModel, ProjectModel, EventModel } = require('./model');
const axios = require('axios');
const { setupCache } = require('axios-cache-adapter');
const Joi = require('@hapi/joi');
const x = require('../crypt');

const cache = setupCache({
    maxAge: 15 * 60 * 1000
})

// Create `axios` instance passing the newly created `cache.adapter`
const api = axios.create({
    adapter: cache.adapter
})

const User = {
    model: UserModel,
    _ls: async function (filter = {}) {
        const results = await UserModel.find(filter);
        return results.map(user => user.username);
    },

    authenticateUserCredentials: async function ({ email, username, password }) {
        let user;
        if (email) {
            user = await UserModel.findOne({ email })
        }
        else if (username) {
            user = await UserModel.findOne({ username })
        }

        if (!user) return !1;

        if (x.decrypt(user.password) === password) {
            return 1;
        } else {
            return !1
        }
    },
    getwithrole: async function (role) {
        const results = await UserModel.find({ role });

        return results.map(user => {
            return {
                email: user.email,
                username: user.username,
                profile_img: user.profile_img,
                github: user.github,
                instagram: user.instagram,
                role: user.role,
            }
        });
    },
    adduser: async function ({ email, username, password, github, instagram, profile_img }) {
        console.log('adding user');
        if (!profile_img) {
            if (github) {
                profile_img = (await api.get(`https://api.github.com/users/${github}`)).data.avatar_url;

            }
            else if (instagram) {
                profile_img = (await api.get(`https://www.instagram.com/${instagram}/?__a=1`)).data.graphql.user.profile_pic_url;
            }
        }

        if (email && username && password) {
            const user = {
                email, username,
                name: username,
                password: x.encrypt(password),
                github, instagram,
                profile_img
            }
            const newuser = new UserModel(user);
            console.log('user added');
            return await newuser.save();
        }
        return { details: [{ message: 'some field missing' }] }
    },

    userexist: async (email) => {
        const user = await UserModel.findOne({ email });
        if (user) {
            return [{ message: 'User exist' }]
        } else {
            return false
        }
    },
    registeruser: async function ({ email, username, password, github, instagram }) {

        const schema = Joi.object({
            username: Joi.string()
                .alphanum()
                .min(3)
                .max(30)
                .required(),
            password: Joi.string()
                .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
                .required(),
            email: Joi.string()
                .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
                .required(),
        });

        let value;
        try {
            value = await schema.validateAsync({ email, username, password });
        } catch (error) {
            return error.details;
        }

        if (!github && !instagram)
            return [{ message: 'you must add either github or instagram username' }]

        const exists = await this.userexist(email);
        console.log('user exists: ', exists);
        if (exists) return exists;

        try {
            return await this.adduser({ email, username, password, github, instagram })
        } catch (error) {
            return error;
        }


    }

}

module.exports = { User };