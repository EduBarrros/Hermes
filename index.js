const express = require('express')
const cors = require('cors')
const firebase = require('firebase')

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

const db = firebase.firestore();

const Usuario = db.collection('Usuarios');

const app = express();

app.use(express.json());
app.use(cors());

app.get('/login', async (req, res) => {
    
})

app.post('/registry', async (req, res) => {
    const data = req.body;
    await Usuario.add(data)
    res.status(201).send({ mgs: 'Usuário cadastrado com sucesso' })
})

app.get('/listUsers', async (req, res) => {
    const snapshot = await Usuario.get();
    const usuarios = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data()}));
    res.status(200).send(usuarios)  
})

app.get('/searchById/:id', async (req, res) => {
    const id = req.params.id
    const snapshot = await Usuario.get();
    const usuarios = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data()}));
    const usuario = usuarios.filter((user) => user.id == id)

    res.status(200).send(usuario)
})

app.put('/updateById/:id', async (req, res) => {
    const id = req.params.id
    await Usuario.doc(id).update(req.body)

    res.status(200).send({msg: 'Usuario atualizado co sucesso'})
})

app.delete('/deleteById/:id', async(req, res) => {
    const id = req.params.id
    await Usuario.doc(id).delete()

    res.status(200).send({msg: 'Usuario deletado com sucesso'})
})

app.listen(3000, () => {
    console.log('Aplicação rodando em http://localhost:3000')
})