const productId = window.location.search;
const urlParams = new URLSearchParams(productId);
const id = urlParams.get("orderId");
console.log(id)

const OrderNumber = document.getElementById("orderId")
OrderNumber.innerHTML = id