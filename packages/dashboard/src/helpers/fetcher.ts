import fetch from 'unfetch';
import path from 'path';

interface ObjectLike {
    [key: string]: any;
}

export const urlBase = 'http://localhost:3001';

/**
 * All requests should pass through this function
 */
export function fetcher(url: string, body?: ObjectLike) {
    const opts = {
        body: undefined,
    };

    if (body) opts.body = JSON.stringify(body);

    return fetch(path.join(urlBase, url), opts).then((response) => response.json());
}
