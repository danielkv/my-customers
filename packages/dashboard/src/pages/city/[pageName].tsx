import Layout from '../../components/layout';
import styles from '../../styles/styles.module.scss';
import cityStyles from '../../styles/city-styles.module.scss';
import CustomerProfileBox from '../../components/customer-profile-box';
import BackButton from '../../components/back-button';
import { GetServerSideProps } from 'next';
import { fetcher } from '../../helpers/fetcher';
import { ICityList } from '../../interfaces/city.interface';
import { ICustomerProfileList } from '../../interfaces/customer-profile.interface';
import useSWR from 'swr';
import { useState } from 'react';
import ReactPaginate from 'react-paginate';

// pagination inital config
const paginationConfig = {
    limit: 6,
};

interface CityProps {
    city: string;
}

/**
 * Get url key to SWR
 */
const getKey = (city: string, pageIndex: number) => {
    const offset = pageIndex * paginationConfig.limit;
    return `/customers?offset=${offset}&limit=${paginationConfig.limit}&city=${escape(city)}`; // SWR key
};

export default function City({ city }: CityProps) {
    const [page, setPage] = useState(0);

    const url = getKey(city, page);

    function handlePageChange({ selected }) {
        setPage(selected);
    }

    const { data: customerList, isValidating } = useSWR<ICustomerProfileList>(url, fetcher, {
        revalidateOnFocus: false,
    });

    return (
        <Layout>
            <h1 className={styles.pageTitle}>{city}</h1>
            <div style={{ width: 900, alignSelf: 'center' }}>
                <BackButton href="/" label="Back to Cities" />
            </div>

            {isValidating ? (
                <div className={styles.loading}>Loading...</div>
            ) : (
                !customerList?.items.length && (
                    <>
                        <div style={{ marginBottom: 20, width: 800, alignSelf: 'center' }} className={styles.box}>
                            No customers found
                        </div>
                    </>
                )
            )}
            {customerList && (
                <>
                    <section id={cityStyles.customersWrapper}>
                        {customerList.items.map((customer) => (
                            <CustomerProfileBox key={customer.id} customer={customer} />
                        ))}
                    </section>
                    <section className={styles.paginationSection}>
                        <ReactPaginate
                            pageCount={customerList.pageInfo.itemsTotal / paginationConfig.limit}
                            initialPage={page}
                            onPageChange={handlePageChange}
                            pageRangeDisplayed={5}
                            marginPagesDisplayed={5}
                            containerClassName={styles.pagination}
                            pageClassName={styles.page}
                            activeClassName={styles.pageActive}
                            disabledClassName={styles.disabled}
                        />
                    </section>
                </>
            )}
        </Layout>
    );
}

export const getServerSideProps: GetServerSideProps<CityProps> = async ({ params }) => {
    const city = String(params.pageName);

    return {
        props: { city },
    };
};
