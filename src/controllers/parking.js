const firebase = require('../config/firebase')

const db = firebase.firestore()
const parking = db.collection('cl_parking')

exports.checkIn = async (req, res) => {
    const data = req.body

    const checkinData = {
        emailFuncionario: data?.emailFuncionario,
        hrEntrada: new Date(),
        hrSaida: null,
        placa: data?.placa,
        cor: data?.cor,
        isParking: true,
        modelo: data?.modelo
    }

    if (
        checkinData.emailFuncionario === undefined ||
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
    const formatedDate = listParking.map((doc) => ({ ...doc, hrEntrada: new Date(doc.hrEntrada.seconds * 1000).toLocaleString('pt-BR', {
        timeZone: 'America/Sao_Paulo'
      })
      }))
    res.status(201).send(formatedDate)
}

exports.checkOut = async (req, res) => {
    const id = req.params.id
    await parking.doc(id).update({ "Cor": "Verde" })

    res.status(201).send({ msg: 'Usuário atualizado com sucesso.' })
}