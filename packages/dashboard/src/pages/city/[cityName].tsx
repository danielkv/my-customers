import Layout from '../../components/layout';
import styles from '../../styles/styles.module.scss';
import cityStyles from '../../styles/city-styles.module.scss';
import CustomerProfileBox from '../../components/customer-profile-box';
import BackButton from '../../components/back-button';

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

export default function City() {
    return (
        <Layout>
            <h1 className={styles.pageTitle}>Cities</h1>
            <div style={{ width: 900, alignSelf: 'center' }}>
                <BackButton href="/" label="Back to Cities" />
            </div>
            <section id={cityStyles.customersWrapper}>
                <CustomerProfileBox customer={mockCUstomer} />
                <CustomerProfileBox customer={mockCUstomer} />
                <CustomerProfileBox customer={mockCUstomer} />
                <CustomerProfileBox customer={mockCUstomer} />
                <CustomerProfileBox customer={mockCUstomer} />
            </section>
        </Layout>
    );
}
