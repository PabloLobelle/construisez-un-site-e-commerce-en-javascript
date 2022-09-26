let recoveredData = JSON.parse(localStorage.getItem('cart'));
let id;
let dataPrice = [];

//total de produits et prix total
async function totalProducts(){

    let sum = 0;
    let product = 0;
    const totalQuantity = document.getElementById("totalQuantity")
    const totalPrice = document.getElementById("totalPrice");

    for (i in recoveredData){
        sum += recoveredData[i].quantity;
        totalQuantity.innerText = sum;

        product += recoveredData[i].quantity * dataPrice[i];
        totalPrice.innerText = product;
    }
}

//eliminer produits
async function eraseProduct() {

    const eraseItem = document.querySelectorAll('.deleteItem');
    //parcourrir les buttons suprimmer
    for (let i = 0; i < eraseItem.length; i++ ) {
        eraseItem[i].addEventListener('click', (e) => {
            
            const productId = e.target.closest('article').dataset.id;
            const productColor = e.target.closest('article').dataset.color;
            //parcourrir le localstorage et trouver similarités
            for (let i = 0; i < recoveredData.length; i++) {
                if (recoveredData[i].id == productId && recoveredData[i].color == productColor) {
                    recoveredData.splice(i, 1);
                    alert("Le produit a été suprimmé")
                }
            }
            localStorage.setItem('cart', JSON.stringify(recoveredData));
            window.location.reload();
        });
    }
}

//modifier la quantité de produits
async function modifyProduct(){
    const counter = document.querySelectorAll(".itemQuantity");
    for (let i = 0; i < counter.length; i++ ) {
        
        counter[i].addEventListener("change",modificar = (e) => {
            const productId = e.target.closest('article').dataset.id;
            const productColor = e.target.closest('article').dataset.color;
            let value = parseInt (e.target.value);
            for (let i = 0; i < recoveredData.length; i++) {
                if (recoveredData[i].id == productId && recoveredData[i].color == productColor) {
                    recoveredData[i].quantity = value;
                    console.log(recoveredData[i].quantity);
                    localStorage.setItem("cart", JSON.stringify(recoveredData));
                    //recalculer le prix après les modifications
                    totalProducts();
                }
            }
        })
    }
}

//parcourir le localstorage en sauver les données
async function getData(){

    for (let i in recoveredData) {
        let item = recoveredData[i];
        id = item.id;
        colorItem = item.color;
        quantityItem = item.quantity;
        
        await fetch(`http://localhost:3000/api/products/${id}`)
            .then((response) => response.json())
            .then((data) => showData(data))
            .catch((error) => console.log(error))
    }
}

//create du HTML et saissir les données
function showData(data) {

    const section = document.getElementById("cart__items");
    const card = document.createElement("article");
    card.classList.add("cart__item");
    card.dataset.id = id;
    card.dataset.color = colorItem;
    section.appendChild(card);

        const imageContainer = document.createElement("div");
        imageContainer.classList.add("cart__item__img");
        card.appendChild(imageContainer);
        
            const imageElement = document.createElement("img");
            imageElement.src = data.imageUrl;
            imageElement.alt = data.altTxt;
            imageContainer.appendChild(imageElement);

        const itemContent = document.createElement("div");
        itemContent.classList.add("cart__item__content");
        card.appendChild(itemContent);
    
            const itemContentDescription = document.createElement("div");
            itemContentDescription.classList.add("cart__item__content__description");
            itemContent.appendChild(itemContentDescription);

                const nameElement = document.createElement("h2");
                nameElement.innerText = data.name;
                const colorElement = document.createElement("p");
                colorElement.innerHTML = colorItem;
                const priceElement = document.createElement("p");
                priceElement.innerHTML = data.price;
                dataPrice.push(data.price);
                

                itemContentDescription.appendChild(nameElement);
                itemContentDescription.appendChild(colorElement);
                itemContentDescription.appendChild(priceElement);

            const settingQuantity = document.createElement("div");
            settingQuantity.classList.add("cart__item__content__settings");
            itemContent.appendChild(settingQuantity);

                const itemQuantity = document.createElement("div");
                itemQuantity.classList.add("cart__item__content__settings__quantity")
                settingQuantity.appendChild(itemQuantity);

                    const quantity = document.createElement("p");
                    quantity.innerText = 'Qté : '
                    const inputQuantity = document.createElement("input");
                    inputQuantity.classList.add("itemQuantity");
                    inputQuantity.name = "itemQuantity";
                    inputQuantity.type = "number"
                    inputQuantity.min = 1;
                    inputQuantity.max = 100;
                    inputQuantity.value = quantityItem;

                    itemQuantity.appendChild(quantity);
                    itemQuantity.appendChild(inputQuantity);
                
                const deleteSection = document.createElement("div");
                deleteSection.classList.add("cart__item__content__settings__delete");
                settingQuantity.appendChild(deleteSection);

                    const deleteItem = document.createElement("p");
                    deleteItem.classList.add("deleteItem");
                    deleteItem.innerHTML = 'Supprimer';
                    deleteSection.appendChild(deleteItem);
                    
    
    
    totalProducts(dataPrice);
    
    
    eraseProduct();

    modifyProduct();
} 

getData();


console.log(dataPrice)

//////////////////////////////     FORMULAIRE     //////////////////////////
let form = document.querySelector(".cart__order__form");

// REGEX
let adressRegExp = new RegExp("^[A-zÀ-ú0-9 ,.'\-]+$");
let nameRegExp = new RegExp("^[A-zÀ-ú \-]+$");
let emailRegExp = new RegExp("^[a-zA-Z0-9_. -]+@[a-zA-Z.-]+[.]{1}[a-z]{2,10}$");

let firstNameTest;
let lastNameTest;
let addressTest;
let cityTest;
let emailTest;

let firstNameError = document.getElementById("firstNameErrorMsg");
form.firstName.addEventListener('change', (e) => {
    let value = e.target.value;
    if (nameRegExp.test(value)){
        firstNameError.innerHTML = '';
        firstNameTest = nameRegExp.test(value);
    } else {
        firstNameError.innerHTML = 'Veuillez vérifier votre prénom.';
    }
});

let lastNameError = document.getElementById("lastNameErrorMsg");
form.lastName.addEventListener('change', (e) => {
    let value = e.target.value;
    if (nameRegExp.test(value)){
        lastNameError.innerHTML = '';
        lastNameTest = nameRegExp.test(value); 
    } else {
        lastNameError.innerHTML = 'Veuillez vérifier votre nom.';     
    }
});

let addressError = document.getElementById("addressErrorMsg");
form.address.addEventListener('change', (e) => {
    let value = e.target.value;
    if (adressRegExp.test(value)){
        addressError.innerHTML = '';
        addressTest = adressRegExp.test(value);
    } else {
        addressError.innerHTML = 'Veuillez vérifier votre addresse.';
    }
});

let cityError = document.getElementById("cityErrorMsg");
form.city.addEventListener('change', (e) => {
    let value = e.target.value;
    if (nameRegExp.test(value)){
        cityError.innerHTML = '';
        cityTest = nameRegExp.test(value);
    } else {
        cityError.innerHTML = 'Veuillez vérifier votre ville.';
    } 
});

let emailError = document.getElementById("emailErrorMsg");
form.email.addEventListener("change", (e) => {
    let value = e.target.value;
    if (emailRegExp.test(value)){
        emailError.innerHTML = '';
        emailTest = emailRegExp.test(value);
    } else {
        emailError.innerHTML = 'Veuillez vérifier votre e-mail.';
    } 
});

const sendButton = document.getElementById("order");
sendButton.addEventListener("click", (e) => {
    e.preventDefault();
    if (recoveredData == null) {
        alert("Veilleuz acheter des produits, s'il vous plaît")

    } else if(firstNameTest && lastNameTest && addressTest && cityTest && emailTest){
        let itemId = [];
            for (const item of recoveredData) {
                itemId.push(item.id)
            }

        let order = {
                contact: {
                    firstName: firstName.value,
                    lastName: lastName.value,
                    address: address.value,
                    city: city.value,
                    email: email.value,
                },
                products: itemId
            };

        const sendObject = {
            method: 'POST',
            body: JSON.stringify(order),
            headers: {
                'Accept': 'application/json', 
                "Content-Type": "application/json" 
            },
        };
                    
        fetch("http://localhost:3000/api/products/order", sendObject)
            .then((response) => response.json())
            .then((data) => {
                window.location.href = `confirmation.html?orderId=${data.orderId}`;
                localStorage.removeItem('cart');
            })
            .catch((error) => console.log(error))
        
        alert("La commande a été envoyé.");

    } else {
        alert("Veilleuz verifier les champs saissies.");
    }
});
