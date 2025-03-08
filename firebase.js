import * as firebase from 'firebase/compat'
import 'firebase/auth'
import 'firebase/firestore'
import '@react-native-firebase/firestore'
import '@react-native-firebase/auth'
import {getDatabase} from 'firebase/database'

var firebaseConfig = {
    apiKey: "AIzaSyDLTeQWOL0XcNRnA18rTRF_iwG6c_UOaQA",
    authDomain: "note-app-ed9d4.firebaseapp.com",
    databaseURL: "https://note-app-ed9d4-default-rtdb.firebaseio.com",
    projectId: "note-app-ed9d4",
    storageBucket: "note-app-ed9d4.firebasestorage.app",
    messagingSenderId: "684428112929",
    appId: "1:684428112929:web:3218488f08dc75230e5f60",
    measurementId: "G-2JXCMBYV9M"
  };

let app;

if(firebase.apps.length == 0){
    app = firebase.initializeApp(firebaseConfig);
}else{
    app = firebase.app();
}

const auth = firebase.auth();
const db = getDatabase();

export {db, auth, firebase};