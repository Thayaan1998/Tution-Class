import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from 'firebase/messaging';


const firebaseConfig = {
  apiKey: "AIzaSyDuERG-LswL09Wm5XFnISJpdjQB3_56nk8",
  authDomain: "tutionclass-bd47f.firebaseapp.com",
  projectId: "tutionclass-bd47f",
  storageBucket: "tutionclass-bd47f.appspot.com",
  messagingSenderId: "577514931916",
  appId: "1:577514931916:web:52b0d9e18f2dfc59d6a469",
  measurementId: "G-VDG2413BC4"
};

// Initialize Firebase
initializeApp(firebaseConfig);




const messaging = getMessaging();


//Token Initializer
export const requestForToken = () => {
return getToken(messaging, { vapidKey: "BGJP1_Vdo14DKvSp__CLjZ9qndQg2zaiXhL-xsPlrGbRBPxNWxs8JeBh0OqSQzwcfMWePTrqSq0gzUEbD3o0eLo" })
        .then((currentToken) => {
            if (currentToken) {
                console.log('current token for client: ', currentToken);
              
            } else {
                // Show permission request UI
                console.log('No registration token available. Request permission to generate one.');
            }
        })
        .catch((err) => {
            console.log('An error occurred while retrieving token. ', err);
        });
};

export const onMessageListener = () =>
    new Promise((resolve) => {
        onMessage(messaging, (payload) => {
            console.log("payload", payload)
            resolve(payload);
        });
    });


