import { ICacheProvider } from './cache-provider.interface';
import NodeCache from 'node-cache';

const cache = new NodeCache({ checkperiod: 120 });

export class NodeCacheProvider implements ICacheProvider {
    async add(key: string, value: string): Promise<any> {
        cache.set(key, value);
    }

    async remove(key: string): Promise<string | undefined> {
        const value = cache.take(key);

        if (!value) return undefined;

        return String(value);
    }

    async get(key: string): Promise<string | undefined> {
        const foundValue = cache.get(key);

        if (!foundValue) return undefined;

        return String(foundValue);
    }
}
