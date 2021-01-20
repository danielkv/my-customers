/**
 * Cache provider
 * This interface is usefull in case needs to change the cache from memory cache to
 * redis DB, Memcache DB or any other type of fast database
 *
 * It's using Promise as result in case those changes are needed
 */
export interface ICacheProvider {
    /**
     * Insert new key|value in cache.
     * It will overrider the previous cache value in case it already exists
     * @param key key for the cache value
     * @param value value to cache
     */
    add(key: string, value: string): Promise<any>;

    /**
     * Remove a value within a given key from cache.
     * Returns the value case success or undefined case doesn't find anything
     * @param key string which cache value is saved
     */
    remove(key: string): Promise<string | undefined>;

    /**
     * Get a value within a given key from cache
     * Returns undefined if finds nothing
     * @param key string which cache value is saved
     */
    get(key: string): Promise<string | undefined>;
}
