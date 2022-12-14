const firebase = require('../config/firebase');
const pdf = require('pdf-creator-node');
const moment = require('moment');
const fs = require("fs");
const path = require("path");
const pdf2base64 = require('pdf-to-base64');

const db = firebase.firestore()
const parking = db.collection('cl_parking')

exports.flowReport = async (req, res) => {

    const StartDate = req.body.start
    const EndDate = req.body.end
    const Type = req.body.type

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

        var snapshot = []
        var listParking = []

        if (Type === 1) {

            snapshot = await parking.where('hrSaida', '!=', null).get()
            listParking = await snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))

        } else if (Type === 2 && StartDate !== undefined && EndDate !== undefined) {

            const StartParseDate = firebase.firestore.Timestamp.fromDate(new Date(StartDate));

            const EndParseDate = firebase.firestore.Timestamp.fromDate(new Date(EndDate));

            snapshot = await parking.where('hrSaida', '>', StartParseDate).where('hrSaida', '<', EndParseDate).get()
            listParking = await snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))

        } else if (Type === 3 && StartDate !== undefined && EndDate !== undefined) {

            const StartParseDate = firebase.firestore.Timestamp.fromDate(new Date(StartDate));

            const EndParseDate = firebase.firestore.Timestamp.fromDate(new Date(EndDate));

            snapshot = await parking.where('hrEntrada', '>', StartParseDate).where('hrEntrada', '<', EndParseDate).get()
            listParking = await snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))

        } else {
            res.status(404).send({ status: 0, msg: 'Não foram passados os parametros necessários para gerar o relatório.' })
        }

        const parkings = await listParking.map((doc) => ({
            id: doc.id,
            hrEntrada: new Date(doc.hrEntrada.seconds * 1000).toLocaleString('pt-BR', {
                timeZone: 'America/Sao_Paulo'
            }),
            hrSaida: !doc.hrSaida ? 'Ainda estacionado' : new Date(doc.hrSaida.seconds * 1000).toLocaleString('pt-BR', {timeZone: 'America/Sao_Paulo'}),
            isParking: doc.isParking,
            emailFuncionario: doc.emailFuncionario,
            valorFinal: !doc.valorFinal ? 0 : doc.valorFinal,
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

        await pdf.create(document, options)

        var report64 = ''

        await pdf2base64(path.resolve(__dirname, `../reports/relatorioDeFluxo.pdf`))
            .then(
                (response) => {
                    report64 = response
                }
            )
            .catch(
                (error) => {
                    console.log(error)
                }
            )

        res.status(201).send({ status: 1, msg: 'Relatório gerado com sucesso', report: report64 })
    } catch (error) {
        res.status(500).send({ status: 0, msg: 'Algo deu errado.', error: error })
    }
}