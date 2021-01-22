import Link from 'next/link';
import styles from '../styles/styles.module.scss';
import cityStyles from '../styles/city-styles.module.scss';
import RightIcon from '../../public/icons/chevron-right.svg';

interface CityBoxProps {
    city: string;
    customers_total: number;
}

export default function CityBox({ city, customers_total }: CityBoxProps) {
    return (
        <div className={`${styles.box} ${cityStyles.box} `}>
            <div className={styles.boxInfoRow}>
                <label className={styles.boxLabel}>City</label>
                <div className={styles.boxBigInfo}>{city}</div>
            </div>
            <div className={styles.boxInfoRow}>
                <label className={styles.boxLabel}>Customers</label>
                <div className={styles.boxBigInfo}>{customers_total}</div>
            </div>
            <Link href={`/city/${escape(city)}`}>
                <a>
                    <div className={styles.boxIconButton}>
                        <RightIcon className={styles.boxIcon} />
                    </div>
                </a>
            </Link>
        </div>
    );
}
