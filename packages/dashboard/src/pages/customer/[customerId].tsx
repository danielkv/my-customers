import Layout from '../../components/layout';
import styles from '../../styles/styles.module.scss';
import customerStyles from '../../styles/customer-styles.module.scss';
import CustomerProfileBox from '../../components/customer-profile-box';
import BackButton from '../../components/back-button';
import GoogleMapReact from 'google-map-react';
import MapPinIcon from '../../../public/icons/map-pin.svg';
import { ICustomerProfile, ICustomerProfileList } from '../../interfaces/customer-profile.interface';
import { GetServerSideProps } from 'next';
import { fetcher } from '../../helpers/fetcher';
import useSWR from 'swr';
import LoadingBlock from '../../components/loading-block';

interface CustomerProps {
    customerId: number;
}

export default function Customer({ customerId }: CustomerProps) {
    const { data: customer, isValidating } = useSWR<ICustomerProfile>(`/customer/${customerId}`);

    return (
        <Layout>
            {isValidating && <LoadingBlock />}
            {customer && (
                <section id={customerStyles.customerWrapper}>
                    <div className={customerStyles.leftColumn}>
                        <BackButton href={`/city/${escape(customer.city)}`} label={`Back to ${customer.city}`} />
                        <CustomerProfileBox customer={customer} showButton={false} />
                        <div className={`${styles.box} ${customerStyles.boxDetails}`}>
                            <div className={styles.boxInfoRow}>
                                <label className={styles.boxLabel}>Title</label>
                                <div className={styles.boxBigInfo}>{customer.title}</div>
                            </div>
                            <div className={styles.boxInfoRow}>
                                <label className={styles.boxLabel}>Gender</label>
                                <div className={styles.boxBigInfo}>{customer.gender}</div>
                            </div>
                            <div className={styles.boxInfoRow}>
                                <label className={styles.boxLabel}>City</label>
                                <div className={styles.boxBigInfo}>{customer.city}</div>
                            </div>
                        </div>
                    </div>
                    <div className={customerStyles.rightColumn}>
                        <h4 className={customerStyles.mapSectionTitle}>Location</h4>
                        {customer?.lat && customer?.long ? (
                            <div className={styles.box} style={{ padding: 0, width: '100%', height: '100%' }}>
                                <GoogleMapReact
                                    bootstrapURLKeys={{ key: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY }}
                                    center={{ lat: customer.lat, lng: customer.long }}
                                    zoom={11}
                                >
                                    <MapPinIcon
                                        lat={customer.lat}
                                        lng={customer.long}
                                        className={customerStyles.mapPin}
                                    />
                                </GoogleMapReact>
                            </div>
                        ) : (
                            <div className={styles.box}>Location could not be found</div>
                        )}
                    </div>
                </section>
            )}
        </Layout>
    );
}

export const getServerSideProps: GetServerSideProps<CustomerProps> = async ({ params }) => {
    return {
        props: { customerId: Number(params.customerId) },
    };
};
