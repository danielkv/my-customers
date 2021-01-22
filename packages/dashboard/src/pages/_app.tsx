import '../styles/base.scss';
import { SWRConfig } from 'swr';
import { SWRGlobalOptions } from '../config/swr';

// This default export is required in a new `pages/_app.js` file.
export default function MyApp({ Component, pageProps }) {
    return (
        <SWRConfig value={SWRGlobalOptions}>
            <Component {...pageProps} />
        </SWRConfig>
    );
}
