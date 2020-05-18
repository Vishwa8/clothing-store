import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

var config = {
  apiKey: "AIzaSyCU7g2pIxf5Le-Z4MkXWfBd3CKwunbI6rA",
  authDomain: "clothing-store-4da3e.firebaseapp.com",
  databaseURL: "https://clothing-store-4da3e.firebaseio.com",
  projectId: "clothing-store-4da3e",
  storageBucket: "clothing-store-4da3e.appspot.com",
  messagingSenderId: "595558509792",
  appId: "1:595558509792:web:37f0b1bd96bf1b4a5ab485",
  measurementId: "G-E9DXZY9SYR"
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;