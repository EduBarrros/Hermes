const firebase = require('../config/firebase')

exports.cadastrar = (req, res) => {
    const data = req.body;

    firebase.auth().createUserWithEmailAndPassword(data.email, data.password)
    .then((userCredential) => {
        res.status(201).send({status: 1, msg: 'Usuario cadastrado com sucesso!', user: userCredential.user.email})
    })
    .catch((error) => {
        if(error.code === 'auth/email-already-in-use'){
            res.status(401).send({status: 0, msg: 'Usuário já cadastrado no sistema.'})
        }else if(error.code === 'auth/weak-password'){
            res.status(401).send({status: 0, msg: 'Senha muito fraca, a senha precisa de no mínimo 6 digitos.'})
        }else{
            res.status(500).send({status: 0, msg: 'Algo deu errado.', error: error})
        }
    })
}

exports.entrar = (req, res) => {
    const data = req.body;

    firebase.auth().signInWithEmailAndPassword(data.email, data.password)
    .then((userCredential) => {
        res.status(200).send({status: 1, msg: 'Usuário logado com sucesso!', autenticado: true, user: userCredential.user.email})
    })
    .catch((error) => {
        if(error.code === 'auth/wrong-password'){
            res.status(401).send({status: 0, msg: 'Usuario ou senha incorretos.', autendicado: false})
        }else if(error.code === 'auth/user-not-found'){
            res.status(401).send({status: 0, msg: 'Usuario ou senha incorretos.', autendicado: false})
        }else{
            res.status(500).send({status: 0, msg: 'Algo deu errado.', autendicado: false, error: error})
        }
    })
}
