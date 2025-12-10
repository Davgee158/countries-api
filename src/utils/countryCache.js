let cachedData = null;
let cacheTimestamp = null;
const CACHE_DURATION = 5 * 60 * 1000; 

export const getCachedCountries = async () => {
    const now = Date.now();
    if (cachedData && now - cacheTimestamp < CACHE_DURATION) {
        return cachedData;
    }
    try {
        const res = await fetch("/data.json");
        if (!res.ok) throw new Error("Fetch failed");
        const data = await res.json();
        cachedData = data;
        cacheTimestamp = now;
        return data;
    } catch (err) {
        throw err;
    }
}