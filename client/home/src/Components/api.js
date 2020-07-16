import axios from 'axios'
import { setupCache } from 'axios-cache-adapter'
import Cookies from 'universal-cookie';
// Create `axios-cache-adapter` instance
const cache = setupCache({
    maxAge: 15 * 60 * 1000
})

// Create `axios` instance passing the newly created `cache.adapter`
const api = axios.create({
    adapter: cache.adapter
})
const endpoint = window.location.origin === 'http://localhost:3000' ? 'http://localhost:8000' : window.location.origin;

export async function getMembers() {
    console.log(endpoint);
    let result;
    try {
        result = await api.get(`${endpoint}/api/team`);
        return result.data;
    } catch (error) {
        console.log(error);
        return [];
    }
}

export async function register({ email, username, password, github, instagram }) {
    let result;
    try {
        result = await api.post(`${endpoint}/api/register`, { email, username, password, github, instagram });
        return result.data;
    } catch (error) {
        console.log(error);
        return [];
    }
}

export async function login({ username, email, password }) {
    let result;
try {
        //result = await api.post(`${endpoint}/auth`, { email, username, password });

        result = await api({
            maxRedirects: 0,
            method: 'post',
            url: `${endpoint}/auth`,
            data: { email, username, password }
        });

        //result = await loadDoc(`${endpoint}/auth`, { email, username, password })

        console.log(result);
        if (result.status === 400) {
            return [{ message: result.data }]
        } else if (result.status === 200) {
            const cookies = new Cookies();
            cookies.set('token', result.data, { path: '/' });
            window.location.href = (`${endpoint}/irenic/`);
            return result.data;
        }


    } catch (error) {
        console.log(error);
        return [{ message: 'invalid username or password' }]
    }
}

/* function loadDoc(url, { username, email, password }) {

    const id = email || username;
    const id_name = email ? 'email' : username ? 'username' : '';

    var xhttp = new XMLHttpRequest();
    return new Promise((res, rej) => {
        xhttp.onreadystatechange = function () {
            if (this.readyState === 4 && this.status === 200) {
                res(this.responseText);
            } else {
                rej(this);
            }
        };
        xhttp.open("POST", url, true);
        xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhttp.send(`${id_name}=${id}&password=${password}`);
    })

}
 */