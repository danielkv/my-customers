import LoginButton from '../components/login-button';
import styles from '../styles/styles.module.scss';

export default function Login() {
    return (
        <section className={styles.loginSection}>
            <div className={styles.box}>
                <h3 className={styles.loginTitle}>Log In to access your customers</h3>
                <LoginButton />
            </div>
        </section>
    );
}
