const getDetails = async (id) => {
    let data = await fetch(`/get_product/${id}`)
    
    return data.json().then((parsedData) => {
        let [destructuredData] = parsedData;
        return destructuredData;
    })
}



    const emptyCart = async () => {
        let removeItemsRes = await fetch(`/delete_from_cart`, {
            method: 'DELETE'
        })
        location.reload()
    }
    

    document.getElementById('remove-all').addEventListener('click', async () => { //---------button to remove all from list
        emptyCart()
    })



const displayCart = async () => {
    console.log('fetching cart data..');
    let tally = 0;
    let data = await fetch('/get_cart')
    data.json().then((parsedData) => {
        const promises = parsedData.map(async (object) => {
            let details = await getDetails(object.id)
            console.log(details)



            
            let div = document.createElement('div')
                div.setAttribute('class', 'item-div')
                // div.innerHTML = '<span class="close">&times;</span>'

            let x = document.createElement('span')
                x.setAttribute('class','close')
                x.innerHTML = '&times;'
                x.addEventListener('click', async () => { //------------------remove item from cart/database
                    let removeItemRes = await fetch(`/delete_from_cart/${details.name}`, {
                        method: 'DELETE'
                    })
                    location.reload()
                })
                div.appendChild(x)

            let name = document.createElement('h2')
                name.textContent = `${details.name}`;
                div.appendChild(name)
            let cost = document.createElement('h3')
                cost.textContent = `$${(details.price).toFixed(2)}`
                div.appendChild(cost)

            

                document.getElementById('cart-div').appendChild(div)

                tally += details.price
        })
        Promise.all(promises).then(() => {
            console.log(tally.toFixed(2));
            let totalCost = document.getElementById('total')
            totalCost.innerHTML = `<h2>Total cost: $${tally.toFixed(2)}</h2>`

            document.getElementById('modal-total').innerText = `$${tally.toFixed(2)}`
        })
      
        })
        
    }




displayCart()

document.getElementById('purchase-button').addEventListener('click', () => {
    document.querySelector('.modal').style.display = 'block'
})



document.getElementById('close-modal').addEventListener('click', () => {
    document.querySelector('.modal').style.display = 'none'
})


// document.getElementById('modal-buy-button').addEventListener('click', async () => {
//     document.querySelector('.modal').style.display = 'none'
//     let response = await fetch(`http://localhost:5000/buy_cart_products`, {
//         method: 'PUT'
//     })
//     //location.reload()
// })


document.getElementById('modal-buy-button').addEventListener('click', async () => {
    document.querySelector('.modal').style.display = 'none'
    let data = await fetch('/get_cart')
    data.json().then((parsedData) => {
        parsedData.forEach(async (item) => {
            console.log('item:', item);
            let response = await fetch(`http://localhost:5000/buy_product/${item.id}/${1}`, {
                method: 'PUT'
            })
            
        })
        emptyCart()
    })
})
