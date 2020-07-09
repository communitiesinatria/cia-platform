import axios from 'axios'

const endpoint = 'http://localhost:8000/api'

export async function getMembers() {
    let result;

    try {
        result = await axios.get(`${endpoint}/team`);
        return result.data;
    } catch (error) {
        console.log(error);
        return [];
    }

}