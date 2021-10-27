import firebase from "firebase/compat/app"
import "firebase/compat/auth"
import "firebase/compat/firestore"
import 'firebase/compat/storage'

const firebaseConfig = {
    apiKey: "AIzaSyCfgyq0Z7RGiPjyzf32VKW4cgFF6k5LtZs",
    authDomain: "vue-project-navid.firebaseapp.com",
    databaseURL: "https://vue-project-navid-default-rtdb.firebaseio.com",
    projectId: "vue-project-navid",
    storageBucket: "vue-project-navid.appspot.com",
    messagingSenderId: "699301739509",
    appId: "1:699301739509:web:c6204f64a53de3f6dafebc",
    measurementId: "G-GXSZ5R0LML"

};

const fb = firebase.initializeApp(firebaseConfig);
const db = fb.firestore();

export { fb, db }