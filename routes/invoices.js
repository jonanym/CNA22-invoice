// Den här filen är middleware (i det här fallet en route) som en egen fil
const express = require('express')
const router = express.Router()
const { sendMail } = require("../middlewear/sendMail")
const { createInvoice } = require("../middlewear/createInvoice")

router.get('/invoices', (req, res) => {
    res.send("Hello from invoice")
})

router.post('/', async(req, res) => {
    try {
        res.send(req.body)
    } catch (error) {
        res.status(500).send({ msg: error.message })
    }
    
})

router.post('/createInvoice', createInvoice, sendMail, async(req, res) => {
    try {
        //res.send("invoice created and sent to: " + req.body.email)
        res.send({msg: "mail" + sendMail})
    } catch (error) {
        res.status(500).send({ msg: error.message })
    }
    
})

// Till slut exporterar vi router som en modul så den kan importeras i andra filer
module.exports = router



    

