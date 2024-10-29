import { initializeApp } from "firebase/app";
import React, { createContext, useContext, useEffect, useState } from 'react';
import { getAuth, setPersistence, browserLocalPersistence, createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { getFirestore, doc, collection, setDoc, getDoc, updateDoc } from "firebase/firestore";
import { games } from '../games';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const DataContext = createContext();

export const DataProvider = ({ children }) => {
    
    const today = new Date().toISOString().split("T")[0];

    const [userData, setUserData] = useState(null);
    const [gameIdPlayEditing, setGameIdPlayEditing] = useState(null);
  
    // Check user authentication state on load, and cleanup
    useEffect(() => {
      const unsubscribe = auth.onAuthStateChanged((userCredential) => {
        loadData(userCredential);
      });
      return () => unsubscribe();
    }, []);

    const signInWithGoogle = async (onComplete) => {
        const provider = new GoogleAuthProvider();
        try {
            await signInWithPopup(auth, provider);
            onComplete();
        } catch (error) {
            console.error("Error signing in:", error);
        }
    };
      
    const signOutUser = async () => {
        try {
            await signOut(auth);
            setUserData(null);
        } catch (error) {
            console.error("Error signing out:", error);
        }
    };
      
    const signUpWithEmail = async (email, password) => {
        try {
          const userCredential = await createUserWithEmailAndPassword(auth, email, password);
          setUserData(userCredential.user);
        } catch (error) {
          console.error("Error signing up:", error.message);
        }
    };
      
    const signInWithEmail = async (email, password) => {
        try {
          await setPersistence(auth, browserLocalPersistence);
          const userCredential = await signInWithEmailAndPassword(auth, email, password);
          loadData(userCredential.user);
        } catch (error) {
          console.error("Error signing in:", error.message);
          throw error;
        }
    };
      
    const loadData = async (userCredential) => { 
      
        let newUserData = null; 
      
        if (db && userCredential?.uid){
          
          const userRef = doc(db, "users", userCredential.uid);
          const userSnap = await getDoc(userRef);
          if (userSnap.exists()) {
            newUserData = userSnap.data();
          }
          
          const todayRef = doc(db, "users", userCredential.uid, "plays", today);
          const todaySnapshot = await getDoc(todayRef);
          newUserData.todayPlays = todaySnapshot.data();
        }
        setUserData(newUserData);
    }

    const setPreferences = async (newPreferences) => {
        const userCredential = auth.currentUser;
        if (!userCredential) return;
        try {
            const userDocRef = doc(db, "users", userCredential.uid);
            await updateDoc(userDocRef, { preferences: newPreferences });

            const newUserData = { ...userData, preferences: newPreferences };
            setUserData(newUserData);
        } catch (error) {
            console.error("Error updating preferences:", error);
        }
    }

    const setFavorites = async (newFavorites) => {
        const userCredential = auth.currentUser;
        if (!userCredential) return;
        try {
            const userDocRef = doc(db, "users", userCredential.uid);
            await updateDoc(userDocRef, { favorites: newFavorites });
            const newUserData = { ...userData, favorites: newFavorites };
            setUserData(newUserData);
        } catch (error) {
            console.error("Error updating preferences:", error);
        }
    }

    function addFavorite(id) {
        const newFavorites = [...userData.favorites];
        newFavorites.push(id);
        setFavorites(newFavorites);
    }

    function removeFavorite(id) {
        const newFavorites = userData.favorites.filter(item => item != id);
        setFavorites(newFavorites);
    }

    function setGameToEditPlay(id) {
        setGameIdPlayEditing(id);
    }

    async function updatePlay(score, message) {
        console.log("update play:"+score+" --- "+message);

        const userCredential = auth.currentUser;
        if (!userCredential) return;
        try {
            // const userDocRef = doc(db, "users", userCredential.uid);
            // await updateDoc(userDocRef, { favorites: newFavorites });
            const playDocRef = doc(db, "users", userCredential.uid, "plays", today);
            await updateDoc(playDocRef, {
                [`${gameIdPlayEditing}.score`]: score,
                [`${gameIdPlayEditing}.message`]: message,
              });
            
            const newTodayPlays = {...userData.todayPlays};
            newTodayPlays[gameIdPlayEditing] = {score, message};
            console.log(newTodayPlays);
            const newUserData = { ...userData, todayPlays: newTodayPlays };
            setUserData(newUserData);
        } catch (error) {
            console.error("Error updating preferences:", error);
        }

        setGameIdPlayEditing(null);
    }
    async function cancelEditPlay() {
        setGameIdPlayEditing(null);
    }
  
    return (
        <DataContext.Provider value={{ 
            signInWithGoogle, 
            signOutUser, 
            signUpWithEmail, 
            signInWithEmail,
            games,
            userData,
            setPreferences,
            addFavorite,
            removeFavorite,
            setGameToEditPlay,
            gameIdPlayEditing,
            updatePlay,
            cancelEditPlay
        }}>
            {children}
        </DataContext.Provider>
    );
  };

  export const useData = () => useContext(DataContext);