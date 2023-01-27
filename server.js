const express = require('express')
const mongoose = require('mongoose');
const MyProduct = require('./models/product');
require('dotenv').config()
const app = express()
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static('public'));

let connectionString = `mongodb+srv://${process.env.MONGOUSERNAME}:${process.env.MONGOPASSWORD}@mongosetupcluster.t6ybobn.mongodb.net/ProductStore?retryWrites=true&w=majority`
mongoose.set('strictQuery', false);
mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
mongoose.connection.once('open', ()=> {
    console.log('connected to mongo');
});

app.post('/create_product', async (req, res) => {
    console.log(req.body);
    let {name, description, price, stock, img} = req.body;
    let returnedValue = await MyProduct.create({
        name,
        description,
        price,
        stock,
        img
    })
    console.log(returnedValue);
    if (returnedValue) {
        console.log("upload complete");
    }
    res.send(returnedValue);
})

app.get('/get_products', async (req, res) => {
    let productsResponse = await MyProduct.find({})
    res.json(productsResponse)
})

app.get('/get_product/:product_id', async (req, res) => {
    let productResponse = await MyProduct.find({_id:`${req.params.product_id}`})
    res.json(productResponse)
})

app.put('/update_product/:product_id', async (req, res) => {
    console.log(req.body);
    let response = await MyProduct.findByIdAndUpdate(req.params.product_id, {name: req.body.name, description: req.body.description, price: req.body.price, stock: req.body.stock, img: req.body.img})
})

app.put('/buy_product/:product_id/:amount', async (req, res) => {
    console.log(req.params.product_id);
    console.log(req.params.amount);
     let response = await MyProduct.findByIdAndUpdate(req.params.product_id, {$inc: {stock: -req.params.amount}})
})

app.delete('/delete_product/:product_id', async (req, res) => {
    let response = await MyProduct.findByIdAndDelete(req.params.product_id)
})


app.listen(5000, () => {
    console.log(`Server is Listening on 5000`)
})


