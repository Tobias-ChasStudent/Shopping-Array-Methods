const shop = document.getElementById('shop');

let basket = JSON.parse(localStorage.getItem("data")) || [];
// Produktdatat finns i variabeln shopData (se data.js)

//Update cart counter
document.querySelector("#cartAmount").textContent = basket.length

const generateShop = () => {
    // Generera alla produkter med dynamisk HTML och Array.protype.map() samt join()
    //
    shopData.map(element => {
        //Create main item div
        let shopItem = document.createElement("div")
        shopItem.id = "product-id-" + element.id
        shopItem.classList.add("item", element.category.replace(" ", "-"))

        //Create shop item image element
        let shopItemImage = document.createElement("img")
        shopItemImage.setAttribute("width", 220)
        shopItemImage.setAttribute("src", element.image)
        shopItem.appendChild(shopItemImage)

        //Create details div
        let detailsDiv = document.createElement("div")
        detailsDiv.classList.add("details")

        //Add all details to detailsDiv
        let itemTitle = document.createElement("h3")
        itemTitle.textContent = element.title
        detailsDiv.appendChild(itemTitle)

        let itemDesc = document.createElement("p")
        itemDesc.textContent = element.description.substring(0, 40) + "..."
        detailsDiv.appendChild(itemDesc)

        let priceDiv = document.createElement("div")
        priceDiv.classList.add("price-quantity")

        let itemPrice = document.createElement("h2")
        itemPrice.textContent = "$ " + element.price
        priceDiv.appendChild(itemPrice)

        let buttonsDiv = document.createElement("div")
        buttonsDiv.classList.add("buttons")

        let decrementBtn = document.createElement("i")
        decrementBtn.setAttribute("onclick", `decrement(${element.id})`)
        decrementBtn.classList.add("bi", "bi-dash-lg")
        buttonsDiv.appendChild(decrementBtn)

        let quantityDiv = document.createElement("div")
        quantityDiv.id = "quantity-" + element.id
        quantityDiv.classList.add("quantity")
        quantityDiv.textContent = (basket == []) ? 0 : basket.filter(x => x === element.id).length
        buttonsDiv.appendChild(quantityDiv)

        let incrementBtn = document.createElement("i")
        incrementBtn.setAttribute("onclick", `increment(${element.id})`)
        incrementBtn.classList.add("bi", "bi-plus-lg")
        buttonsDiv.appendChild(incrementBtn)

        priceDiv.appendChild(buttonsDiv)
        detailsDiv.appendChild(priceDiv)
        shopItem.appendChild(detailsDiv)
        shop.appendChild(shopItem)
    })
    // Använd denna markup för varje produktkort - den korresponderar mot CSS:en
    //
    // <div id=product-id-{--id--} class="item">
    //     <img width="220" src={--url--} alt=""> 
    //     <div class="details">
    //         <h3>{--title-}</h3>
    //         <p>{--desription--}</p>
    //         <div class="price-quantity">
    //         <h2>{--price-)-</h2>
    //         <div class="buttons">
    //             <i onclick="decrement({--id--})" class="bi bi-dash-lg"></i>
    //             <div id={--id--} class="quantity">
    //             </div>
    //             <div id={--id--} class="quantity">???</div>
    //             <i onclick="increment({--id--})" class="bi bi-plus-lg"></i>
    //         </div>
    //         </div>
    //     </div>
    // </div>
}

generateShop()

const increment = (id) => {
    //Add clicked item id to basket
    console.log(id);
    basket.push(id)

    //Update cart counter
    document.querySelector("#cartAmount").textContent = basket.length

    //Update quantity of clicked element
    document.querySelector(`#quantity-${id}`).textContent = basket.filter(x => x === id).length

    //Update basket in local storage
    localStorage.setItem("data", JSON.stringify(basket))


}

const decrement = (id) => {
    console.log("Clicked decrement on shop id:", id);

    //Check if the item is already in basket
    if (basket.includes(id)) {
        //Remove one of the clicked items
        basket.splice(basket.indexOf(id), 1)

        //Update cart counter
        document.querySelector("#cartAmount").textContent = basket.length

        //Update quantity of clicked element
        document.querySelector(`#quantity-${id}`).textContent = basket.filter(x => x === id).length

        //Update basket in local storage
        localStorage.setItem("data", JSON.stringify(basket))
    } else {
        //There were no items of that id
        console.log("There are no items of this id in the basket");
    }

}