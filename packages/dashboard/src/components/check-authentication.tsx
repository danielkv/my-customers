import { useAuth0 } from '@auth0/auth0-react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import LoadingBlock from './loading-block';

export default function CheckAuthentication({ children }) {
    const { isAuthenticated, isLoading } = useAuth0();
    const router = useRouter();

    useEffect(() => {
        if (router.pathname !== '/login' && !isLoading && !isAuthenticated) {
            router.replace('/login');
        }
    }, [isAuthenticated, isLoading]);

    return <>{(router.pathname == '/login' || isAuthenticated) && !isLoading ? children : <LoadingBlock />}</>;
}
