// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: 'AIzaSyB4hs8nwRdPu-gqUo1rTyDXarIeACLm8tI',
    authDomain: 'netflixwebclone-f1da6.firebaseapp.com',
    projectId: 'netflixwebclone-f1da6',
    storageBucket: 'netflixwebclone-f1da6.appspot.com',
    messagingSenderId: '803499102382',
    appId: '1:803499102382:web:42443d0fe4eda7fd525d3f',
};

// Initialize Firebase, if app already initailzed, then create app
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const auth = getAuth();

export default app;
export { auth, db };
