import { NodeCacheProvider } from './node-cache.provider';

const cacheProvider = new NodeCacheProvider();

test('Node cache save cache value', async () => {
    await expect(cacheProvider.add('t1', 'cache_value')).resolves.not.toThrowError();
});

test('Node cache retrieve value from cache', async () => {
    await expect(cacheProvider.get('t1')).resolves.toBe('cache_value');
});

test('Node cache remove value from cache', async () => {
    await expect(cacheProvider.remove('t1')).resolves.toBe('cache_value');
    await expect(cacheProvider.get('t1')).resolves.toBeUndefined();
});
