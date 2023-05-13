// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBUI9Rx5OuRgPhR0Zjl4jFjd3vL9vl2rBQ',
  authDomain: 'todo-app-966ad.firebaseapp.com',
  projectId: 'todo-app-966ad',
  storageBucket: 'todo-app-966ad.appspot.com',
  messagingSenderId: '747278908338',
  appId: '1:747278908338:web:e99fcbf82a0dcca47bc2ab',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);
