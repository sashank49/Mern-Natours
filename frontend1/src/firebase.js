// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: "AIzaSyALJiyTbWPIKqufwVkJLjx2-ZwwCKrGmF0",
	authDomain: "natours-dd08c.firebaseapp.com",
	projectId: "natours-dd08c",
	storageBucket: "natours-dd08c.appspot.com",
	messagingSenderId: "1085201346218",
	appId: "1:1085201346218:web:6a8679f9742689da05ead3",
	measurementId: "G-23CLQXWHL7",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;
