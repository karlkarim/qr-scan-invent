import firebase from 'firebase/app';
import 'firebase/firestore';
import "firebase/auth";


const firebaseConfig = {
    apiKey: "AIzaSyD5KyqAjvvE-PbTJBzad2p9dNMRk_N3y2g",
    authDomain: "qr-inventory-a8944.firebaseapp.com",
    databaseURL: "https://qr-inventory-a8944.firebaseio.com",
    projectId: "qr-inventory-a8944",
    storageBucket: "qr-inventory-a8944.appspot.com",
    messagingSenderId: "746612325177",
    appId: "1:746612325177:web:fe8855e894b40ae3b106e8",
    measurementId: "G-VTFWK0NKPD"
};
firebase.initializeApp(firebaseConfig);
export default firebase