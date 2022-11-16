// Vi måste importera express-modulen för att skapa en express-app
const express = require('express')
const app = express()
const PORT = process.env.PORT || 3030

// Vi importerar vor foo-route som en modul

app.use(express.json())


const invoiceRouter = require('./routes/invoices')
app.use('/invoices', invoiceRouter)

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
})