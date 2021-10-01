const purchasedProducts = document.querySelector(".details-product-container");
let productInLocalStorage = JSON.parse(localStorage.getItem("product"));
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
