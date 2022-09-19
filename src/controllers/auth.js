const firebase = require('../config/firebase')

exports.cadastrar = (req, res) => {
    const data = req.body;
    firebase.auth().createUserWithEmailAndPassword(data.email, data.password)
    .then((userCredential) => {
        res.status(201).send({msg: 'Usuario cadastrado com sucesso!', user: userCredential.user.email})
    })
    .catch((error) => {
        res.status(500).send({msg: 'Algo deu errado', error: error})
    })
}

exports.entrar = (req, res) => {
    const data = req.body;
    firebase.auth().signInWithEmailAndPassword(data.email, data.password)
    .then((userCredential) => {
        res.status(200).send({msg: 'Usuário logado com sucesso!', autenticado: true, user: userCredential.user.email})
    })
    .catch((error) => {
        res.status(500).send({msg: 'Algo deu errado', autendicado: false, error: error})
    })
}
