import Layout from '../components/layout';
import styles from '../styles/styles.module.scss';
import cityStyles from '../styles/city-styles.module.scss';
import CityBox from '../components/city-box';
import { fetcher } from '../helpers/fetcher';
import { ICityList } from '../interfaces/city.interface';
import { useSWRInfinite } from 'swr';

// pagination inital config
const paginationConfig = {
    limit: 8,
};

/**
 * Check if pagination reached the end
 * Returns the key string to load more or null if reached the end
 *
 **/
const getKey = (pageIndex: number, prev: ICityList) => {
    if (prev) {
        const reachedEnd = prev.pageInfo.offset + prev.pageInfo.limit >= prev.pageInfo.itemsTotal;
        if (reachedEnd) return null; // reached the end
    }

    const offset = pageIndex * paginationConfig.limit;
    return `/cities?offset=${offset}&limit=${paginationConfig.limit}`; // SWR key
};

interface HomeProps {
    citiesList: ICityList;
}

export default function Home({ citiesList: initialCitiesList }: HomeProps) {
    const { data: citiesListPages, size, setSize, isValidating } = useSWRInfinite<ICityList>(getKey, fetcher);

    const reachedEnd = citiesListPages?.length
        ? !Boolean(getKey(size, citiesListPages[citiesListPages.length - 1]))
        : false;

    return (
        <Layout>
            <h1 className={styles.pageTitle}>Cities</h1>
            {citiesListPages?.length && (
                <section id={cityStyles.citiesWraper}>
                    {citiesListPages.map((citiesList) =>
                        citiesList.items.map((city) => <CityBox key={city.city} city={city} />),
                    )}
                </section>
            )}
            {isValidating ? (
                <div className={styles.loading}>Loading...</div>
            ) : (
                !reachedEnd && (
                    <section className={styles.paginationSection}>
                        <button className={styles.loadMoreButton} onClick={() => setSize(size + 1)}>
                            load more
                        </button>
                    </section>
                )
            )}
        </Layout>
    );
}
