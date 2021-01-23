import styles from '../styles/styles.module.scss';

export default function PageNotFound() {
    return (
        <div className={styles.pageNotFound}>
            <div>
                <h1>404</h1>
                <div>
                    <h2>This page could not be found!</h2>
                </div>
            </div>
            <button onClick={() => window.history.back()} className={styles.button}>
                Go Back
            </button>
        </div>
    );
}
