try {
    require('dotenv').config()
} catch { }

const axios = require('axios');
const { setupCache } = require('axios-cache-adapter');

const AdminBro = require('admin-bro')
const AdminBroExpressjs = require('admin-bro-expressjs')
const roles = require('./roles.json')
const x = require('./crypt');
const bcrypt = require('bcrypt');

//resources or models
const { UserModel, ProjectModel, EventModel } = require('./controller/model')

AdminBro.registerAdapter(require('admin-bro-mongoose'))

const cache = setupCache({
    maxAge: 15 * 60 * 1000
})

// Create `axios` instance passing the newly created `cache.adapter`
const api = axios.create({
    adapter: cache.adapter
})


const adminBro = new AdminBro({
    resources: [
        {
            resource: UserModel,
            options: {
                properties: {
                    password: {
                        isVisible: false,
                    },
                    _id: {
                        isId: !!1,
                        isVisible: {
                            list: false, edit: !1, filter: !!1, show: !1,
                        },
                    },
                    /* role: {
                        
                    }, */
                    setpassword: {

                        isVisible: {
                            list: false, edit: !!1, filter: !1, show: !1,
                        },
                    },
                    github: {

                        isVisible: {
                            list: false, edit: !!1, filter: !!1,
                        },
                    },
                    instagram: {

                        isVisible: {
                            list: false, edit: !!1, filter: !!1,
                        },
                    },
                    profile_img: {

                        isVisible: {
                            list: false, edit: !!1, filter: !1,
                        },
                    },
                    bio: {
                        isVisible: {
                            list: false, edit: !!1, filter: !1,
                        },
                    },

                    props: {
                        isVisible: false
                    }
                },
                actions: {
                    edit: {
                        // isAccessible: data => (data.currentAdmin.role === roles.ADMIN) || (data.currentAdmin.role === roles.CORE) /* && (data.currentAdmin._id === data.record.param('_id')) */,
                        before: onchange,
                    },
                    new: {
                        // isAccessible: data => (data.currentAdmin.role === roles.ADMIN) || (data.currentAdmin.role === roles.CORE),
                        before: onchange,
                    }
                }
            },

        },
        {
            resource: ProjectModel,
            options: {
                properties: {

                }
            }
        },

        EventModel
    ],
    branding: {
        companyName: 'Communities in Atria',
        logo: 'https://scontent-maa2-2.cdninstagram.com/v/t51.2885-19/s320x320/111731698_3307936972620965_2167500350055054156_n.jpg?_nc_ht=scontent-maa2-2.cdninstagram.com&_nc_ohc=JSTcrwP0_qwAX--lazd&oh=5a4e494609093965c91f5bd6b0814313&oe=5F8439B0',
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

async function onchange(request) {

    if (request.payload.setpassword) {
        request.payload = {
            ...request.payload,
            password: await bcrypt.hash(request.payload.setpassword, 10),
            setpassword: undefined,
        }
    }

    if (!request.payload.profile_img) {
        if (request.payload.github) {
            const profile_img = (await api.get(`https://api.github.com/users/${request.payload.github}`)).data.avatar_url;

            request.payload = {
                ...request.payload,
                profile_img
            }
        }
        else if (request.payload.instagram) {
            const profile_img = (await api.get(`https://www.instagram.com/${request.payload.instagram}/?__a=1`)).data.graphql.user.profile_pic_url;

            request.payload = {
                ...request.payload,
                profile_img
            }
        }
    }

    return request

}


const router = AdminBroExpressjs.buildAuthenticatedRouter(adminBro, {
    authenticate: async (email, password) => {
        const user = await UserModel.findOne({ email });
        if (user && ((user.role === roles.ADMIN) || (user.role === roles.CORE) || (user.role === roles.GOD))) {

            if (await bcrypt.compare(password, user.password)) {
                return user
            }
        }
        return false
    },
    cookiePassword: process.env.CRPYT_KEY,
})

module.exports = router;