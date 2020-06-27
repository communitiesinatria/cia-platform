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
const { UserModel, TeamMemberModel, ProjectModel, EventModel } = require('./controller/model');
const { request } = require('http');

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
                    props: {
                        isVisible: false
                    }
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
        {
            resource: ProjectModel,
            options: {
                actions: {
                    new: {
                        before: request => {
                            if (request.payload.links) {
                                request.payload = {
                                    ...request.payload,
                                    links: request.payload.links.split(',')
                                }
                            }
                        }
                    }
                }
            },
            EventModel
        },],
    branding: {
        companyName: 'Communities in Atria',
        logo: 'https://instagram.fblr1-4.fna.fbcdn.net/v/t51.2885-19/s150x150/90442011_199456528028751_8249355337673474048_n.jpg?_nc_ht=instagram.fblr1-4.fna.fbcdn.net&_nc_ohc=AUnGVIFSfdcAX_VdXDl&oh=0f7e441346b9d3d56d027b435e238f20&oe=5F200B40',
        theme: {
            colors: {
                primary100: '#00E9AA',
                accent: '#00E9AA',
                separator: '#454655',
            }

        }
    },
    rootPath: '/admin',
})

const router = AdminBroExpressjs.buildAuthenticatedRouter(adminBro, {
    authenticate: async (email, password) => {
        const user = await UserModel.findOne({ email });
        if (user.role === 'admin') {

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