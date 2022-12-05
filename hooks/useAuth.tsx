// Provides authorization to entire appllication,
// Very useful
import {
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut,
    User,
} from 'firebase/auth';
import { useRouter } from 'next/router';
import React, {
    createContext,
    useContext,
    useEffect,
    useMemo,
    useState,
} from 'react';
import { auth } from '../firebase';

interface IAuth {
    user: User | null;
    signUp: (email: string, password: string) => Promise<void>;
    signIn: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
    error: string | null;
    loading: boolean;
}

// Initial Authorization context
const AuthContext = createContext<IAuth>({
    user: null,
    signUp: async () => {},
    signIn: async () => {},
    logout: async () => {},
    error: null,
    loading: false,
});

interface AuthProviderProps {
    children: React.ReactNode;
}

// Auth provider, which will manage the states for the user
export const AuthProvider = ({ children }: AuthProviderProps) => {
    // Still the same concept of return managed states
    const [loading, setloading] = useState(false);
    const [user, setUser] = useState<User | null>(null);
    const router = useRouter();
    const [error, setError] = useState(null);
    const [initialLoading, setInitialLoading] = useState(true);

    //Add persistance to application, so when the user reloads the page, they are still logged in
    useEffect(
        () =>
            onAuthStateChanged(auth, (user) => {
                if (user) {
                    // Logged in...
                    setUser(user);
                    setloading(false);
                } else {
                    // Not logged in...
                    setUser(null);
                    setloading(true);
                    // Forcing the fact that there has to be a user to be logged into the application.
                    router.push('/login');
                }

                setInitialLoading(false);
            }),
        [auth]
    );

    const signUp = async (email: string, password: string) => {
        setloading(true);

        await createUserWithEmailAndPassword(auth, email, password)
            .then((userCred) => {
                // After user is logged in, push the user to the loading page
                setUser(userCred.user);
                router.push('/');
            })
            .catch((e) => {
                alert(e.message);
            })
            .finally(() => {
                setloading(false);
            });
    };

    const signIn = async (email: string, password: string) => {
        setloading(true);

        await signInWithEmailAndPassword(auth, email, password)
            .then((userCred) => {
                // After user is logged in, push the user to the loading page
                setUser(userCred.user);
                router.push('/');
            })
            .catch((e) => {
                alert(e.message);
            })
            .finally(() => {
                setloading(false);
            });
    };

    const logout = async () => {
        setloading(true);
        signOut(auth)
            .then(() => {
                // Remove the user
                setUser(null);
            })
            .catch((e) => {
                alert(e.message);
            })
            .finally(() => {
                setloading(false);
            });
    };

    // Only recompute the value when one of the dependencies has changed, user, or loading
    // These will change constantly when signup, login or logout run
    //Then pass these values bewloe to the components in children, which in this case is all our components
    const memoedValue = useMemo(
        () => ({ user, signUp, signIn, error, loading, logout }),
        [user, loading, error]
    );

    return (
        <AuthContext.Provider value={memoedValue}>
            {/* The children here is the ui, like the entire application. since this will wrapp around the entire application */}
            {!initialLoading && children}
        </AuthContext.Provider>
    );
};

export default function useAuth() {
    return useContext(AuthContext);
}
