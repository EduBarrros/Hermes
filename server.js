const express = require('express')
const cors = require('cors')
const authRoutes = require('./src/routes/auth')

const app = express();

app.use(express.json());
app.use(cors());
app.use('/api/', authRoutes)

app.listen(3000, () => {
    console.log('Aplicação rodando em http://localhost:3000')
})