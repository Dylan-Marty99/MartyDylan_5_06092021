//--------------------- Affichage des produits dans le panier -----------------------

let productInLocalStorage = JSON.parse(localStorage.getItem("product"));
console.log(productInLocalStorage);

//Récupération de la div panier et de celle de son contenu
const basketContainer = document.getElementById("basket");
const basketContent = document.getElementById("basket-content");

// Cas où le panier est vide
if (productInLocalStorage === null) {
  basketContainer.innerHTML = `
    <div class="empty-basket">
        <h2 class="empty-basket-title"><i class="fas fa-exclamation-triangle"></i> Oups, votre panier est vide <i class="fas fa-exclamation-triangle"></i></h2>
        <p class="empty-basket-text">Pour continuer vos achats, retournez à l'accueil et trouvez le Teddy qui vous correspond</p>
        <button class="empty-basket-btn"><a href="../index.html">Retour à l'accueil</a></button>
    </div>
  `;

  // Cas où le panier n'est pas vide
} else {
  let structureBasket = [];

  for (i = 0; i < productInLocalStorage.length; i++) {
    structureBasket =
      structureBasket +
      `
        <div class="panier-content-content">
            <span class="panier-content-suppr-smartphone"><i class="fas fa-times"></i></span>
            <img src="${productInLocalStorage[i].image}" alt="Photo de ${productInLocalStorage[i].image}" class="panier-content-image">
            <div class="panier-content-product">
                <h4 class="panier-content-product-title">${productInLocalStorage[i].name}</h4>
                <p class="panier-content-product-description">${productInLocalStorage[i].description}</p>
                <p class="panier-content-product-color">Couleur : ${productInLocalStorage[i].color}</p>
                <p class="panier-content-product-quantity">Quantité : ${productInLocalStorage[i].quantity}</p>
                <p class="panier-content-product-price">${productInLocalStorage[i].price} €</p>
            </div>
            <span class="panier-content-suppr"><i class="fas fa-times"></i></span>
        </div>
    `;

    basketContent.innerHTML = structureBasket;
  }
}

//--------------------- Suppression des produits ---------------------------

// Récupération des boutons supprimer
const supprBtn = document.querySelectorAll(".panier-content-suppr");
const supprBtnSmartphone = document.querySelectorAll(
  ".panier-content-suppr-smartphone"
);

// Fonction de suppression d'un article (bug)
const supprProduct = () => {
  let supprIdSelected = productInLocalStorage[i].id;
  console.log(supprIdSelected);
};

// Boucles événement pour supprimer un article (bug)
for (i = 0; i < supprBtn.length; i++) {
  supprBtn[i].addEventListener("click", supprProduct);
}

for (i = 0; i < supprBtnSmartphone.length; i++) {
  supprBtnSmartphone[i].addEventListener("click", supprProduct);
}


// Récupération du bouton pour supprimer tous les articles
const supprAllBasket = document.getElementById("panier-suppr-all");

// Evénement click pour vider le local storage (et donc le panier)
if (supprAllBasket) {
  supprAllBasket.addEventListener("click", () => {
    localStorage.removeItem("product");

    //Ajout d'un pop-up pour confirmer que le panier a été vidé
    document.getElementById("popup-panier").style.top = "0px";
  });
}
