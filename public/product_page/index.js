const params = new Proxy(new URLSearchParams(window.location.search),{
    get: (searchParams, prop) => searchParams.get(prop),
});

let totalStock;
let product_id = params.product_id;
let product_name = params.product_name;
console.log('product id: ' + product_id);

const getData = async () => {
    let data = await fetch(`/get_product/${product_id}`)
    console.log(data);
    data.json().then((parsedData) => {
        console.log(parsedData);
        console.log(parsedData[0].name);

        totalStock = parsedData[0].stock

        document.getElementById('product-image').setAttribute("src", `${parsedData[0].img}`);
        document.getElementById('cart-popup-image').setAttribute("src", `${parsedData[0].img}`);
        document.getElementById('product-title').textContent = parsedData[0].name;
        

                let rating = parsedData[0].rating; //rating logic section
                    if (rating == undefined) {
                        rating = 0
                    }

                let ratingText = document.createElement("p")
                    ratingText.textContent = rating.toFixed(1)
                        let ratingContainer = document.getElementById('rating-div')
                            ratingContainer.appendChild(ratingText)

                let starTally = 0;

                for (var i=0;i<Math.floor(rating);i++) {
                    let star = document.createElement("span")
                        star.setAttribute("class", "fa-solid fa-star checked")
                        ratingContainer.appendChild(star)
                            starTally++
                }
                if (Number.isInteger(rating)) {
                    console.log('rating a whole number');
                    for (var j=0;j<5-Math.floor(rating);j++) {
                        let emptyStar = document.createElement("span")
                        emptyStar.setAttribute("class", "fa-solid fa-star")
                        ratingContainer.appendChild(emptyStar)
                            starTally++
                    }
                } else {
                    console.log('not whole num');
                    let decimal = (rating - Math.floor(rating)).toFixed(1)
                    if (decimal >= .8) { //whole star
                        let star = document.createElement("span")
                        star.setAttribute("class", "fa-solid fa-star checked")
                        ratingContainer.appendChild(star)
                            starTally++
                    } else if (decimal <= .2) { //empty star
                        let emptyStar = document.createElement("span")
                        emptyStar.setAttribute("class", "fa-solid fa-star")
                        ratingContainer.appendChild(emptyStar)
                            starTally++
                    } else { //half star
                        let halfStar = document.createElement("span")
                        halfStar.setAttribute("class", "fa-solid fa-star-half-stroke checked")
                        ratingContainer.appendChild(halfStar)
                            starTally++
                    }

                    if (starTally < 5) {
                        for (var i=0;i<5-starTally;i++) {
                            let emptyStar = document.createElement("span")
                            emptyStar.setAttribute("class", "fa-solid fa-star")
                            ratingContainer.appendChild(emptyStar)
                        }
                    }
                }

        document.getElementById('description').textContent = parsedData[0].description;


        
            let fraction = parsedData[0].price.toFixed(2) - Math.floor(parsedData[0].price);
            let stringFraction = fraction.toFixed(2).toString()
            let newFraction = stringFraction.slice(1)
            let whole = parsedData[0].price - fraction;
            document.getElementById('price').innerHTML = `$${whole}<sup>${newFraction}</sup>`

        document.getElementById('stock').textContent = `${parsedData[0].stock} in stock`;
            if (parsedData[0].stock <= 0) {
                document.getElementById('stock').textContent = 'Out of stock!'
                document.getElementById('add-to-cart-button').style.backgroundColor = 'rgb(169, 54, 54)';
                document.getElementById('add-to-cart-button').style.boxShadow = '0px -5px rgb(108, 30, 30) inset';
                document.getElementById('add-to-cart-button').disabled = 'true';
                document.getElementById('buy-now-button').style.backgroundColor = 'rgb(169, 54, 54)';
                document.getElementById('buy-now-button').style.boxShadow = '0px -5px rgb(108, 30, 30) inset';
                document.getElementById('buy-now-button').disabled = 'true';
            } else if (parsedData[0].stock <= 5) {
                document.getElementById('stock').textContent = `Only ${parsedData[0].stock} left!`;
            }
    })
}
getData()

document.getElementById('search-icon').addEventListener('click', () => {
    let bar = document.getElementById('search-bar-container');
    if (bar.style.display == 'flex') {
        bar.style.display = 'none'
    } else {
        bar.style.display = 'flex'
        document.getElementById('search-bar').focus()
    }
})


document.getElementById('cart-icon').addEventListener('click', () => {
    window.location.href = '/cart'
})

let search = async () => {
    let input = document.getElementById('search-bar').value;
    let data = await fetch('/get_products')
    data.json().then((parsedData) => {
        parsedData.forEach((object) => {
            if (input.toUpperCase() == object.name.toUpperCase()) {
                console.log('Match found: ' + object.name);
                window.location.href = `/product_page?product_id=${object._id}`
            } 
        })
    })
}


document.getElementById('search-button').addEventListener('click', search)


document.getElementById('search-bar').addEventListener('keypress', (event) => {
    console.log("KEYPRESS");
    if (event.code == 'Enter') {
        console.log("KEYPRESS = ENTER");
        search()
    }
})



document.getElementById('add-to-cart-button').addEventListener('click', async () => { //------------------------
    document.getElementById('pop-up').style.display = 'grid';
    const amount = document.getElementById('amount').value;
    //if amount added to cart exceeds amount in stock return error and add as many as possible to cart
    console.log('TOTALSTOCK = ',totalStock);
    if (amount <= totalStock) {
        for (var i=0;i<amount;i++) {
            let response = await fetch(`http://localhost:5000/add_to_cart/${product_id}/${product_name}`, {
                method: 'POST'
            })
            console.log('add to cart response: ' + response);
        }
    } else {
        console.log('NOT ENOUGH IN STOCK TO ADD TO CART')
        for (var i=0;i<totalStock;i++) {
            let response = await fetch(`http://localhost:5000/add_to_cart/${product_id}/${product_name}`, {
                method: 'POST'
            })
            console.log('add to cart response: ' + response);
        }
    }
    
})

const deleteProduct = async () => {
    let response = await fetch(`http://localhost:5000/delete_product/${product_id}`, {
        method: 'DELETE'
    }).then(window.location.href = `/`)
}

document.getElementById('delete-button').addEventListener('click', async () => {
   //open popup to confirm deletion
    document.querySelector('.modal').style.display = 'block';
})

document.getElementById('modal-delete-button').addEventListener('click', async ()=> {
    await deleteProduct()
    document.querySelector('.modal').style.display = 'none';
})

document.getElementById('close-modal').addEventListener('click', () => {
    document.querySelector('.modal').style.display = 'none';
})

document.getElementById('close-pop-up').addEventListener('click', () => {
    document.getElementById('pop-up').style.display = 'none';
    location.reload()
})




document.getElementById('buy-now-button').addEventListener('click', async () => {
    location.reload()
    document.getElementById('pop-up').style.display = 'none';
    let response = await fetch(`http://localhost:5000/buy_product/${product_id}/${+document.getElementById('amount').value}`, {
        method: 'PUT'
    })
})

document.getElementById('continue-shopping-button').addEventListener('click', () => {
    window.location.href = '/'
})

document.getElementById('go-to-cart').addEventListener('click', () => {
    window.location.href = '/cart'
})



document.getElementById('add-product-link').addEventListener('click', () => {
    window.location.href = '/create_product'
})

document.getElementById('home-link').addEventListener('click', () => {
    window.location.href = '/'
})

document.getElementById('edit-button').addEventListener('click', () => {
    window.location.href = `/edit_product?product_id=${product_id}`
})


const displayCart = async () => { //shows cart num in nav
    console.log('fetching cart data..');

    let data = await fetch('/get_cart')
    data.json().then((parsedData) => {
        if (parsedData.length > 0) {
            document.getElementById('cart-num').textContent = `${parsedData.length}`;
        }
    })
}

displayCart()