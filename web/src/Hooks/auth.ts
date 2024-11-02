import axios from 'axios';
import { URL } from '../../../config';
export async function getAuth() {
    try {
        const response = await axios.get(URL + `auth/checkauth`, { withCredentials: true });

        if (response) {
            const userId = response.data.id;
            const userType = response.data.role;
            return { userId, userType };
        }
    } catch (error) {
        console.error('Authentication check failed:', error);
        return { authenticated: false };
    }

    return { authenticated: false };
}
