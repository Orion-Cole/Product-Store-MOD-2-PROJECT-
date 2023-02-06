document.getElementById('home-link').addEventListener('click', () => {
    window.location.href = '/'
})

document.getElementById('submit-button').addEventListener('click', async () => {
    let name = document.getElementById('name-input').value
    let description = document.getElementById('description-input').value
    let price = +document.getElementById('price-input').value
    let stock = +document.getElementById('stock-input').value
    let img = document.getElementById('img-input').value
    let rating = +document.getElementById('rating-input').value

    const product = {
        name,
        description,
        price,
        stock,
        img,
        rating
    }

    let response = await fetch('http://localhost:5000/create_product', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(product)
    }).then(window.location.href = '/')
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