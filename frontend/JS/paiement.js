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

  console.log("Test n°15: Sélection du bon input et du bon span lorsque le client saisit ses coordonées");
  console.log(container);
  console.log(span);
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
  if (!value.match(/^[\w._-]+@[\w-]+\.[a-z]{2,4}$/i)) {
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

    //---------------------------- Gestion et envoi des données du formulaire ------------------------------------

    // Récupérer les coordonnées dans le local storage et les convertir en objet
    const dataLocalStorage = localStorage.getItem("contact");
    const dataLocalStorageObject = JSON.parse(dataLocalStorage);

    // Objet contenant les données à envoyer au serveur
    const customerData = {
      contact: dataLocalStorageObject,
      products: productsInLocalStorage,
    };

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
        console.log("Contenu de la réponse du serveur");
        console.log(custumorDataContent);

        if (response.ok) {
          console.log(`Résultat de response.ok : ${response.ok}`);

          console.log("id réponse");
          console.log(custumorDataContent.orderId);

          localStorage.setItem("orderId", custumorDataContent.orderId);
        } else {
          alert(`Problème avce le serveur : Erreur ${response.status}`);
        }
      } catch (e) {
        console.log("Erreur venant du cathc()");
        console.log(e);
        alert(`Erreur venant du catch() ${e}`);
      }
    });
    // window.location.reload();    ------------- Laisser ou non ? -------------
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

  // Données à envoyer dans le local storage
  const dataStandartDelivery = {
    mode: "standart",
    price: standartDeliveryPrice,
  };

  // Envoi des données
  if (dataDeliveryPrice) {
    dataDeliveryPrice.shift();
    dataDeliveryPrice.push(dataStandartDelivery);
    localStorage.setItem("livraison", JSON.stringify(dataDeliveryPrice));
  } else {
    dataDeliveryPrice = [];
    dataDeliveryPrice.push(dataStandartDelivery);
    localStorage.setItem("livraison", JSON.stringify(dataDeliveryPrice));
  }
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
  if (dataDeliveryPrice) {
    window.location.href = "./confirmation.html";
  } else {
    alert("Veuillez choisir un mode de livraison");
  }
});
