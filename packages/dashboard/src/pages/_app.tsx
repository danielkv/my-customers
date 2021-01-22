import '../styles/base.scss';
import { SWRConfig } from 'swr';
import { SWRGlobalOptions } from '../config/swr';
import { Auth0Provider } from '@auth0/auth0-react';
import CheckAuthentication from '../components/check-authentication';

// This default export is required in a new `pages/_app.js` file.
export default function MyApp({ Component, pageProps }) {
    const origin = global?.window?.location.origin || '';

    return (
        <Auth0Provider domain="danielkv.us.auth0.com" clientId="5t7AMzHjqiinNcpadkEjrBBrrui9Rr6f" redirectUri={origin}>
            <CheckAuthentication>
                <SWRConfig value={SWRGlobalOptions}>
                    <Component {...pageProps} />
                </SWRConfig>
            </CheckAuthentication>
        </Auth0Provider>
    );
}
