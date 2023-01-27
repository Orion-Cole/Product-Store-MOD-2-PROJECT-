const container = document.getElementById('container');

document.getElementById('add-product-link').addEventListener('click', () => {
    window.location.href = '/create_product'
})



const display = async () => {
    console.log('GET DATA FUNCTION ACTIVATED');
    let data = await fetch('/get_products')
    
    data.json().then((parsedData) => {
        parsedData.forEach((object) => {
            let div = document.createElement("div");
                div.setAttribute("class", "product-container")
            let nameHeader = document.createElement("h2");
                nameHeader.textContent = object.name;
                    if (object.stock <= 0) {
                        nameHeader.style.color = 'red';
                    }
                div.addEventListener('click', () => {
                    window.location.href = `/product_page?product_id=${object._id}`;
                })
                div.appendChild(nameHeader)
            let image = document.createElement("img");
                image.setAttribute("src", `${object.img}`)
                image.setAttribute("class", "product-img")
                div.appendChild(image)
            let description = document.createElement("p")
                description.textContent = object.description;
                div.appendChild(description)
            container.appendChild(div);
        })
    })
}

display()

document.getElementById('search-icon').addEventListener('click', () => {
    let bar = document.getElementById('search-bar-container');
    if (bar.style.display == 'block') {
        bar.style.display = 'none'
    } else {
        bar.style.display = 'block'
    }
})

document.getElementById('search-button').addEventListener('click', async () => {
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
})