import { useState, useEffect, useCallback } from 'react';
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase, onValue, ref, update } from 'firebase/database';
import { connectAuthEmulator, signInWithCredential, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut } from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBqLjsCMMn_fqdJcTkYIGWSk_1wI7PIQ4k",
  authDomain: "communicity-ee9f6.firebaseapp.com",
  projectId: "communicity-ee9f6",
  storageBucket: "communicity-ee9f6.appspot.com",
  messagingSenderId: "658346693049",
  appId: "1:658346693049:web:755e4c1945aed9a2fea668",
  measurementId: "G-4H46W84GPT"
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);
const analytics = getAnalytics(firebase);
const database = getDatabase(firebase);
// const auth = getAuth(firebase);

export const useDbData = (path) => {
    const [data, setData] = useState();
    const [error, setError] = useState(null);

    useEffect(() => (
      onValue(ref(database, path), (snapshot) => {
       setData( snapshot.val() );
      }, (error) => {
        setError(error);
      })
    ), [ path ]);

    return [ data, error ];
};

const makeResult = (error) => {
    const timestamp = Date.now();
    const message = error?.message || `Updated: ${new Date(timestamp).toLocaleString()}`;
    return { timestamp, error, message };
};

export const useDbUpdate = (path) => {
    const [result, setResult] = useState();
    const updateData = useCallback((value) => {
        update(ref(database, path), value)
        .then(() => setResult(makeResult()))
        .catch((error) => setResult(makeResult(error)))
    }, [database, path]);

    return [updateData, result];
};

export const signInWithGoogle = () => {
	signInWithPopup(getAuth(firebase), new GoogleAuthProvider())
    .then((userCredential) => {
        const isEqual = userCredential.user.metadata.creationTime === userCredential.user.metadata.lastSignInTime;
        if (isEqual) {
            const value = {
                uid: userCredential.user.uid,
                email: userCredential.user.email,
                name: userCredential.user.displayName
            }
            const path = `users/${userCredential.user.uid}`
            update(ref(database, path), value)
				.then()
				.catch((error) => console.log(error));
        }
    })
};

const firebaseSignOut = () => signOut(getAuth(firebase));

export { firebaseSignOut as signOut };

export const useAuthState = () => {
	const [user, setUser] = useState();

	useEffect(() => {
		const result = onAuthStateChanged(getAuth(firebase), (user) => {
			setUser(user);
		});
		return result;
	}, []);

	return [user];
};