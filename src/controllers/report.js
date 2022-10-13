const firebase = require('../config/firebase');
const pdf = require('pdf-creator-node');
const moment = require('moment');
const fs = require("fs");
const path = require("path");

const db = firebase.firestore()
const parking = db.collection('cl_parking')

exports.flowReport = async (req, res) => {
    try {

        const html = fs.readFileSync(path.resolve(__dirname, "../public/template.html"), 'utf-8')

        const reportDate = new Date().toLocaleString('pt-BR', {
            timeZone: 'America/Sao_Paulo'
        })

        var options = {
            format: "A3",
            orientation: "portrait",
            border: "10mm",
            header: {
                height: "45mm",
                contents: `<div style="text-align: center;">Author: Eduardo Barros - Emissão: ${reportDate}</div>`
            },
            footer: {
                height: "28mm",
                contents: {
                    first: 'Cover page',
                    2: 'Second page', // Any page number is working. 1-based index
                    default: '<span style="color: #444;">{{page}}</span>/<span>{{pages}}</span>', // fallback value
                    last: 'Last Page'
                }
            }
        };

        const snapshot = await parking.where('hrSaida', '!=', null).get()
        const listParking = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
        const parkings = listParking.map((doc) => ({
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

        var balance = 0
        var count = 0
        parkings.map((doc) => {
            balance += doc.valorFinal
            count += 1
        })
        const moneyMask = `R$${balance},00`

        var document = {
            html: html,
            data: {
                parkings: parkings,
                balance: moneyMask,
                count: count
            },
            path: path.resolve(__dirname, `../reports/relatorioDeFluxo.pdf`),
            type: "",
        };

        pdf.create(document, options)
        res.status(201).send({ status: 1, msg: 'Relatório gerado com sucesso' })
    } catch (error) {
        res.status(500).send({ status: 0, msg: 'Algo deu errado.', error: error })
    }
}