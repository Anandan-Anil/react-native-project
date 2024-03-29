import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
import {getFirestore,collection,addDoc,getDocs, query, where,deleteDoc } from "firebase/firestore";
import {getStorage,ref,uploadBytes,getDownloadURL} from 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyAHGDogj8tWGsHdPf1zZ6isDI-9kCNgBEM",
    authDomain: "onlinemagazine-7dac7.firebaseapp.com",
    projectId: "onlinemagazine-7dac7",
    storageBucket: "onlinemagazine-7dac7.appspot.com",
    messagingSenderId: "1006773080004",
    appId: "1:1006773080004:web:5987ba551fe308eadbde91",
    measurementId: "G-9Y21VEVXY3"
  };
  const app=initializeApp(firebaseConfig);
  const auth=getAuth(app);
  const db=getFirestore(app);
  
  export {auth,getFirestore,collection,addDoc,getDocs, query, where,deleteDoc,db,getStorage,ref,uploadBytes,getDownloadURL};
 