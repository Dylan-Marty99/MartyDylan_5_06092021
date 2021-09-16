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
    errorDisplay("first-name", "Prénom invalide");
    firstName = null;
  } else if (!value.match(/^[a-zA-Z,.'-]+$/)) {
    errorDisplay("first-name", "Prénom invalide");
    firstName = null;
  } else {
    errorDisplay("first-name", "", true);
    firstName = value;
  }
};

// Fonction validité nom
const lastNameChecker = (value) => {
  if (value.length > 0 && (value.length < 2 || value.length > 30)) {
    errorDisplay("last-name", "Nom invalide");
    lastName = null;
  } else if (!value.match(/^[a-zA-Z,.'-]+$/)) {
    errorDisplay("last-name", "Nom invalide");
    lastName = null;
  } else {
    errorDisplay("last-name", "", true);
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
      case "first-name":
        firstNameChecker(e.target.value);
        break;
      case "last-name":
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
    console.log(data);
    alert("Coordonnées validées");
  } else {
    alert("Veuillez remplir correctement tout les champs");
  }
});
