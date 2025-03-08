import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/database';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, push, set } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyDLTeQWOL0XcNRnA18rTRF_iwG6c_UOaQA",
  authDomain: "note-app-ed9d4.firebaseapp.com",
  databaseURL: "https://note-app-ed9d4-default-rtdb.firebaseio.com",
  projectId: "note-app-ed9d4",
  storageBucket: "note-app-ed9d4.appspot.com",
  messagingSenderId: "684428112929",
  appId: "1:684428112929:web:3218488f08dc75230e5f60",
  measurementId: "G-2JXCMBYV9M"
};

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const auth = firebase.auth();
const database = firebase.database();

export { database, ref, push, set };
