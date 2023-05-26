
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import {
    getFirestore,
    collection,
    getDocs,
    addDoc,
    setDoc,
    doc,
} from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
import { userValidation } from './userValidation.js'

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDZ1EURIBlm6ZrhzXd7peNNf2fb-CQfOBA",
  authDomain: "ps-database.firebaseapp.com",
  projectId: "ps-database",
  storageBucket: "ps-database.appspot.com",
  messagingSenderId: "1062406476119",
  appId: "1:1062406476119:web:0895126bd3155ec6b3ae12",
  measurementId: "G-VD40KQCKW2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize build
const db = getFirestore(app);
const auth = getAuth(app);


onAuthStateChanged(auth, (user) => {
    console.log('hubo un cambio en auth')
    if (user) {
        // const uid = user.uid;
       // userValidation(true, user.email)
    } else {
       // userValidation(false)
    }
});

/* RECIVIR PRODUCTOS DEL DATABASE

export async function getProdcuts() {
    const allProducts = [];

    const querySnapshot = await getDocs(collection(db, "products"));
    querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data()}`);
        allProducts.push({...doc.data(), id: doc.id });
    });

    return allProducts;
}

export async function addProduct(product) {
    try {
        const docRef = await addDoc(collection(db, "products"), product);

        console.log("Document written with ID: ", docRef.id);
    } catch (e) {
        console.error("Error adding document: ", e);
    }
}

export async function addProductWithId(product, id, file) {
    try {
        const imageUrl = await uploadFile(file.name, file, 'products');

        await setDoc(doc(db, "products", id), {...product, url: imageUrl });
    } catch (e) {
        console.error("Error adding document: ", e);
    }
}
*/

export async function createUser(userInfo) {

    try {
        const userCredential = await createUserWithEmailAndPassword(auth, userInfo.email, userInfo.pass)
        // Signed in
        const user = userCredential.user;
        console.log(user)

        // Subir Imagen
        // const url = await uploadFile(user.uid+userInfo.picture.name, userInfo.picture, 'profilePictures')

        // crear usuario en DB

        const dbInfo = {
            //url,
            email: userInfo.email,
            birthday: userInfo.birthday,
            username: userInfo.username
        }

        addUserToDb(dbInfo, user.uid)

    }
    catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(error.message)
    }

}
/* forma 2
export async function createUser(email, password, username) {
    try {
        const userCredential = await createUserWithEmailAndPassword(
            auth,
            email,
            password
        );

        // Signed in
        const user = userCredential.user;
         console.log("usuario creado con ->", user.uid);

        // subir imagen
        //const imageUrl = await uploadFile(file.name, file, 'users');
	

        /// crear registro en BD
        // await addUserToDB({username, imageUrl, email},user.uid)
        await addUserToDB({username, email},user.uid)

        return { status: true, info: user.uid };
    } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        return { status: false, info: errorMessage };
    }
}
*/
export async function logInUser(email, password) {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password)
        const user = userCredential.user;
	    console.log(user);
        return { status: true, info: user.uid };
    } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        return { status: false, info: errorMessage };
    }
}

export async function logOut() {

    try {
        await signOut(auth)
    } catch (error) {
        console.error(error)
    };
}

export async function addUserToDb(userInfo, id) {

    try {
        await setDoc(doc(db, "users", id), userInfo);
        console.log("user written with ID: ", id);
    } catch (e) {
        console.error("Error adding user: ", e);
    }
}

/* forma 2
export async function addUserToDB(userData, uid) {
    console.log('userData ---->', userData)
    console.log('uid ---->', uid)
    try {
        const docRef = await setDoc(doc(db, "users", uid), userData);

        console.log(docRef)

        console.log("User written with ID: ", uid);
    } catch (e) {
        console.error("Error adding user: ", e);
    }
}
*/

console.log("firebase conectao")
