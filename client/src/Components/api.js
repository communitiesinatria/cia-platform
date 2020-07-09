import axios from 'axios'


const endpoint = window.location.origin === 'http://localhost:3000' ? 'http://localhost:8000' : window.location.origin;

export async function getMembers() {
    let result;

    try {
        result = await axios.get(`${endpoint}/api/team`);
        return result.data;
    } catch (error) {
        console.log(error);
        return [];
    }

}