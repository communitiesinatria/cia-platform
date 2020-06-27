const AdminBro = require('admin-bro')
const AdminBroExpress = require('admin-bro-expressjs')


const adminBro = new AdminBro({
    databases: [],
    rootPath: '/admin',
})

const router = AdminBroExpress.buildRouter(adminBro)

module.exports=router;