const firebase = require("firebase");

const firebaseConfig = {
    apiKey: "AIzaSyDrWfOJTIl32FwXrHkimyFWgKoCNjb9y28",
    authDomain: "fastpark-d6132.firebaseapp.com",
    projectId: "fastpark-d6132",
    storageBucket: "fastpark-d6132.appspot.com",
    messagingSenderId: "606857217433",
    appId: "1:606857217433:web:2252a11ba3a87bcf437f08",
    measurementId: "G-C3WYXPDJE8"
};

firebase.initializeApp(firebaseConfig);

module.exports = firebase;