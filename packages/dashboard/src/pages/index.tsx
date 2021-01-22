import Layout from '../components/layout';
import styles from '../styles/styles.module.scss';
import cityStyles from '../styles/city-styles.module.scss';
import CityBox from '../components/city-box';

export default function Home() {
    return (
        <Layout>
            <h1 className={styles.pageTitle}>Cities</h1>
            <section id={cityStyles.citiesWraper}>
                <CityBox city="Sombrio" customers_total={20} />
                <CityBox city="Sombrio" customers_total={20} />
                <CityBox city="Sombrio" customers_total={20} />
                <CityBox city="Sombrio" customers_total={20} />
                <CityBox city="Sombrio" customers_total={20} />
            </section>
        </Layout>
    );
}
