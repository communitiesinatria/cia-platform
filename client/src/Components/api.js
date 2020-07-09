import axios from 'axios'
import { setupCache } from 'axios-cache-adapter'

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