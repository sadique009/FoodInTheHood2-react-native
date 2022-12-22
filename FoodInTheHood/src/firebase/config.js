import {initializeApp} from 'firebase/app';
//import { getAnalytics } from "firebase/analytics";
import {getAuth} from 'firebase/auth';
import {getDatabase} from 'firebase/database';
// const firebaseConfig = {
//   apiKey: 'AIzaSyDUIvLbWx0JUaDMkIiir8uF2YfIQrBnP_k',
//   authDomain: 'mealstogo-f7568.firebaseapp.com',
//   projectId: 'mealstogo-f7568',
//   storageBucket: 'mealstogo-f7568.appspot.com',
//   messagingSenderId: '416571113849',
//   appId: '1:416571113849:web:fe542bcf915e5ce74fafa8',
// };

const firebaseConfig = {
  apiKey: 'AIzaSyAjfFYQbn9ooA0y2XvNYtGA4uk3Bk-ovf0',
  authDomain: 'foodinthehood-56f02.firebaseapp.com',
  databaseURL:
    'https://foodinthehood-56f02-default-rtdb.asia-southeast1.firebasedatabase.app',
  projectId: 'foodinthehood-56f02',
  storageBucket: 'foodinthehood-56f02.appspot.com',
  messagingSenderId: '49843618243',
  appId: '1:49843618243:web:74a853b01759ee83b77d76',
};

// Initialize Firebase
// if (!firebaseConfig.apps.length) {
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);
//const analytics = getAnalytics(app);
export {auth, db};
