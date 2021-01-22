import Link from 'next/link';
import styles from '../styles/styles.module.scss';
import LeftIcon from '../../public/icons/chevrons-left.svg';

interface BackButtonProps {
    label: string;
    href: string;
}

export default function BackButton({ label, href }: BackButtonProps) {
    return (
        <div className={styles.backButton}>
            <Link href={href}>
                <a>
                    <LeftIcon className={styles.backButtonIcon} />
                    <span className={styles.backButtonLabe}>{label}</span>
                </a>
            </Link>
        </div>
    );
}
