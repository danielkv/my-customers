import Layout from '../components/layout';
import styles from '../styles/styles.module.scss';
import cityStyles from '../styles/city-styles.module.scss';
import CityBox from '../components/city-box';
import { GetStaticProps } from 'next';
import { fetcher } from '../helpers/fetcher';
import { ICityList } from '../interfaces/city.interface';
import useSWR from 'swr';

interface HomeProps {
    citiesList: ICityList;
}

export default function Home({ citiesList: initialCitiesList }: HomeProps) {
    const { data: citiesList } = useSWR<ICityList>('/cities', fetcher, { initialData: initialCitiesList });

    return (
        <Layout>
            <h1 className={styles.pageTitle}>Cities</h1>
            <section id={cityStyles.citiesWraper}>
                {citiesList.items.map((city) => (
                    <CityBox key={city.city} city={city} />
                ))}
            </section>
        </Layout>
    );
}

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
    const citiesList: ICityList = await fetcher('/cities', { offset: 0, limit: 10 });

    return {
        props: {
            citiesList,
        },
        revalidate: 10 * 60, // revalidate in 10 minutes
    };
};
