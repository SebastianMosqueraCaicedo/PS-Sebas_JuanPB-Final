
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
    getDoc,
} from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
import {getStorage,ref, uploadBytes, getDownloadURL } from "firebase/storage"
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
const storage = getStorage(app)

let userId = ""

const getUserInfo = async (userId) =>{
    try {
        const docRef = doc(db,"users",userId);
        const docSnap = await getDoc(docRef);
        return docSnap.data()
    } catch (error) {
        
    }
}

onAuthStateChanged(auth, async (user) => {
    console.log('hubo un cambio en auth')
    if (user) {
         const uid = user.uid;
         const userinfo = await getUserInfo(uid)
         if (userinfo.admin){
//habilitar opcion nuevo producto puede ser en la barra superior
         }
       // signOut(auth)
       // userValidation(true, user.email)
    } else {
        //
       // userValidation(false)
    }
});
/* RECIBIR PRODUCTOS DEL DATABASE */

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

export async function createUser(userInfo) {

    try {
        const userCredential = await createUserWithEmailAndPassword(auth, userInfo.email, userInfo.pass)
        // Signed in
        const user = userCredential.user;
        console.log(user)

        const urlProfile = await uploadImage(userInfo.picture)
        // Subir Imagen
        // const url = await uploadFile(user.uid+userInfo.picture.name, userInfo.picture, 'profilePictures')

        // crear usuario en DB

        const dbInfo = {
            urlProfile,
            email: userInfo.email,
            birthday: userInfo.birthday,
            username: userInfo.username,
            admin:false
        }

        addUserToDb(dbInfo, user.uid)

    }
    catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(error.message)
    }

}

export async function imageUploadedReference(file) {
    const storageRef = ref(storage, `users/images/${file.name}`)
    return await uploadBytes(storageRef, file)
}

export async function uploadImage (file) {
try {
    const image = await imageUploadedReference(file)
    return getDownloadURL(ref(storage,image.ref.fullPath))
} catch (error) {
    
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
