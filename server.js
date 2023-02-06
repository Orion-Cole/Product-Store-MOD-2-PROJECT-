const express = require('express')
const mongoose = require('mongoose');
const MyProduct = require('./models/product');
const MyCart = require('./models/cart');
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

app.post('/create_product', async (req, res) => { //add new products to database
    console.log(req.body);
    let {name, description, price, stock, img, rating} = req.body;
    let returnedValue = await MyProduct.create({
        name,
        description,
        price,
        stock,
        img,
        rating
    })
    console.log(returnedValue);
    if (returnedValue) {
        console.log("upload complete");
    }
    res.send(returnedValue);
})

app.post('/add_to_cart/:product_id/:product_name', async (req, res) => { //add items to users cart
    console.log('CART POST SUCCESS');
   
    let cartResponse = await MyCart.create({
        id: `${req.params.product_id}`,
        name: `${req.params.product_name}`
    })

    res.send(cartResponse)
})

app.delete('/delete_from_cart/:product_name', async (req, res) => { //delete 1 item from users cart
    let response = await MyCart.deleteOne({name: `${req.params.product_name}`})
    res.send(response)
})

app.delete('/delete_from_cart', async (req, res) => { //delete everything in cart
    let response = await MyCart.deleteMany({})
    res.send(response)
})

app.get('/get_cart', async (req, res) => { //gets contents of cart to display on page
    let cartResponse = await MyCart.find({})
    res.json(cartResponse)
})

app.get('/get_products', async (req, res) => { //gets product list to display on page
    let productsResponse = await MyProduct.find({})
    res.json(productsResponse)
})

app.get('/get_product/:product_id', async (req, res) => { //gets specified product to display on page
    let productResponse = await MyProduct.find({_id:`${req.params.product_id}`})
    res.json(productResponse)
})

app.put('/update_product/:product_id', async (req, res) => { //updates specific product data
    console.log(req.body);
    let response = await MyProduct.findByIdAndUpdate(req.params.product_id, {name: req.body.name, description: req.body.description, price: req.body.price, stock: req.body.stock, img: req.body.img, rating: req.body.rating})
    res.send('successful update')
})

app.put('/buy_product/:product_id/:amount', async (req, res) => { //buy specified amount of a product, altering the stock amount
    console.log(req.params.product_id);
    console.log(req.params.amount);
    let response = await MyProduct.findByIdAndUpdate(req.params.product_id, {$inc: {stock: -req.params.amount}})
    res.send('successful purchase')
})

app.delete('/delete_product/:product_id', async (req, res) => { //deletes product from database
    let response = await MyProduct.findByIdAndDelete(req.params.product_id)
    res.send('successful deletion')
})

app.listen(5000, () => {
    console.log(`Server is Listening on 5000`)
})