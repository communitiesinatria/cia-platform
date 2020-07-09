const { UserModel, ProjectModel, EventModel } = require('./model');

const User = {
    model: UserModel,
    _ls: async function (filter = {}) {
        const results = await UserModel.find(filter);
        return results.map(user => user.username);
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
    }
}

module.exports = User;