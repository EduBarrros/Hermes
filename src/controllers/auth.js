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
    
    if(data == {}){
        return res.status(400).send({status: 0, msg: 'Dados incorretos'})
    }

    firebase.auth().signInWithEmailAndPassword(data.email, data.password)
    .then((userCredential) => {
        res.status(200).send({status: 1, msg: 'Usuário logado com sucesso!', autenticado: true, user: userCredential.user.email})
    })
    .catch((error) => {
        res.status(500).send({status: 0, msg: 'Algo deu errado', autendicado: false, error: error})
    })
}
