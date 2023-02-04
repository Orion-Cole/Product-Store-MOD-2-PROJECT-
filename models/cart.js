const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    id: String,
    name: String
})

const MyCart = mongoose.model('Cart', productSchema)

module.exports = MyCart