const container = document.getElementById('container');

document.getElementById('add-product-link').addEventListener('click', () => {
    window.location.href = '/create_product'
})



const display = async () => {
    console.log('GET DATA FUNCTION ACTIVATED');
    let data = await fetch('/get_products')
    
    data.json().then((parsedData) => {
        parsedData.forEach((object) => {

            let div = document.createElement("div"); //mk div to contain products
                div.setAttribute("class", "product-container")
            
            let imageContainer = document.createElement("div") //mk img div
                imageContainer.setAttribute("class", "image-container")
            let image = document.createElement("img"); //mk img for product
                image.setAttribute("src", `${object.img}`)
                image.setAttribute("class", "product-img")
                imageContainer.appendChild(image)
                div.appendChild(imageContainer)

            let nameHeader = document.createElement("h2"); //mk title for product
                nameHeader.textContent = object.name;
                    if (object.stock <= 0) {
                        nameHeader.style.color = 'red';
                    }
                        div.appendChild(nameHeader)
            
            
            let rating = object.rating; //rating logic section
                    if (rating == undefined) {
                        rating = 0
                    }

                

                let starTally = 0;
                let ratingContainer = document.createElement("span");
                    ratingContainer.setAttribute("id", "rating-container")
                let ratingText = document.createElement("p")
                    ratingText.textContent = rating.toFixed(1);
                    ratingContainer.appendChild(ratingText)

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
                
                div.appendChild(ratingContainer) //mk rating container with its contents (score and stars)

            let price = document.createElement('h3') //mk price for product with decimal as superscript
                    let fraction = object.price.toFixed(2) - Math.floor(object.price);
                    let stringFraction = fraction.toFixed(2).toString()
                    let newFraction = stringFraction.slice(1)
                    console.log(newFraction);
                    let whole = object.price - fraction;
                    price.innerHTML = `$${whole}<sup>${newFraction}</sup>`
                        div.appendChild(price)

            container.appendChild(div);
            div.addEventListener('click', () => {
                window.location.href = `/product_page?product_id=${object._id}&product_name=${object.name}`;
            })



            
        })
    })
}

display()

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












document.getElementById('search-icon').addEventListener('click', () => {
    let bar = document.getElementById('search-bar-container');
    if (bar.style.display == 'block') {
        bar.style.display = 'none'
    } else {
        bar.style.display = 'block'
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
            } else {
                document.getElementById('search-bar').value = '';
                document.getElementById('search-bar').setAttribute("placeholder", "NO MATCH")
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