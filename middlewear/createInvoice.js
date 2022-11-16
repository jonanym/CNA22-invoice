var easyinvoice = require('easyinvoice');
var fs = require('fs');

exports.createInvoice = async (req, res, next) => {

        const [products] = req.body.products

        //console.log(req.body.products)
        //console.log(products.leangth)


        var productlist = req.body.products;
        for (var product of productlist) {
            console.log(product.amount)
        
        var data = {

            // Let's add a recipient
            "client": {
                "name": req.body.name,
                "address": req.body.adress,
                "zip": req.body.postCode,
                "city": req.body.postalDistrict,
                "country": req.body.country
            },

            // Now let's add our own sender details
            "sender": {
                "company": "Super Beer Bros",
                "address": "Beer Street 12",
                "zip": "040404",
                "city": "Global town",
                "country": "Earth"
            },

            // Of course we would like to use our own logo and/or background on this invoice. There are a few ways to do this.
            "images": {
                //      Logo:
                // 1.   Use a url
                logo: fs.readFileSync('unknown.png', 'base64'),
                /*
                   2.   Read from a local file as base64
                        logo: fs.readFileSync('logo.png', 'base64'),
                   3.   Use a base64 encoded image string
                        */
            },

            // Let's add some standard invoice data, like invoice number, date and due-date
            "information": {
                // Invoice number
                "number": "2021.0001",
                // Invoice data
                "date": req.body.date,
                // Invoice due date
                "due-date": "31-12-2021"
            },

            // Now let's add some products! Calculations will be done automatically for you.
            //for product in req.body.products
            
            "products": [
                /*
                productlist.forEach(products => {
                    products.quantity = product.amount,
                    description = product.productName,
                    price= product.price
                }),*/
                
                {
                    "quantity": productlist[0].amount,
                    "description": productlist[0].productName,
                    "price": productlist[0].price
                },
                {
                    "quantity": productlist[1].amount,
                    "description": productlist[1].productName,
                    "price": productlist[1].price
                }
            ],

            // We will use bottomNotice to add a message of choice to the bottom of our invoice
            "bottomNotice": "Kindly pay your invoice within 15 days.",

            // Here you can customize your invoice dimensions, currency, tax notation, and number formatting based on your locale
            "settings": {
                "currency": "EUR", // See documentation 'Locales and Currency' for more info. Leave empty for no currency.

            },

            "translate": {
                /*
                 "invoice": "FACTUUR",  // Default to 'INVOICE'
                 "number": "Nummer", // Defaults to 'Number'
                 "date": "Datum", // Default to 'Date'
                 "due-date": "Verloopdatum", // Defaults to 'Due Date'
                 "subtotal": "Subtotaal", // Defaults to 'Subtotal'
                 "products": "Producten", // Defaults to 'Products'
                 "quantity": "Aantal", // Default to 'Quantity'
                 "price": "Prijs", // Defaults to 'Price'
                 "product-total": "Totaal", // Defaults to 'Total'
                 "total": "Totaal" // Defaults to 'Total'        
                 */
            },

            /*
                Customize enables you to provide your own templates.
                Please review the documentation for instructions and examples.
                Leave this option blank to use the default template
             */
            "customize": {
                // "template": fs.readFileSync('template.html', 'base64') // Must be base64 encoded html
            },}
        };

        easyinvoice.createInvoice(data, function (result) {
            /*  
                5.  The 'result' variable will contain our invoice as a base64 encoded PDF
                    Now let's save our invoice to our local filesystem so we can have a look!
                    We will be using the 'fs' library we imported above for this.
            */
            fs.writeFileSync("invoice.pdf", result.pdf, 'base64');
        });
        console.log("Invoice Created")
        
       next()
}