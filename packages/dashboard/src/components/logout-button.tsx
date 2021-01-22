import { useAuth0 } from '@auth0/auth0-react';
import styles from '../styles/styles.module.scss';

export default function LogoutButton() {
    const { logout } = useAuth0();

    const returnTo = global?.window?.location.origin || '';

    return (
        <button className={`${styles.button} ${styles.logoutButton}`} onClick={() => logout({ returnTo })}>
            Log Out
        </button>
    );
}
