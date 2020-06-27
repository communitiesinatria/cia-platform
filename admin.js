const AdminBro = require('admin-bro')
const AdminBroExpress = require('admin-bro-expressjs')

AdminBro.registerAdapter(require('admin-bro-mongoose'))

//resources or models
const { UserModel } = require('./controller/model/users')
const { TeamMemberModel } = require('./controller/model/teams')
const { EventModel, ProjectModel } = require('./controller/model/cia-media')

console.log(UserModel, TeamMemberModel, ProjectModel, EventModel)

const adminBro = new AdminBro({
    resources: [UserModel, TeamMemberModel, ProjectModel, EventModel],
    rootPath: '/admin',
})

const router = AdminBroExpress.buildRouter(adminBro)

module.exports = router;