const firebase = require('../config/firebase')
const { v1: uuidv1 } = require('uuid')

const db = firebase.firestore()
const parking = db.collection('cl_parking')

exports.checkIn = async (req, res) => {
    const data = req.body

    const checkinData = {
        id: uuidv1(),
        idFuncionario: data?.idFuncionario,
        hrEntrada: new Date(),
        hrSaida: null,
        placa: data?.placa,
        cor: data?.cor,
        isParking: true,
        modelo: data?.modelo
    }

    if (
        checkinData.idFuncionario === undefined ||
        checkinData.placa === undefined ||
        checkinData.cor === undefined ||
        checkinData.modelo === undefined
    ) {
        res.status(400).send({ status: 0, msg: 'Uma ou mais informações enviadas não estão de acordo com o solicitado.' })
    } else {
        res.status(201).send({ status: 1, msg: 'Cadastrado com sucesso' })
        try {
            await parking.add(checkinData)
        } catch (error) {
            res.status(500).send({ status: 0, msg: 'Algo deu errado.', error: error })
        }
    }
}

exports.listarCheckIn = async (req, res) => {
    const snapshot = await parking.get()
    const listParking = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
    res.status(201).send(listParking)
}

exports.checkOut = async (req, res) => {
    const id = req.params.id
    await parking.doc(id).update({ "Cor": "Verde" })

    res.status(201).send({ msg: 'Usuário atualizado com sucesso.' })
}