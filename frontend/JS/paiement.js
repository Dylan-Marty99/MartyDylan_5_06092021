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
};

// Fonction validité prenom
const firstNameChecker = (value) => {
  if (value.length > 0 && (value.length < 2 || value.length > 30)) {
    errorDisplay("firstName", "Prénom invalide");
    firstName = null;
  } else if (!value.match(/^[a-zA-Z,.'-]+$/)) {
    errorDisplay("firstName", "Prénom invalide");
    firstName = null;
  } else {
    errorDisplay("firstName", "", true);
    firstName = value;
  }
};

// Fonction validité nom
const lastNameChecker = (value) => {
  if (value.length > 0 && (value.length < 2 || value.length > 30)) {
    errorDisplay("lastName", "Nom invalide");
    lastName = null;
  } else if (!value.match(/^[a-zA-Z,.'-]+$/)) {
    errorDisplay("lastName", "Nom invalide");
    lastName = null;
  } else {
    errorDisplay("lastName", "", true);
    lastName = value;
  }
};

// Fonction validité adresse
const addressChecker = (value) => {
  if (value.length > 0 && value.length < 3) {
    errorDisplay("address", "Adresse invalide");
    address = null;
  } else if (!value.match(/^[a-zA-Z0-9 _-]*$/)) {
    errorDisplay("address", "Adresse invalide");
    address = null;
  } else {
    errorDisplay("address", "", true);
    address = value;
  }
};

// Fonction validité ville
const cityChecker = (value) => {
  if (value.length > 0 && value.length < 3) {
    errorDisplay("city", "Ville invalide");
    city = null;
  } else if (!value.match(/^[a-zA-Z0-9 _-]*$/)) {
    errorDisplay("city", "Ville invalide");
    city = null;
  } else {
    errorDisplay("city", "", true);
    city = value;
  }
};

// Fonction validité mail
const mailChecker = (value) => {
  if (!value.match(/^[\w_-]+@[\w-]+\.[a-z]{2,4}$/i)) {
    errorDisplay("email", "Email invalide");
    email = null;
  } else {
    errorDisplay("email", "", true);
    email = value;
  }
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

    alert("Coordonnées validées");
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

//----------------- Ajout des prix de livraison sur la page et dans le local storage ----------------
// Variables inputs et prix de la livraison
const standardDelivery = document.getElementById("standart");
const expressDelivery = document.getElementById("express");
const deliveryPrice = document.getElementById("delivery-price");
const totalOrder = document.getElementById("total-order-price");

// Ajout du prix du panier tant que la livrasion n'est pas choisit
totalOrder.textContent = `${totalProductsInLocalStorage} €`;

// Evénements click pour ajout le prix de la livraison
standardDelivery.addEventListener("click", () => {
  const standartDeliveryPrice = 2.99;
  deliveryPrice.textContent = `${standartDeliveryPrice} €`;

  const calculationTotalOrder =
    Number(totalProductsInLocalStorage) + Number(standartDeliveryPrice);
  totalOrder.textContent = `${calculationTotalOrder} €`;
});

expressDelivery.addEventListener("click", () => {
  const expressDeliveryPrice = 7.99;
  deliveryPrice.textContent = `${expressDeliveryPrice} €`;

  const calculationTotalOrder =
  Number(totalProductsInLocalStorage) + Number(expressDeliveryPrice);
  totalOrder.textContent = `${calculationTotalOrder} €`;
});

//------------------------ Gestion et envoi des données du formulaire --------------------------------
let productsInLocalStorage = JSON.parse(localStorage.getItem("products"));

// Objet contenant les données à envoyer au serveur
const customerData = {
  contact: dataLocalStorage,
  products: productsInLocalStorage,
};

console.log(customerData);

//------------------ Bug fonction d'envoi des données ------------
const sendCustomerData = () => {
  fetch("http://localhost:3000/api/teddies/order", {
    method: "POST",
    body: JSON.stringify(customerData),
    headers: {
      "content-type": "application/json",
    },
  }).then(function (response) {
    return response.json();
  });
};
//------------------ Bug fonction d'envoi des données ------------

// Evénement click pour envoyer les données et passer à la page de confirmation
const validationBtn = document.getElementById("validation-btn");

validationBtn.addEventListener("click", () => {
  sendCustomerData();
  // window.location.href = "./confirmation.html";
});
