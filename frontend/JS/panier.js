// Evénement load pour différencier les icones et textes du header en fonction de la page
const cartIcon = document.querySelector(".fa-shopping-cart");
const truckIcon = document.querySelector(".fa-truck");
const cartIconText = document.querySelector(".header-panier-text");
const truckIconText = document.querySelector(".header-livraison-text");

window.addEventListener("load", () => {
  cartIcon.style.color = "white";
  cartIconText.style.color = "white";
  truckIcon.style.color = "lightgrey";
  truckIconText.style.color = "lightgrey";
});

//--------------------- Affichage des produits dans le panier -----------------------

let productInLocalStorage = JSON.parse(localStorage.getItem("product"));
let productsInLocalStorage = JSON.parse(localStorage.getItem("products"));

//Récupération de la div panier et de celle de son contenu
const basketContainer = document.getElementById("basket");
const basketContent = document.getElementById("basket-content");

// Cas où le panier est vide
if (productInLocalStorage === null || productInLocalStorage == 0) {
  basketContainer.innerHTML = `
    <div class="empty-basket">
        <h2 class="empty-basket-title"><i class="fas fa-exclamation-triangle"></i> Oups, votre panier est vide <i class="fas fa-exclamation-triangle"></i></h2>
        <p class="empty-basket-text">Pour continuer vos achats, retournez à l'accueil et trouvez le Teddy qui vous correspond !</p>
        <button class="empty-basket-btn"><a href="../index.html">Retour à l'accueil</a></button>
    </div>
  `;

  console.log(
    "Test n°1: Si le panier est vide, injection du code HTML suivant"
  );
  console.log(basketContainer);

  // Cas où le panier n'est pas vide
} else {
  let structureBasket = [];

  for (i = 0; i < productInLocalStorage.length; i++) {
    structureBasket =
      structureBasket +
      `
        <div class="panier-content-content" data-id="${productInLocalStorage[i].id}">
            <span class="panier-content-suppr-smartphone"><i class="fas fa-times"></i></span>
            <img src="${productInLocalStorage[i].image}" alt="Photo de ${productInLocalStorage[i].name}" class="panier-content-image">
            <div class="panier-content-product">
                <h3 class="panier-content-product-title">${productInLocalStorage[i].name}</h3>
                <p class="panier-content-product-description">${productInLocalStorage[i].description}</p>
                <p class="panier-content-product-color">Couleur : ${productInLocalStorage[i].color}</p>
                <p class="panier-content-product-quantity">Quantité : ${productInLocalStorage[i].quantity}</p>
                <p class="panier-content-product-price">Prix unitaire : ${productInLocalStorage[i].price} €</p>
            </div>
            <span class="panier-content-suppr" data-index="${i}"><i class="fas fa-times"></i></span>
        </div>
    `;

    basketContent.innerHTML = structureBasket;

    console.log(
      "Test n°2: Si le panier n'est pas vide, injection du code HTML suivant"
    );
    console.log(basketContent);
  }
}

document.querySelector(".popup-content-btn").addEventListener("click", () => {
  window.location.href = "../index.html"
})

//--------------------- Suppression des produits ---------------------------

// Récupération des boutons supprimer
const supprBtn = document.querySelectorAll(".panier-content-suppr");
const supprBtnSmartphone = document.querySelectorAll(
  ".panier-content-suppr-smartphone"
);

//-------- Fonction de suppression d'un article ------
function deleteTeddy(index) {
  productInLocalStorage.splice(index, 1);
  productsInLocalStorage.splice(index, 1);
  localStorage.setItem("product", JSON.stringify(productInLocalStorage));
  localStorage.setItem("products", JSON.stringify(productsInLocalStorage));
  window.location.reload();
}

supprBtn.forEach((delBtn) => {
  delBtn.addEventListener("click", () => deleteTeddy(delBtn.dataset.index));
});
supprBtnSmartphone.forEach((delBtn) => {
  delBtn.addEventListener("click", () => deleteTeddy(delBtn.dataset.index));
});

console.log("Test n°3: Suppression d'un article ainsi que ses données dans le local storage")
console.log(productInLocalStorage);

// Récupération du bouton pour supprimer tous les articles
const supprAllBasket = document.getElementById("panier-suppr-all");

// Evénement click pour vider le local storage et le panier
if (supprAllBasket) {
  supprAllBasket.addEventListener("click", () => {
    localStorage.removeItem("product");
    localStorage.removeItem("products");

    //Ajout d'un pop-up pour confirmer que le panier a été vidé
    document.getElementById("popup-panier").style.top = "0px";
  });
}

//--------------- Calcul du prix total des articles dans le panier ------------------------
let calculationTotalPrice = [];
let totalPrice;
let totalProductsInLocalStorage = JSON.parse(localStorage.getItem("total"));

if (productInLocalStorage) {
  for (i = 0; i < productInLocalStorage.length; i++) {
    // Ajout des prix dans un tableau
    calculationTotalPrice.push(
      productInLocalStorage[i].price * productInLocalStorage[i].quantity
    );

    // Fonction reducer et calcul du total des prix
    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    totalPrice = calculationTotalPrice.reduce(reducer, 0);

    // Récupération des deux paragraphes où le prix total va être ajouté
    const totalpriceText = document.getElementById("total-price");
    const totalpriceText2 = document.querySelector(".validation-recap-price");

    // Ajout du prix total en HTML
    totalpriceText.textContent = `Total : ${totalPrice} €`;
    totalpriceText2.textContent = `${totalPrice} €`;

    // Ajout du prix total dns le local storage
    totalProductsInLocalStorage = [];
    totalProductsInLocalStorage.push(totalPrice);
    localStorage.setItem("total", JSON.stringify(totalProductsInLocalStorage));
  }
}

console.log("Test n°4: Calcul du prix total des articles dans le panier");
console.log(totalPrice);

console.log(
  "Test n°5: Injection du prix total des articles dans le code HTML et ajout dans le local storage"
);
console.log(totalProductsInLocalStorage);

// console.log("Test n°14:");

//------ Evénement click pour aller à la page paiement si le local storage n'est pas vide --------
const basketValidation = document.querySelector(".validation-validation-btn");

basketValidation.addEventListener("click", () => {
  if (productInLocalStorage) {
    window.location.href = "./paiement.html";
  } else {
    alert("Votre panier est vide");
  }
});

document.querySelector(".validation-return-index-btn").addEventListener("click", () => {
  window.location.href = "../index.html"
})
