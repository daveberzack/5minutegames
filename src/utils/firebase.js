import { initializeApp } from "firebase/app";
import { getAuth, setPersistence, browserLocalPersistence, onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, connectAuthEmulator, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { getFirestore, doc, collection, setDoc, getDoc } from "firebase/firestore";

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

let user = {};


const checkForReturningUser = async () => {
  await onAuthStateChanged(auth, (u) => {
    if (u) {
      console.log("User is signed in:", u);
      user = u;
    } else {
      console.log("No user is signed in.");
    }
  });
  return user;
};

const signInWithGoogle = async (onComplete) => {
  const provider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    user = result.user;
    console.log("sign in user",user);
    onComplete();
  } catch (error) {
    console.error("Error signing in:", error);
  }
};

const signOutUser = async () => {
  try {
    await signOut(auth);
    return true;
  } catch (error) {
    console.error("Error signing out:", error);
    return false;
  }
};

const signUpWithEmail = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    console.log("User signed up:", userCredential.user);
    user = userCredential.user;
    return user;
  } catch (error) {
    console.error("Error signing up:", error.message);
  }
};

const signInWithEmail = async (email, password) => {
  try {
    await setPersistence(auth, browserLocalPersistence);
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    user = userCredential.user;
    return user;
  } catch (error) {
    console.error("Error signing in:", error.message);
    throw error;
  }
};

const loadData = async (today) => { 

  let userData = {
    favorites: [],
    preferences: {},
    todayPlays: [] 
  }; 

  if (db && user?.uid){
    
    const userRef = doc(db, "users", user.uid);
    const userSnap = await getDoc(userRef);
    if (userSnap.exists()) {
      userData = userSnap.data();
    }
    
    //const dayRef = doc(collection(db, "users", user.uid, "plays"), today);
    //userData.todayPlays = await dayRef.get();
  }
  return userData;
  
}

export { auth, db, signInWithGoogle, signOutUser, loadData, signUpWithEmail, signInWithEmail, checkForReturningUser };
