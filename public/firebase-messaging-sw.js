importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing the generated config
// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDuERG-LswL09Wm5XFnISJpdjQB3_56nk8",
    authDomain: "tutionclass-bd47f.firebaseapp.com",
    projectId: "tutionclass-bd47f",
    storageBucket: "tutionclass-bd47f.appspot.com",
    messagingSenderId: "577514931916",
    appId: "1:577514931916:web:52b0d9e18f2dfc59d6a469",
    measurementId: "G-VDG2413BC4"
};

firebase.initializeApp(firebaseConfig);


// Retrieve firebase messaging
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
    console.log('Received background message ', payload);
    // Customize notification here
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
    };

    self.registration.showNotification(notificationTitle,
        notificationOptions);
});
