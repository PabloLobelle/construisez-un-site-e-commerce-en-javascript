//récuperation de l'Id
const productId = window.location.search;
const urlParams = new URLSearchParams(productId);
const id = urlParams.get("id")

//demande des données en relation à l'id
fetch(`http://localhost:3000/api/products/${id}`)
    .then((response) => response.json())
    .then((data) => productData(data))
    .catch((error) => console.log(error))

//affichage des données en créant les balises html
function productData(data) {

    const imageContainer = document.querySelector(".item__img");
    const imageElement = document.createElement("img")
    imageElement.src = data.imageUrl;
    imageElement.alt = data.altTxt;
    imageContainer.appendChild(imageElement);

    const nameElement = document.getElementById("title");
    nameElement.innerText = data.name;

    const priceElement = document.getElementById("price");
    priceElement.innerHTML = data.price;

    const descriptionElement = document.getElementById("description");
    descriptionElement.innerText = data.description;

    const colorElement = document.getElementById("colors");
    //choissir la couleur
    for (let i in data.colors) {
        const color = document.createElement("option");
        color.innerHTML = data.colors[i];
        colorElement.appendChild(color);
    }
}

//garder les données dans le localstorage
const addToCart = document.getElementById("addToCart")
addToCart.addEventListener("click",saveItem);

function saveItem(){
    
    const selectedColor = document.getElementById("colors").value;
    const quantity = document.getElementById("quantity").value;
    

    if(selectedColor == "" && quantity > 100 || quantity < 1){
        alert("Choisissez un coleur et une quantité valide, s'il vous plaît");
    } else if (selectedColor == "") {
        alert("Choisissez une coleur, s'il vous plaît");
    } else if (quantity > 100 || quantity < 1) {
        alert("Choisissez une quantité valide, s'il vous plaît");
    } else {
        let dataRecovery = {
            id: id,
            color: selectedColor,
            quantity: parseInt (quantity),
        };
        let recoveredData = localStorage.getItem("cart");
        if(recoveredData == null){
            recoveredData = [dataRecovery];
            localStorage.setItem("cart", JSON.stringify(recoveredData));
            alert("Le produit à été bien registré");
        } else {
            recoveredData = JSON.parse(recoveredData);
            const findItem = recoveredData.find(item => (item.id == dataRecovery.id && item.color == dataRecovery.color));
            if (findItem == undefined) {
                recoveredData.push(dataRecovery);
            } else {
                findItem.quantity += dataRecovery.quantity;
            }
            localStorage.setItem("cart", JSON.stringify(recoveredData));
            alert("Le produit à été bien registré");
        }
    }
}