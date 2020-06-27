const { UserModel, TeamMemberModel, ProjectModel, EventModel } = require('./model');

const User = {
    model: UserModel,
    ls: async function (filter = {}) {
        const results = await UserModel.find(filter);
        return results;
    }
}

module.exports = User;