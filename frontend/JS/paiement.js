// Evénement load pour différencier les icones et textes du header en fonction de la page
const cartIcon = document.querySelector(".fa-shopping-cart");
const truckIcon = document.querySelector(".fa-truck");
const cartIconText = document.querySelector(".header-panier-text");
const truckIconText = document.querySelector(".header-livraison-text");

window.addEventListener("load", () => {
  cartIcon.style.color = "lightgrey";
  cartIconText.style.color = "lightgrey";
  truckIcon.style.color = "white";
  truckIconText.style.color = "white";
});

// ---------- Formulaire -----------------------

// Variables
const form = document.querySelector(".formulaire-container");
const inputs = document.querySelectorAll(".formulaire-container-input");
let firstName, lastName, address, city, email;

let productsInLocalStorage = JSON.parse(localStorage.getItem("products"));

// Fonction des messages d'erreur
const errorDisplay = (tag, message, valid) => {
  const container = document.querySelector("." + tag + "-container");
  const span = document.querySelector("." + tag + "-container > span");

  if (!valid) {
    container.classList.add("error");
    span.textContent = message;
  } else {
    container.classList.remove("error");
    span.textContent = message;
  }

  console.log("Test n°1: Sélection du bon input et du bon span lorsque le client saisit ses coordonées");
  console.log(container);
  console.log(span);
};

// Fonction validité prenom
const firstNameChecker = (value) => {
  if (value.length > 0 && (value.length < 2 || value.length > 30 || !value.match(/^[a-zA-Zéèç.'-]+$/))) {
    errorDisplay("firstName", "Prénom invalide");
    firstName = null;

  } else {
    errorDisplay("firstName", "", true);
    firstName = value;
  }
  console.log(("Test n°2: Si le prénom est invalide, la valeur est nulle sinon elle correspond à ce qu'écrit le client"));
  console.log(firstName);
};

// Fonction validité nom
const lastNameChecker = (value) => {
  if (value.length > 0 && (value.length < 2 || value.length > 30 || !value.match(/^[a-zA-Zéèç.'-]+$/))) {
    errorDisplay("lastName", "Nom invalide");
    lastName = null;
  
  } else {
    errorDisplay("lastName", "", true);
    lastName = value;
  }

  console.log(("Test n°3: Si le nom est invalide, la valeur est nulle sinon elle correspond à ce qu'écrit le client"));
  console.log(lastName);
};

// Fonction validité adresse
const addressChecker = (value) => {
  if (value.length > 0 && (value.length < 3 || !value.match(/^[a-zA-Z0-9é _-]*$/))) {
    errorDisplay("address", "Adresse invalide");
    address = null;

  } else {
    errorDisplay("address", "", true);
    address = value;
  }

  console.log(("Test n°4: Si l'adresse est invalide, la valeur est nulle sinon elle correspond à ce qu'écrit le client"));
  console.log(address);
};

// Fonction validité ville
const cityChecker = (value) => {
  if (value.length > 0 && (value.length < 3 || !value.match(/^[a-zA-Z0-9 _-]*$/))) {
    errorDisplay("city", "Ville invalide");
    city = null;

  } else {
    errorDisplay("city", "", true);
    city = value;
  }

  console.log(("Test n°5: Si la ville est invalide, la valeur est nulle sinon elle correspond à ce qu'écrit le client"));
  console.log(city);
};

// Fonction validité mail
const mailChecker = (value) => {
  if (!value.match(/^[\w._-]+@[\w-]+\.[a-z]{2,4}$/i)) {
    errorDisplay("email", "Email invalide");
    email = null;

  } else {
    errorDisplay("email", "", true);
    email = value;
  }

  console.log(("Test n°6: Si l'email est invalide, la valeur est nulle sinon elle correspond à ce qu'écrit le client"));
  console.log(email);
};

// ForEach conserver la valeur des inputs
inputs.forEach((input) => {
  input.addEventListener("input", (e) => {
    switch (e.target.id) {
      case "firstName":
        firstNameChecker(e.target.value);
        break;
      case "lastName":
        lastNameChecker(e.target.value);
        break;
      case "address":
        addressChecker(e.target.value);
        break;
      case "city":
        cityChecker(e.target.value);
        break;
      case "email":
        mailChecker(e.target.value);
        break;
      default:
        null;
    }
  });
});

// Fonction validité formulaire
form.addEventListener("submit", (e) => {
  e.preventDefault();

  if (firstName && lastName && address && city && email) {
    const data = {
      firstName,
      lastName,
      address,
      city,
      email,
    };

    // Stocker les coordonnées du client dans le local storage
    localStorage.setItem("contact", JSON.stringify(data));

    console.log("Test n°7: Récupération des valeurs des inputs et stockage dans le local storage");
    console.log(data);

    //---------------------------- Gestion et envoi des données du formulaire ------------------------------------

    // Objet contenant les données à envoyer au serveur
    const customerData = {
      contact: data,
      products: productsInLocalStorage,
    };

    console.log("Test n°8: Objet qui va être envoyé au serveur");
    console.log(customerData);

    //------- Envoi des données et récupération de l'order id -------
    fetch("http://localhost:3000/api/teddies/order", {
      method: "POST",
      body: JSON.stringify(customerData),
      headers: {
        "Content-Type": "application/json",
      },
    }).then(async (response) => {
      //------- Gestion des erreurs ----------
      try {
        const custumorDataContent = await response.json();

        if (response.ok) {
          console.log("Test n°9: Contenu de la réponse du serveur contenant l'orderId");
          console.log(custumorDataContent);

          localStorage.setItem("orderId", custumorDataContent.orderId);

          alert("Coordonnées validées");

          window.location.reload();  

        } else {
          alert(`Problème avce le serveur : Erreur ${response.status}`);
        }
      } catch (e) {
        console.log("Erreur venant du cathc()");
        console.log(e);
        alert(`Erreur venant du catch() ${e}`);
      }
    });  
  } else if (!dataLocalStorageObject) {
    alert("Veuillez remplir correctement le formulaire");
  }
});

//--------- Remplir le formulaire avec les coordonnées présente dans le local storage -----------
// Récupérer les coordonnées dans le local storage et les convertir en objet
const dataLocalStorage = localStorage.getItem("contact");
const dataLocalStorageObject = JSON.parse(dataLocalStorage);

// Fonction de remplissage du formulaire avec le local storage
function fillFormInputs(input) {
  if (dataLocalStorageObject) {
    document.getElementById(`${input}`).value = dataLocalStorageObject[input];

    console.log("Test n°10: Contenu de chaque input, qui va ensuite être écrit automatiquement dans l'input correspondant");
    console.log(dataLocalStorageObject[input]);
  }
}

// Appel de la fonction pour chaque input
fillFormInputs("firstName");
fillFormInputs("lastName");
fillFormInputs("address");
fillFormInputs("city");
fillFormInputs("email");

//------------ Ajout du prix total du panier depuis le local storge -------------
let totalProductsInLocalStorage = JSON.parse(localStorage.getItem("total"));

const totalBasketPrice = document.getElementById("total-basket-price");
totalBasketPrice.textContent = `${totalProductsInLocalStorage} €`;

console.log("Test n°11: Récupération du total dans le local storage et injection dans le code HTML");
console.log(totalBasketPrice);

//----------------- Ajout des prix de livraison sur la page et dans le local storage ----------------
// Variables inputs et prix de la livraison
const standardDelivery = document.getElementById("standart");
const expressDelivery = document.getElementById("express");
const deliveryPrice = document.getElementById("delivery-price");
const totalOrder = document.getElementById("total-order-price");
let dataDeliveryPrice = JSON.parse(localStorage.getItem("livraison"));

// Ajout du prix du panier tant que la livrasion n'est pas choisit
totalOrder.textContent = `${totalProductsInLocalStorage} €`;

//--------------- Evénement click pour ajouter le prix de la livraison standart ------------------------
standardDelivery.addEventListener("click", () => {
  const standartDeliveryPrice = 2.99;
  deliveryPrice.textContent = `${standartDeliveryPrice} €`;

  // Calcul et affichage du prix total
  const calculationTotalOrder =
    Number(totalProductsInLocalStorage) + Number(standartDeliveryPrice);
  totalOrder.textContent = `${calculationTotalOrder} €`;

  console.log("Test n°12: Injection du prix de livraison en HTML et ajout au prix du panier pour obtenir le prix total");
  console.log(standartDeliveryPrice);
  console.log(calculationTotalOrder);

  // Données à envoyer dans le local storage
  const dataStandartDelivery = {
    mode: "standart",
    price: standartDeliveryPrice,
  };

  // Envoi des données
  if (!dataDeliveryPrice) {
    dataDeliveryPrice = [];
    dataDeliveryPrice.push(dataStandartDelivery);
    localStorage.setItem("livraison", JSON.stringify(dataDeliveryPrice));

  } else {
    dataDeliveryPrice.shift();
    dataDeliveryPrice.push(dataStandartDelivery);
    localStorage.setItem("livraison", JSON.stringify(dataDeliveryPrice));
  }

  console.log("Test n°13: Récupération des données de l'input et envoi dans le local storage");
  console.log("Si une donnée de livraison est déjà présente, elle est supprimée et remplacée par la nouvelle sélectionnée");
  console.log(dataDeliveryPrice);
});

//--------------- Evénement click pour ajouter le prix de la livraison express ------------------------
expressDelivery.addEventListener("click", () => {
  const expressDeliveryPrice = 7.99;
  deliveryPrice.textContent = `${expressDeliveryPrice} €`;

  // Calcul et affichage du prix total
  const calculationTotalOrder =
    Number(totalProductsInLocalStorage) + Number(expressDeliveryPrice);
  totalOrder.textContent = `${calculationTotalOrder} €`;

  // Données à envoyer dans le local storage
  const dataExpressDelivery = {
    mode: "express",
    price: expressDeliveryPrice,
  };

  // Envoi des données
  if (dataDeliveryPrice) {
    dataDeliveryPrice.shift();
    dataDeliveryPrice.push(dataExpressDelivery);
    localStorage.setItem("livraison", JSON.stringify(dataDeliveryPrice));
  } else {
    dataDeliveryPrice = [];
    dataDeliveryPrice.push(dataExpressDelivery);
    localStorage.setItem("livraison", JSON.stringify(dataDeliveryPrice));
  }
});

// Evénement click pour passer à la page de confirmation
const validationBtn = document.getElementById("validation-btn");

validationBtn.addEventListener("click", () => {
  if (dataDeliveryPrice && dataLocalStorage) {
    window.location.href = "./confirmation.html";
  } else {
    alert("Veuillez choisir un mode de livraison ou remplir correctement le formulaire");
  }
});
