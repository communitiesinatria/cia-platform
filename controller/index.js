const { UserModel, PostModel, ProjectModel, EventModel } = require('./model');
const axios = require('axios');
const { setupCache } = require('axios-cache-adapter');
const Joi = require('@hapi/joi');
// const x = require('../crypt');
const bcrypt = require('bcrypt');

const cache = setupCache({
    maxAge: 15 * 60 * 1000
})

// Create `axios` instance passing the newly created `cache.adapter`
const api = axios.create({
    adapter: cache.adapter
})


const Event = {
    model: EventModel,
    _ls: async function (filter = {}) {
        const results = await this.model.find(filter);
        return results;
    },
}

const User = {
    model: UserModel,
    _ls: async function (filter = {}) {
        const results = await UserModel.find(filter);
        return results.map(user => user.username);
    },
    getUserData: async function (_id) {

        let user;
        try {
            user = await UserModel.findOne({ _id });
            user.password = undefined;
        } catch (error) {
            user = { error }
        }
        return user;

    },
    updateUser: async function (_id, data) {
        try {
            await UserModel.updateOne({ _id }, data);
            return !!1
        } catch (error) {
            console.log(error);
            return !1
        }
    },
    authenticateUserCredentials: async function ({ email, username, password }) {

        console.log(email, username, password);
        let user;
        if (email) {
            user = await UserModel.findOne({ email })
        }
        else if (username) {
            user = await UserModel.findOne({ username })
        }

        if (!user) return !1;

        if (await bcrypt.compare(password, user.password)) {
            return user;

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
                password,
                github, instagram,
                profile_img
            }
            const newuser = new UserModel(user);
            return await newuser.save();
        }
        return { details: [{ message: 'some field missing' }] }
    },

    userexist: async (email, username) => {
        const emailcheck = await UserModel.findOne({ email });
        if (emailcheck) {
            return [{ message: 'User exist' }]
        } else {
            const usernamecheck = await UserModel.findOne({ username });
            if (usernamecheck)
                return [{ message: 'Username taken' }]
            return false
        }
    },
    registeruser: async function ({ email, username, password, github, instagram }) {

        const schema = Joi.object({
            username: Joi.string()
                .alphanum()
                .min(4)
                .max(20)
                .lowercase()
                .required(),
            password: Joi.string()
                .min(6)
                .max(20)
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

        const exists = await this.userexist(email, username);

        if (exists) return exists;

        try {
            return await this.adduser({ email, username, password, github, instagram })
        } catch (error) {
            return error;
        }


    }

}

const Post = {
    model: PostModel,
    getPosts: async function () {
        try {
            return await PostModel.find({});
        } catch (error) {
            throw new Error(error)
        }
    },
    postPost: async function ({ message, created_at, created_by }) {

        try {
            if (message && created_at && created_at && created_by.username) {
                const post = new PostModel({
                    message, created_at, created_by
                })
                const newpost = await post.save()
                return true
            } else {
                throw new Error('someting missing')
            }
        } catch (error) {
            throw new Error(error)
        }
    }
}

module.exports = { User, Post, Event };