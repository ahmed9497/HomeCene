import { initializeApp, getApps, getApp } from "firebase/app";
import {getAuth} from 'firebase/auth'


const firebaseConfig = {
  apiKey: "AIzaSyBtlGCa_1aNzbJSZnPkeNlclICwTsQOksg",
  authDomain: "mycommerce-efa07.firebaseapp.com",
  projectId: "mycommerce-efa07",
  storageBucket: "mycommerce-efa07.firebasestorage.app",
  messagingSenderId: "489084520249",
  appId: "1:489084520249:web:7ea72ea65d5d2f60facae8",
  measurementId: "G-9WBRC5Y471"
};
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp()

const auth = getAuth(app)

export {app, auth}

