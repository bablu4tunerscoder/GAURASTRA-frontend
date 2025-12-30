import { initializeApp } from "firebase/app";
import {GoogleAuthProvider, getAuth} from "firebase/auth"
 
// const firebaseConfig = {
//   apiKey: "AIzaSyAgEPbysROqOFKnTWP0D96u3l0yPbipE40",
//   authDomain: "e-commerce-2e0f6.firebaseapp.com",
//   projectId: "e-commerce-2e0f6",
//   storageBucket: "e-commerce-2e0f6.firebasestorage.app",
//   messagingSenderId: "522192593071",
//   appId: "1:522192593071:web:2c9911114433d2d028745a"
// };
 
const firebaseConfigProd = {
  apiKey: "AIzaSyD0SoV-c8kTFmd9UStVmfozSEwNXn6A0Cg",
  authDomain: "gaurastra-d350e.firebaseapp.com",
  projectId: "gaurastra-d350e",
  storageBucket: "gaurastra-d350e.firebasestorage.app",
  messagingSenderId: "41765089401",
  appId: "1:41765089401:web:52c4c8adeed08825dce4a8"
};
 
// Initialize Firebase
// const app = initializeApp(firebaseConfig);
const appProd = initializeApp(firebaseConfigProd);
 
export const auth = getAuth();
export const googleAuthProvider = new GoogleAuthProvider();
 
// export default app;
export default appProd;
 
 
 
 
 