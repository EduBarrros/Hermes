const admin = require('../config/admin')

exports.listUsers = async (req, res) => {
    try {
        var users = []
        const response = await admin.auth().listUsers()

        response.users.map((user) => {
            const userData = {
                id: user.uid,
                email: user.email,
                name: !user.displayName ? 'Não cadastrado' : user.displayName
            }

            users = [...users, userData]
        })

        res.status(200).send({ status: 1, users: users })

    } catch (error) {
        res.status(500).send({ status: 0, msg: 'Algo deu errado.', error: error })
    }
}