const AdminBro = require('admin-bro')
const AdminBroExpress = require('admin-bro-expressjs')

AdminBro.registerAdapter(require('admin-bro-mongoose'))

//resources or models
const { UserModel, TeamMemberModel, ProjectModel, EventModel } = require('./controller/model')

const adminBro = new AdminBro({
    resources: [UserModel, TeamMemberModel, ProjectModel, EventModel],
    rootPath: '/admin',
})

const router = AdminBroExpress.buildRouter(adminBro)

module.exports = router;