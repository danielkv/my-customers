interface ObjectLike {
    [key: string]: any;
}

export const urlBase = 'http://localhost:3001';

/**
 * All requests should pass through this function
 */
export async function fetcher(url: string, body?: ObjectLike) {
    const opts = {
        body: undefined,
    };

    if (body) opts.body = JSON.stringify(body);

    const response = await fetch(`${urlBase}${url}`);

    return await response.json();
}
