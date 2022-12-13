import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/database'
import 'firebase/compat/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyA7DgwYsNu5L4cCeuW6_vHNNkL6qWVRx-8",
    authDomain: "ionic-winchas.firebaseapp.com",
    projectId: "ionic-winchas",
    storageBucket: "ionic-winchas.appspot.com",
    messagingSenderId: "105924067139",
    appId: "1:105924067139:web:9cb2c1b8729c751c06f9f6"
};

// Initialize Firebase

firebase.initializeApp(firebaseConfig);

const firestore = firebase.firestore()

export async function loginUser(username: string, password: string) {
    try {
        const res = await firebase.auth().signInWithEmailAndPassword(username, password)
        console.log(res)
        return true
    } catch (error) {
        console.log(error)
        return false
    }
}

export async function registerUser(username: string, password: string, nombre?: string, apellido?: string, identificacion?: string, telefono?: string, direccion?: string) {
    try {
        const res = await firebase.auth().createUserWithEmailAndPassword(username, password);

        firebase.auth().currentUser?.updateProfile({
            displayName: nombre + ' ' + apellido
        })
        let usersRef = firestore.collection("users").doc(firebase.auth().currentUser?.uid);
        let accountCreated = firebase.firestore.Timestamp.fromDate(new Date());

        let newUserData = {
            nombre: nombre,
            apellido: apellido,
            identificacion: identificacion,
            telefono: telefono,
            imagen: "",
            direccion: direccion,
            activationEmailSent: { wasSent: true, accountCreated },
        }

        await usersRef.set(newUserData);



        console.log(res)
        return true
    } catch (error) {
        console.log(error)
        // toast(error.message)
        return false
    }
}

