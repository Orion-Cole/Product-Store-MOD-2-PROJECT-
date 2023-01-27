document.getElementById('home-link').addEventListener('click', () => {
    window.location.href = '/'
})

document.getElementById('submit-button').addEventListener('click', async () => {
    let name = document.getElementById('name-input').value
    let description = document.getElementById('description-input').value
    let price = +document.getElementById('price-input').value
    let stock = +document.getElementById('stock-input').value
    let img = document.getElementById('img-input').value

    const product = {
        name,
        description,
        price,
        stock,
        img
    }

    let response = await fetch('http://localhost:5000/create_product', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(product)
    }).then(window.location.href = '/')









})