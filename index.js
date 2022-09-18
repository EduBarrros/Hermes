const express = require('express')
const cors = require('cors')
const firebase = require('firebase')

const firebaseConfig = {
    apiKey: "AIzaSyDrWfOJTIl32FwXrHkimyFWgKoCNjb9y28",
    authDomain: "fastpark-d6132.firebaseapp.com",
    projectId: "fastpark-d6132",
    storageBucket: "fastpark-d6132.appspot.com",
    messagingSenderId: "606857217433",
    appId: "1:606857217433:web:00a686c5780573bc437f08",
    measurementId: "G-1SJKNSD0Y0"
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

const Usuario = db.collection('Usuarios');

const app = express();

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send({ mgs: 'Olá Node' })
})

app.listen(3000, () => {
    console.log('Aplicação rodando em http://localhost:3000')
})