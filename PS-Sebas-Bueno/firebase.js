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
    console.log("Hubo un cambio en la autenticación.");
    if (user) {
      const uid = user.uid;
      const userinfo = await getUserInfo(uid);
	    document.getElementById('btn-logout').style.display = "block";
	    document.getElementById('btn-logout').addEventListener('click', logOut);
	    console.log(userinfo);
	    document.getElementById('nav-pfp').src = userinfo.urlProfile;
      if (userinfo.admin) {
        // Habilitar opción "Nuevo producto" en la barra superior
        console.log("Usuario administrador autenticado.");
      }
    } else {
      console.log("No hay usuario autenticado.");
    }
  });

const btnUploadProduct = document.getElementById("ad-product");
const storeList = document.getElementById('store-list-section');
const mock = document.getElementById('mock');
  onAuthStateChanged(auth, async (user) => {
    if(btnUploadProduct != undefined) {
	  
	    if (user) {
	      const uid = user.uid;
	      const userinfo = await getUserInfo(uid);
	      console.log(userinfo)
	  
	      if (userinfo.admin) {
		// Si el usuario es un administrador, mostrar el botón
		btnUploadProduct.style.display = "block";
		console.log(userinfo)
	      } else {
		// Si el usuario no es un administrador, ocultar el botón
		btnUploadProduct.style.display = "none";
	      }
	    } else {
	      // Si no hay usuario autenticado, ocultar el botón
	      btnUploadProduct.style.display = "none";
	    }
    }
	  if ( storeList != undefined) {
	    if (user) {
		    storeList.style.display = "flex";
		    mock.style.display = "none";
	    } else {
		    storeList.style.display = "none";
		    mock.style.display = "block";
	    }

	  }
  });
  
  
  async function uploadProduct() {
    // Verificar si el usuario actual es administrador
    const user = auth.currentUser;
    const uid = user.uid;
    const userinfo = await getUserInfo(uid);
  
    if (!userinfo.admin) {
      console.log("Acceso denegado. Solo los administradores pueden subir nuevos productos.");
      return;
    }
     const product = {
      name: "Nuevo producto",
      price: 19.99,
      description: "Descripción del nuevo producto",
    };
    addNewProduct(product);
  }
  
  

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
    const auth = getAuth();
    signOut(auth).then(() => {
    console.log("Log out");
    }).catch((error) => {
    // An error happened.
    });
	window.alert('Logged out');
	window.location = '/index.html';
}
export async function addUserToDb(userInfo, id) {

    try {
        await setDoc(doc(db, "users", id), userInfo);
        console.log("user written with ID: ", id);
    } catch (e) {
        console.error("Error adding user: ", e);
    }
}
// Agregar un nuevo producto a la base de datos
export async function addNewProduct(product) {
    try {
      // Verificar si el usuario actual es administrador
      const user = auth.currentUser;
      const uid = user.uid;
      const userinfo = await getUserInfo(uid);
  
      if (!userinfo.admin) {
        throw new Error("Acceso denegado. Solo los administradores pueden subir nuevos productos.");
      }
  
      // Subir el nuevo producto a la base de datos
      await addProduct(product);
      console.log("Nuevo producto agregado con éxito.");
    } catch (error) {
      console.error("Error al agregar el nuevo producto: ", error);
    }
  }
console.log("firebase conectado")
