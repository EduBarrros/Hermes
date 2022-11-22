const admin = require('../config/admin')

exports.listUsers = async (req, res) => {
    try {
        var users = []
        const response = await admin.auth().listUsers()

        response.users.map((user) => {

            const userData = {
                id: user.uid,
                email: user.email,
                name: !user.displayName ? 'Não cadastrado' : user.displayName,
                disabled: user.disabled
            }

            users = [...users, userData]
        })

        res.status(200).send({ status: 1, users: users })

    } catch (error) {
        res.status(500).send({ status: 0, msg: 'Algo deu errado.', error: error })
    }
}

exports.updateUser = async (req, res) => {
    try {

        const id = req.body.id
        const email = req.body.email
        const name = req.body.name

        if (!id || !email || !name) {
            res.status(403).send({ status: 0, msg: 'Não foram passados todos os dados para atualização' })
        }

        admin.auth().updateUser(id, {

            email: email,
            displayName: name

        }).then(() => {
            res.status(200).send({ status: 1, msg: "Usuário atualizado" })
        }).catch((error) => {

            switch (error.code) {
                case "auth/email-already-exists":
                    res.status(404).send({ status: 0, msg: 'O email informado já está sendo utilizado por alguém.' })
                    break;

                case "auth/user-not-found":
                    res.status(404).send({ status: 0, msg: 'Usuário não encontrado.' })
                    break;

                default:
                    res.status(500).send({ status: 0, msg: 'Algo deu errado.', error: error })
                    break;
            }

        })

    } catch (error) {
        res.status(500).send({ status: 0, msg: 'Algo deu errado.', error: error })
    }
}

exports.disableUser = async (req, res) => {
    try {
        const id = req.body.id

        if ( !id ) {
            res.status(403).send({ status: 0, msg: 'Não foram passados todos os dados para atualização' })
        }

        admin.auth().updateUser(id, {

            disabled: true

        }).then(() => {

            res.status(200).send({ status: 1, msg: "Usuário desativado." })

        }).catch((error) => {

            switch (error.code) {

                case "auth/user-not-found":
                    res.status(404).send({ status: 0, msg: 'Usuário não encontrado.' })
                    break;

                default:
                    res.status(500).send({ status: 0, msg: 'Algo deu errado.', error: error })
                    break;
            }
        })

    } catch (error) {
        res.status(500).send({ status: 0, msg: 'Algo deu errado.', error: error })
    }
}