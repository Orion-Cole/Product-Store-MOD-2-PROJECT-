const params = new Proxy(new URLSearchParams(window.location.search),{
    get: (searchParams, prop) => searchParams.get(prop),
});

let product_id = params.product_id;
console.log(product_id);

const getData = async () => {
    let data = await fetch(`/get_product/${product_id}`)
    console.log(data);
    data.json().then((parsedData) => {
        console.log(parsedData);
        console.log(parsedData[0].name);
        document.getElementById('product-title').textContent = parsedData[0].name;
        document.getElementById('description').textContent = parsedData[0].description;
        document.getElementById('price').textContent = `$${parsedData[0].price}`;
        document.getElementById('stock').textContent = `${parsedData[0].stock} in stock`;
            if (parsedData[0].stock <= 0) {
                document.getElementById('stock').textContent = 'Out of stock!'
                document.getElementById('buy-button').style.backgroundColor = 'rgb(169, 54, 54)';
                document.getElementById('buy-button').style.boxShadow = '0px -5px rgb(108, 30, 30) inset';
                document.getElementById('buy-button').disabled = 'true';
            } else if (parsedData[0].stock <= 5) {
                document.getElementById('stock').textContent = `Only ${parsedData[0].stock} left!`;
            }
    })
}
getData()



document.getElementById('buy-button').addEventListener('click', () => {
    document.getElementById('pop-up').style.display = 'flex';
})

document.getElementById('delete-button').addEventListener('click', async () => {
    let response = await fetch(`http://localhost:5000/delete_product/${product_id}`, {
        method: 'DELETE'
    }).then(window.location.href = `/`)
})

document.getElementById('purchase-button').addEventListener('click', async () => {
    location.reload()
    document.getElementById('pop-up').style.display = 'none';
    let response = await fetch(`http://localhost:5000/buy_product/${product_id}/${+document.getElementById('amount').value}`, {
        method: 'PUT'
    })
})


document.getElementById('add-product-link').addEventListener('click', () => {
    window.location.href = '/create_product'
})

document.getElementById('home-link').addEventListener('click', () => {
    window.location.href = '/'
})

document.getElementById('edit').addEventListener('click', () => {
    window.location.href = `/edit_product?product_id=${product_id}`
})