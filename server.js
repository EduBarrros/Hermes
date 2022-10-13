const express = require('express')
const cors = require('cors')
const authRoutes = require('./src/routes/auth')
const parkingRoutes = require('./src/routes/parking')
const reportRoutes = require('./src/routes/report')

const app = express();

app.use(express.json());
app.use(cors());

app.use('/auth/', authRoutes)
app.use('/parking/', parkingRoutes)
app.use('/report/', reportRoutes)

app.listen(6060, () => {
    console.log('Aplicação rodando em http://localhost:6060')
})