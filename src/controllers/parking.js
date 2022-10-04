const firebase = require('../config/firebase')

const db = firebase.firestore()
const parking = db.collection('cl_parking')

exports.checkIn = async (req, res) => {
    const data = req.body

    await parking.add(data)

    res.status(201).send({ msg: 'Cadastrado com sucesso'})
}

exports.listarCheckIn = async (req, res) => {
    const snapshot = await parking.get()
    const listParking = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data()}))
    res.status(201).send(listParking)
}

exports.checkOut = async (req, res) => {
    const id = req.params.id
    await parking.doc(id).update({ "Cor": "Verde" })

    res.status(201).send({msg: 'Usuário atualizado com sucesso.'})
}