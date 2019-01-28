
import firebase from 'firebase/app';
// Firebase App is always required and must be first
// const firebase = require('firebase/app');

// Add additional services you want to use
import 'firebase/auth';
import 'firebase/firestore';

const firebaseProjectId = process.env.REACT_APP_FIREBASE_PROJECT_ID;

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: `${firebaseProjectId}.firebaseapp.com`,
  databaseURL: `https://${firebaseProjectId}.firebaseio.com`,
  projectId: firebaseProjectId,
  storageBucket: `${firebaseProjectId}.appspot.com`,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING
};

const firebaseApp = !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();
export const db = firebase.firestore();

export const auth = firebaseApp.auth();

export default firebaseApp;