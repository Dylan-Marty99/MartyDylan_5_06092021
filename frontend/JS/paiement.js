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
let firstName, lastName, address, city, mail;

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
    errorDisplay("mail", "Email invalide");
    mail = null;
  } else {
    errorDisplay("mail", "", true);
    mail = value;
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
      case "mail":
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

  if (firstName && lastName && address && city && mail) {
    const data = {
      firstName,
      lastName,
      address,
      city,
      mail,
    };

    // Stocker les coordonnées du client dans le local storage
    localStorage.setItem("coordonnées", JSON.stringify(data));

    alert("Coordonnées validées");
  }
});

//--------- Remplir le formulaire avec les coordonnées présente dans le local storage -----------

// Récupérer les coordonnées dans le local storage et les convertir en objet
const dataLocalStorage = localStorage.getItem("coordonnées");
const dataLocalStorageObject = JSON.parse(dataLocalStorage);

// Fonction de remplissage du formulaire avec le local storage
function fillFormInputs(input) {
  document.getElementById(`${input}`).value = dataLocalStorageObject[input];
}

// Appel de la fonction pour chaque input
fillFormInputs("firstName");
fillFormInputs("lastName");
fillFormInputs("address");
fillFormInputs("city");
fillFormInputs("mail");