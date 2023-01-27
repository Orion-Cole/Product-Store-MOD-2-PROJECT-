const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    name: String,
    description: String,
    price: Number,
    stock: Number,
    img: String
})

const MyProduct = mongoose.model('Product', productSchema)

module.exports = MyProduct