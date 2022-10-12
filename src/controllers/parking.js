const firebase = require('../config/firebase')
const valores = require('../config/valores')
const moment = require('moment')

const db = firebase.firestore()
const parking = db.collection('cl_parking')

exports.checkIn = async (req, res) => {
    const data = req.body

    const checkinData = {
        emailFuncionario: data?.emailFuncionario,
        hrEntrada: new Date(),
        hrSaida: null,
        valorFinal: null,
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
    try {
        const snapshot = await parking.where('hrSaida', '==', null).get()
        const listParking = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
        const formatedDate = listParking.map((doc) => ({
            id: doc.id,
            hrEntrada: new Date(doc.hrEntrada.seconds * 1000).toLocaleString('pt-BR', {
                timeZone: 'America/Sao_Paulo'
            }),
            hrSaida: doc.hrSaida,
            isParking: doc.isParking,
            emailFuncionario: doc.emailFuncionario,
            valorFinal: doc.valorFinal,
            car: {
                placa: doc.placa,
                modelo: doc.modelo,
                cor: doc.cor
            }
        }))
        res.status(201).send({ status: 1, data: formatedDate })
    } catch (error) {
        res.status(500).send({ status: 0, msg: 'Algo deu errado.', error: error })
    }
}

exports.checkOut = async (req, res) => {
    try {
        const id = req.params.id
        const snapshot = await parking.doc(id).get()
        const data = snapshot.data()
        const responseDate = new Date(data.hrEntrada.seconds * 1000).toLocaleString('pt-BR', {
            timeZone: 'America/Sao_Paulo'
        })
        const nowDate = new Date().toLocaleString('pt-BR', {
            timeZone: 'America/Sao_Paulo'
        })
        var startDate = moment(responseDate, 'YYYY-M-DD HH:mm:ss')
        var endDate = moment(nowDate, 'YYYY-M-DD HH:mm:ss')
        var secondsDiff = endDate.diff(startDate, 'hours')
        var valorFinal = null

        switch (secondsDiff) {
            case 0:
                valorFinal = valores[0]
                await parking.doc(id).update({ "hrSaida": new Date(), "valorFinal": valorFinal, "isParking": false })
                break;

            case 1:
                valorFinal = valores[1]
                await parking.doc(id).update({ "hrSaida": new Date(), "valorFinal": valorFinal, "isParking": false })
                break;

            case 2:
                valorFinal = valores[2]
                await parking.doc(id).update({ "hrSaida": new Date(), "valorFinal": valorFinal, "isParking": false })
                break;

            case 3:
                valorFinal = valores[3]
                await parking.doc(id).update({ "hrSaida": new Date(), "valorFinal": valorFinal, "isParking": false })
                break;

            case 4:
                valorFinal = valores[4]
                await parking.doc(id).update({ "hrSaida": new Date(), "valorFinal": valorFinal, "isParking": false })
                break;

            case 5:
                valorFinal = valores[5]
                await parking.doc(id).update({ "hrSaida": new Date(), "valorFinal": valorFinal, "isParking": false })
                break;

            case 6:
                valorFinal = valores[6]
                await parking.doc(id).update({ "hrSaida": new Date(), "valorFinal": valorFinal, "isParking": false })
                break;

            case 7:
                valorFinal = valores[7]
                await parking.doc(id).update({ "hrSaida": new Date(), "valorFinal": valorFinal, "isParking": false })
                break;

            case 8:
                valorFinal = valores[8]
                await parking.doc(id).update({ "hrSaida": new Date(), "valorFinal": valorFinal, "isParking": false })
                break;

            case 9:
                valorFinal = valores[9]
                await parking.doc(id).update({ "hrSaida": new Date(), "valorFinal": valorFinal, "isParking": false })
                break;

            case 10:
                valorFinal = valores[10]
                await parking.doc(id).update({ "hrSaida": new Date(), "valorFinal": valorFinal, "isParking": false })
                break;

            case 11:
                valorFinal = valores[11]
                await parking.doc(id).update({ "hrSaida": new Date(), "valorFinal": valorFinal, "isParking": false })
                break;

            case 12:
                valorFinal = valores[12]
                await parking.doc(id).update({ "hrSaida": new Date(), "valorFinal": valorFinal, "isParking": false })
                break;

            default:
                await parking.doc(id).update({ "hrSaida": new Date(), "valorFinal": 150, "isParking": false })
                break;
        }

        res.status(201).send({ status: 1, msg: 'CheckOut realizado com sucesso.' })
    } catch (error) {
        res.status(500).send({ status: 0, msg: 'Algo deu errado.', error: error })
    }
}

exports.listarCheckOut = async (req, res) => {
    try {
        const snapshot = await parking.where('hrSaida', '!=', null).get()
        const listParking = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
        const formatedDate = listParking.map((doc) => ({
            id: doc.id,
            hrEntrada: new Date(doc.hrEntrada.seconds * 1000).toLocaleString('pt-BR', {
                timeZone: 'America/Sao_Paulo'
            }),
            hrSaida: new Date(doc.hrSaida.seconds * 1000).toLocaleString('pt-BR', {
                timeZone: 'America/Sao_Paulo'
            }),
            isParking: doc.isParking,
            emailFuncionario: doc.emailFuncionario,
            valorFinal: doc.valorFinal,
            car: {
                placa: doc.placa,
                modelo: doc.modelo,
                cor: doc.cor
            }
        }))
        res.status(201).send({ status: 1, data: formatedDate })
    } catch (error) {
        res.status(500).send({ status: 0, msg: 'Algo deu errado.', error: error })
    }
}

exports.selectCheckIn = async (req, res) => {
    try {
        const id = req.params.id
        const snapshot = await parking.doc(id).get()
        const data = snapshot.data()
        const formatedDate = {
            id: id,
            hrEntrada: new Date(data.hrEntrada.seconds * 1000).toLocaleString('pt-BR', {
                timeZone: 'America/Sao_Paulo'
            }),
            hrSaida: data.hrSaida,
            isParking: data.isParking,
            emailFuncionario: data.emailFuncionario,
            valorFinal: data.valorFinal,
            car: {
                placa: data.placa,
                modelo: data.modelo,
                cor: data.cor
            }
        }
        res.status(201).send({ status: 1, data: formatedDate })
    } catch (error) {
        res.status(500).send({ status: 0, msg: 'Algo deu errado.', error: error })
    }
}

exports.selectCheckOut = async (req, res) => {
    try {
        const id = req.params.id
        const snapshot = await parking.doc(id).get()
        const data = snapshot.data()
        const formatedDate = {
            id: id,
            hrEntrada: new Date(data.hrEntrada.seconds * 1000).toLocaleString('pt-BR', {
                timeZone: 'America/Sao_Paulo'
            }),
            hrSaida: new Date(data.hrSaida.seconds * 1000).toLocaleString('pt-BR', {
                timeZone: 'America/Sao_Paulo'
            }),
            isParking: data.isParking,
            emailFuncionario: data.emailFuncionario,
            valorFinal: data.valorFinal,
            car: {
                placa: data.placa,
                modelo: data.modelo,
                cor: data.cor
            }
        }
        res.status(201).send({ status: 1, data: formatedDate })
    } catch (error) {
        res.status(500).send({ status: 0, msg: 'Algo deu errado.', error: error })
    }
}