import Link from 'next/link';
import styles from '../styles/styles.module.scss';
import cityStyles from '../styles/city-styles.module.scss';
import RightIcon from '../../public/icons/chevron-right.svg';
import { ICity } from '../interfaces/city.interface';

interface CityBoxProps {
    city: ICity;
}

export default function CityBox({ city }: CityBoxProps) {
    return (
        <div className={`${styles.box} ${cityStyles.box} `}>
            <div className={styles.boxInfoRow}>
                <label className={styles.boxLabel}>City</label>
                <div className={styles.boxBigInfo}>{city.city}</div>
            </div>
            <div className={styles.boxInfoRow}>
                <label className={styles.boxLabel}>Customers</label>
                <div className={styles.boxBigInfo}>{city.customers_total}</div>
            </div>
            <Link href={`/city/${escape(city.city)}`}>
                <a>
                    <div className={styles.boxIconButton}>
                        <RightIcon className={styles.boxIcon} />
                    </div>
                </a>
            </Link>
        </div>
    );
}
