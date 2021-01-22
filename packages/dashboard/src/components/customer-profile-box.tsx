import Link from 'next/link';
import Image from 'next/image';
import styles from '../styles/styles.module.scss';
import cityStyles from '../styles/city-styles.module.scss';
import RightIcon from '../../public/icons/chevron-right.svg';
import { ICustomerProfile } from '../interfaces/user-prifile.interface';

interface CurtomerProfileBoxProps {
    customer: ICustomerProfile;
    showButton?: boolean;
}

export default function CustomerProfileBox({ customer, showButton = true }: CurtomerProfileBoxProps) {
    return (
        <div className={`${styles.box} `}>
            <div className={cityStyles.profileImg}>
                <Image src="/images/profile-img.png" width={130} height={130} />
            </div>
            <div className={styles.boxID}>{`#${customer.id}`}</div>
            <div className={styles.boxInfoRow}>
                <div className={styles.boxBigInfo}>{`${customer.first_name} ${customer.last_name}`}</div>
            </div>
            <div className={styles.boxInfoRow}>
                <label className={styles.boxLabel}>Email</label>
                <div className={styles.boxInfo}>{customer.email}</div>
            </div>
            <div className={styles.boxInfoRow}>
                <label className={styles.boxLabel}>Company</label>
                <div className={styles.boxInfo}>{customer.company}</div>
            </div>
            {showButton && (
                <Link href={`/customer/${customer.id}`}>
                    <a>
                        <div className={styles.boxIconButton}>
                            <RightIcon className={styles.boxIcon} />
                        </div>
                    </a>
                </Link>
            )}
        </div>
    );
}
