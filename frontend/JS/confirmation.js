// Récupération du local storage
let productInLocalStorage = JSON.parse(localStorage.getItem("product"));
let totalProductsInLocalStorage = JSON.parse(localStorage.getItem("total"));
let dataDeliveryPrice = JSON.parse(localStorage.getItem("livraison"));
let orderIdInLocalStorage = localStorage.getItem("orderId");

// Ajout du numéro de commande avce l'orderID
const purchasedNumber = document.getElementById("order-id");

purchasedNumber.textContent = `Commande n°${orderIdInLocalStorage}`;

console.log("Test n°1: Récupération et injection en HTML du numéro de commande");
console.log(purchasedNumber);

// Ajout de la date à laqeulle a été éffectuée la commande
const purchasedDate = document.getElementById("livraison-today");
let today = new Date();

let optionsDate = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "2-digit",
};

purchasedDate.textContent = `Éffectué le ${today.toLocaleDateString(
  "fr-FR",
  optionsDate
)}`;

console.log("Test n°2: Injection en HTML de la date d'aujourd'hui");
console.log(purchasedDate);

//--------------- Ajout des produits du panier --------------------------
const purchasedProducts = document.querySelector(".details-product-container");
let structureConfirmation = [];

for (i = 0; i < productInLocalStorage.length; i++) {
  structureConfirmation =
    structureConfirmation +
    `
        <div class="details-product">
            <img src="${productInLocalStorage[i].image}" alt="Photo de ${productInLocalStorage[i].image}" class="details-product-image">
            <div class="details-product-product">
                <h4 class="details-product-product-title">${productInLocalStorage[i].name}</h4>
                <p class="details-product-product-description">${productInLocalStorage[i].description}</p>
                <p class="details-product-product-color">Couleur : ${productInLocalStorage[i].color}</p>
                <p class="details-product-product-quantity">Quantité : ${productInLocalStorage[i].quantity}</p>
                <span class="details-product-product-price">Prix unitaire : ${productInLocalStorage[i].price} €</span>
            </div>
        </div>
    `;
  purchasedProducts.innerHTML = structureConfirmation;

}
console.log("Test n°3: Injection du code HTML suivant, contenant le ou les produits acheté par le client");
console.log(purchasedProducts);

// Ajout du mode de livraison
const deliveryMode = document.getElementById("livraison-mode");

deliveryMode.textContent = `Livraison ${dataDeliveryPrice[0].mode}`;

// Ajout de la date de livraison
const deliveryDate = document.getElementById("livraison-date");

let day = Number(today.getDate()) + 5;
let month = today.getMonth();
let year = today.getFullYear();

if (day < 10) {
  day = "0" + day;
}

if (month < 10) {
  month = "0" + month;
}

deliveryDate.textContent = `${day}/${month}/${year}`;

console.log("Test n°4: Ajout d'un delais de livraison de 5 jours et injection en HTML");
console.log(deliveryDate);

//------------------- Ajout du prix total et de livraison ----------------------------
const recapBasketPrice = document.getElementById("recap-sous-total");
const recapDeliveryPrice = document.getElementById("recap-livraison-price");
const recapTotalPrice = document.getElementById("recap-total");

recapBasketPrice.textContent = `${totalProductsInLocalStorage} €`;
recapDeliveryPrice.textContent = `${dataDeliveryPrice[0].price} €`;
recapTotalPrice.textContent = `${
  Number(totalProductsInLocalStorage) + Number(dataDeliveryPrice[0].price)
} €`;

console.log("Test n°5: Récupération, calcul et injection des prix du panier, de la livraison et du prix total");
console.log(recapTotalPrice);

const BackToIndexBtn = document.getElementById("btn-retour-accueil");

BackToIndexBtn.addEventListener("click", () => {
  localStorage.clear();
  window.location.href = "../index.html";
});
