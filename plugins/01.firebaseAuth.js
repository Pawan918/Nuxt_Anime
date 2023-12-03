import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore";
export default defineNuxtPlugin(async nuxtApp =>{
    const firebaseConfig =  {
        apiKey: "AIzaSyAHKefcIMT1iwlgbGVeG3D4rA5eM5vxw0w",
        authDomain: "anikitsu-bfdd8.firebaseapp.com",
        projectId: "anikitsu-bfdd8",
        storageBucket: "anikitsu-bfdd8.appspot.com",
        messagingSenderId: "277791968898",
        appId: "1:277791968898:web:a779da041c06b697feae9b",
        measurementId: "G-7QSGWHB7LY"
        // there could be other properties depending on the project
      };
      const app = initializeApp(firebaseConfig);
      const db = getFirestore(app);
      return {
        provide : {
          db,
        }
      }
})