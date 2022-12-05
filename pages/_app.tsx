import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { AuthProvider } from '../hooks/useAuth';
import { RecoilRoot } from 'recoil';

// Authorization provider will wrap the whole application, this should always be the case
function MyApp({ Component, pageProps }: AppProps) {
    return (
        // Higher order components to entire application
        <RecoilRoot>
            <AuthProvider>
                <Component {...pageProps} />
            </AuthProvider>
        </RecoilRoot>
    );
}

export default MyApp;
