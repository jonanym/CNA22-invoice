const mongoose = require('mongoose')

const invoiceSchema = new mongoose.Schema({
      date: {
        type: String,
        required: true
      },
      prducts: {
        type: String,
        required: true
      },
      firstName: {
        type: String,
        required: true
      },
      lastName: {
        type: String,
        required: true
      },
      adress: {
        type: String,
        required: true
      },
      postCode: {
        type: String,
        required: true
      },
      postalDistrict: {
        type: String,
        required: true
      },
      country: {
        type: String,
        required: true
      },
      phoneNumber: {
        type: String,
        required: true
      },
      email: {
        type: String,
        required: true
      }

      //Check what is orderType
     /*  orderType: {
        type: String,
        required: true
      } */
});

module.exports = mongoose.model('invoice', invoiceSchema)