import axios from 'axios';

interface ObjectLike {
    [key: string]: any;
}

export const urlBase = 'http://localhost:3001'; //process.env.NEXT_PUBLIC_API_URL;

/**
 * All requests should pass through this function
 */
export async function fetcher(url: string, params?: ObjectLike) {
    const response = await axios.get(`${urlBase}${url}`, { params });

    return response.data;
}
