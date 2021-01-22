import Layout from '../../components/layout';
import styles from '../../styles/styles.module.scss';
import customerStyles from '../../styles/customer-styles.module.scss';
import CustomerProfileBox from '../../components/customer-profile-box';
import BackButton from '../../components/back-button';

const customer = {
    id: 2,
    first_name: 'Margaret',
    last_name: 'Mendoza',
    email: 'mmendoza1@sina.com.cn',
    gender: 'Female',
    company: 'Skipfire',
    city: 'East Natchitoches, PA',
    title: 'VP Marketing',
};

export default function Customer() {
    return (
        <Layout>
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
                </div>
            </section>
        </Layout>
    );
}
