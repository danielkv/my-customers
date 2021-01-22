import Layout from '../../components/layout';
import styles from '../../styles/styles.module.scss';
import cityStyles from '../../styles/city-styles.module.scss';
import CustomerProfileBox from '../../components/customer-profile-box';
import BackButton from '../../components/back-button';
import { GetStaticPaths, GetStaticProps } from 'next';
import { fetcher } from '../../helpers/fetcher';
import { ICityList } from '../../interfaces/city.interface';
import { ICustomerProfileList } from '../../interfaces/customer-profile.interface';

const mockCUstomer = {
    id: 2,
    first_name: 'Margaret',
    last_name: 'Mendoza',
    email: 'mmendoza1@sina.com.cn',
    gender: 'Female',
    company: 'Skipfire',
    city: 'East Natchitoches, PA',
    title: 'VP Marketing',
};

interface CityProps {
    customerList: ICustomerProfileList;
    city: string;
}

export default function City({ customerList, city }: CityProps) {
    return (
        <Layout>
            <h1 className={styles.pageTitle}>{city}</h1>
            <div style={{ width: 900, alignSelf: 'center' }}>
                <BackButton href="/" label="Back to Cities" />
            </div>
            <section id={cityStyles.customersWrapper}>
                {customerList.items.map((customer) => (
                    <CustomerProfileBox key={customer.id} customer={customer} />
                ))}
            </section>
        </Layout>
    );
}

export const getStaticProps: GetStaticProps<CityProps> = async ({ params }) => {
    const customerList: ICustomerProfileList = await fetcher('/customers', { city: params.cityName });

    return {
        props: { customerList, city: String(params.cityName) },
        revalidate: 5 * 60, // revalidate in 5 minutes
    };
};

export const getStaticPaths: GetStaticPaths = async (context) => {
    // get initial possible
    const citiesList: ICityList = await fetcher('/cities', { offset: 0, limit: 10 });

    const paths = citiesList.items.map((city) => ({ params: { cityName: city.city } }));

    return { paths, fallback: true };
};
