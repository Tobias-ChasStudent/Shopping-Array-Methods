let shoppingCart = document.getElementById("shopping-cart")

let basket = JSON.parse(localStorage.getItem("data")) || []

//Update cart counter
document.querySelector("#cartAmount").textContent = basket.length

let filteredBasket = []
// Produktdatat finns i variabeln shopData (se data.js)


const generateCartItems = () => {
    basket.map(id => {

        if (!filteredBasket.includes(id)) {
            filteredBasket.push(id)
            //console.log(shopData[id-1]);

            let cartItem = document.createElement("div")
            cartItem.classList.add("cart-item")
            cartItem.id = "cart-item-id-" + id

            let cartItemImage = document.createElement("img")
            cartItemImage.setAttribute("src", shopData[id - 1].image)
            cartItemImage.setAttribute("width", 100)
            cartItem.appendChild(cartItemImage)

            let detailsDiv = document.createElement("div")
            detailsDiv.classList.add("details")

            let titlePriceXDiv = document.createElement("div")
            titlePriceXDiv.classList.add("title-price-x")

            let priceH4 = document.createElement("h4")
            priceH4.classList.add("title-price")
            priceH4.innerHTML = `<p>${shopData[id-1].title}</p><p class="cart-item-price">${shopData[id-1].price}</p>`
            titlePriceXDiv.appendChild(priceH4)

            let removeItem = document.createElement("i")
            removeItem.setAttribute("onclick", `removeItem(${id})`)
            removeItem.classList.add("bi", "bi-x-lg")
            titlePriceXDiv.appendChild(removeItem)

            let btnsDiv = document.createElement("div")
            btnsDiv.classList.add("buttons")

            let decrementBtn = document.createElement("i")
            decrementBtn.setAttribute("onclick", `decrement(${id})`)
            decrementBtn.classList.add("bi", "bi-dash-lg")
            btnsDiv.appendChild(decrementBtn)

            let quantityDiv = document.createElement("div")
            quantityDiv.id = "quantity-" + id
            quantityDiv.classList.add("quantity")
            quantityDiv.textContent = basket.filter(x => x === id).length
            btnsDiv.appendChild(quantityDiv)

            let incrementBtn = document.createElement("i")
            incrementBtn.setAttribute("onclick", `increment(${id})`)
            incrementBtn.classList.add("bi", "bi-plus-lg")
            btnsDiv.appendChild(incrementBtn)

            let totalPriceH3 = document.createElement("h3")
            totalPriceH3.id = "price-" + shopData[id - 1].id
            totalPriceH3.textContent = Math.round((basket.filter(x => x === id).length * shopData[id - 1].price) * 1000) / 1000

            titlePriceXDiv.appendChild(btnsDiv)
            detailsDiv.appendChild(titlePriceXDiv)
            detailsDiv.appendChild(totalPriceH3)
            cartItem.appendChild(detailsDiv)
            shoppingCart.appendChild(cartItem)
        }

    })
    //Update total price
    let allPrices = document.querySelectorAll("h3")
    let totalPrice = 0
    allPrices.forEach(element => {
        console.log(element.textContent);
        totalPrice += Math.round(parseFloat(element.textContent) * 1000) / 1000

    });
    console.log(totalPrice);

    document.querySelector(".label").textContent = "$" + Math.round((totalPrice) * 1000) / 1000
}

generateCartItems();

const increment = (id) => {
    //Add clicked item id to basket
    console.log(id);
    basket.push(id)

    //Update cart counter
    document.querySelector("#cartAmount").textContent = basket.length

    //Update quantity of clicked element
    document.querySelector(`#quantity-${id}`).textContent = basket.filter(x => x === id).length

    //Update the price of the clicked element
    document.querySelector(`#price-${id}`).textContent = Math.round((basket.filter(x => x === id).length * shopData[shopData.findIndex(x => x.id === id)].price) * 1000) / 1000

    //Update basket in local storage
    localStorage.setItem("data", JSON.stringify(basket))

    //Update total price
    let allPrices = document.querySelectorAll("h3")
    let totalPrice = 0
    allPrices.forEach(element => {
        console.log(element.textContent);
        totalPrice += Math.round(parseFloat(element.textContent) * 1000) / 1000

    });
    console.log(totalPrice);

    document.querySelector(".label").textContent = "$" + Math.round((totalPrice) * 1000) / 1000

}

const decrement = (id) => {
    console.log("Clicked decrement on shop id:", id);

    //Check if the item is already in basket
    if (basket.includes(id)) {
        //Remove one of the clicked items
        basket.splice(basket.indexOf(id), 1)

        if (!basket.includes(id)) {
            console.log("That was the last one");
            removeItem(id)
        }

        //Update cart counter
        document.querySelector("#cartAmount").textContent = basket.length

        //Update quantity of clicked element
        document.querySelector(`#quantity-${id}`).textContent = basket.filter(x => x === id).length

        //Update the price of the clicked element
        document.querySelector(`#price-${id}`).textContent = Math.round((basket.filter(x => x === id).length * shopData[shopData.findIndex(x => x.id === id)].price) * 1000) / 1000

        //Update total price
        let allPrices = document.querySelectorAll("h3")
        let totalPrice = 0
        allPrices.forEach(element => {
            console.log(element.textContent);
            totalPrice += Math.round(parseFloat(element.textContent) * 1000) / 1000

        });
        console.log(totalPrice);

        document.querySelector(".label").textContent = "$" + Math.round((totalPrice) * 1000) / 1000 +

            //Update basket in local storage
            localStorage.setItem("data", JSON.stringify(basket))

    }

}

function removeItem(id) {
    document.querySelector(`#cart-item-id-${id}`).remove()

    //Filter out the item that was clicked
    basket = basket.filter(x => {
        return x !== id
    })

    console.log(basket);

    //Update cart counter
    document.querySelector("#cartAmount").textContent = basket.length

    localStorage.setItem("data", JSON.stringify(basket))
}

function removeAll() {
    basket = []

    shoppingCart.innerHTML = ""

    //Update total price
    let allPrices = document.querySelectorAll("h3")
    let totalPrice = 0
    allPrices.forEach(element => {
        console.log(element.textContent);
        totalPrice += Math.round(parseFloat(element.textContent) * 1000) / 1000

    });
    console.log(totalPrice);

    document.querySelector(".label").textContent = "$" + Math.round((totalPrice) * 1000) / 1000

    //Update cart counter
    document.querySelector("#cartAmount").textContent = basket.length

    localStorage.setItem("data", JSON.stringify(basket))
}