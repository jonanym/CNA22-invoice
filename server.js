// Vi måste importera express-modulen för att skapa en express-app
const express = require('express')
const app = express()
const PORT = process.env.PORT || 3030

app.use(express.urlencoded({ extended: true }))


app.use(express.json())
app.use(require('./middlewear/cors'));

const runAlways = (req, res, next) => {
    res.locals.myVariable = ' Hello from runAlways'
    console.log(`A request was made to ${req.path}`)
    if (req.path == '/') {

        console.log(`This is the site root`)
    }
    next()
}

app.use('/', express.static(__dirname + '/public'))

const invoiceRouter = require('./routes/invoices')
app.use('/invoices', invoiceRouter)

app.use(runAlways)

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
})