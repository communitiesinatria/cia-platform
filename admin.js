require('dotenv').config()

const path = require('path');
const AdminBro = require('admin-bro')
const AdminBroExpressjs = require('admin-bro-expressjs')
AdminBro.registerAdapter(require('admin-bro-mongoose'))



const CryptoJS = require("crypto-js");

const x = {
    key: process.env.CRPYT_KEY,
    encrypt: function (txt) {
        return CryptoJS.AES.encrypt(txt, this.key).toString();
    },
    decrypt: function (txt) {
        return CryptoJS.AES.decrypt(txt, this.key).toString(CryptoJS.enc.Utf8);
    },
}
//resources or models
const { UserModel, TeamMemberModel, ProjectModel, EventModel } = require('./controller/model')

const adminBro = new AdminBro({
    resources: [
        {
            resource: UserModel,
            options: {
                properties: {
                    password: {
                        isVisible: false
                    },
                    setpassword: {
                        type: 'string',
                        isVisible: {
                            list: false, edit: !!1, filter: !1, show: !1,
                        },
                    },
                },
                actions: {
                    new: {
                        before: (request) => {
                            if (request.payload.setpassword) {
                                request.payload = {
                                    ...request.payload,
                                    password: x.encrypt(request.payload.setpassword),
                                    setpassword: undefined,
                                }
                            }
                            return request
                        },
                    }
                }
            },

        },
        TeamMemberModel,
        ProjectModel,
        EventModel
    ],
    branding: {
        companyName: 'Communities in Atria',
        theme:{
            colors:{
                primary100:'#00E9AA',
                accent:'#00E9AA',
                separator:'#454655',
            }
            
        }
    },
    rootPath: '/admin',
})

const router = AdminBroExpressjs.buildAuthenticatedRouter(adminBro, {
    authenticate: async (username, password) => {
        const user = await UserModel.findOne({ username });
        if (user.role==='admin') {

            if (x.decrypt(user.password) === password) {
                return user
            }
        }
        return false
    },
    cookiePassword: process.env.CRPYT_KEY,
})
// const router = AdminBroExpressjs.buildRouter(adminBro)
module.exports = router;