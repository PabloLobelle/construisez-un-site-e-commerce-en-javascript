
// appel à le serveur pour demander des données et les soummit à la fonction showData
fetch("http://localhost:3000/api/products")
    .then((response) => response.json())
    .then((data) => showData(data))
    .catch((error) => console.log(error))

//affichage des données en créant les balises html
async function showData(data) {
    const allItems = document.getElementById("items");
        for (let i in data) {
            
            const link = document.createElement("a");
            // passer l'id à la page product
            link.href = `./product.html?id=${data[i]._id}`;

            const card = document.createElement("article");
        
            const imageElement = document.createElement("img");
            imageElement.src = data[i].imageUrl;
            imageElement.alt = data[i].altTxt;

            const nameElement = document.createElement("h3");
            nameElement.innerText = data[i].name;
            nameElement.classList.add("productName")

            const descriptionElement = document.createElement("p");
            descriptionElement.innerText = data[i].description;
            descriptionElement.classList.add("productDescription")

            card.appendChild(imageElement);
            card.appendChild(nameElement);
            card.appendChild(descriptionElement);

            link.appendChild(card);
            allItems.appendChild(link);
        }
    }
