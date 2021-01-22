import { useAuth0 } from '@auth0/auth0-react';
import styles from '../styles/styles.module.scss';

export default function LoginButton() {
    const { loginWithRedirect } = useAuth0();

    return (
        <button className={`${styles.button} ${styles.lognButton}`} onClick={() => loginWithRedirect()}>
            Log In
        </button>
    );
}
