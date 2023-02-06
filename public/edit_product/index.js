const params = new Proxy(new URLSearchParams(window.location.search),{
    get: (searchParams, prop) => searchParams.get(prop),
});

let product_id = params.product_id;
console.log(product_id);


document.getElementById('submit-button').addEventListener('click', async () => {
    let name = document.getElementById('name-input').value
    let description = document.getElementById('description-input').value
    let price = +document.getElementById('price-input').value
    let stock = +document.getElementById('stock-input').value
    let img = document.getElementById('img-input').value
    let rating = +document.getElementById('rating-input').value

    const product = {

    }
    //filter system: only passes non-empty data into the product object
    if (name != '') {
        console.log('good string');
        product.name = name;
    }
    if (description != '') {
        console.log('good string');
        product.description = description;
    }
    if (price != '') {
        console.log('good num');
        product.price = price;
    }
    if (stock != '') {
        console.log('good num');
        product.stock = stock;
    }
    if (img != '') {
        console.log('good string');
        product.img = img;
    }
    if (rating != '') {
        console.log('good num');
        product.rating = rating;
    }

    console.log(product);

    let response = await fetch(`http://localhost:5000/update_product/${product_id}`, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(product)
    }).then(window.location.href = `/product_page?product_id=${product_id}`)//redirects to product page
})

document.getElementById('home-link').addEventListener('click', () => {
    window.location.href = '/'
})

const displayCart = async () => {
    console.log('fetching cart data..');

    let data = await fetch('/get_cart')
    data.json().then((parsedData) => {
        if (parsedData.length > 0) {
            document.getElementById('cart-num').textContent = `${parsedData.length}`;
        }
    })
}

displayCart()

document.getElementById('cart-icon').addEventListener('click', () => {
    window.location.href = '/cart'
})