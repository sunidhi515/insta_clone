import firebase from "firebase";
const firebaseApp = firebase.initializeApp(
 {
    apiKey: "AIzaSyBdeCcvTwQ8SXSywb0QjR1lKAzh5aY0n2E",
    authDomain: "instagram-d6756.firebaseapp.com",
    databaseURL: "https://instagram-d6756-default-rtdb.firebaseio.com",
    projectId: "instagram-d6756",
    storageBucket: "instagram-d6756.appspot.com",
    messagingSenderId: "824281757675",
    appId: "1:824281757675:web:cb2b1221b169fffee54bae",
    measurementId: "G-PMKNW3HG2L"
  });

  const db=firebaseApp.firestore();
  const auth= firebase.auth();
  const storage= firebase.storage();

  export {db,auth,storage};
  