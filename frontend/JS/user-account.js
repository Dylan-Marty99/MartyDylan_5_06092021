// Variables
const form = document.querySelector("form");
const inputs = document.querySelectorAll(
  `input[type="text"], input[type="password"]`
);
const progressBar = document.getElementById("password-progress-bar");
let lastFirstName, mail, password, confirmPassword;

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

// Fonction validité nom
const lastFirstNameChecker = (value) => {
  if (value.length > 0 && (value.length < 3 || value.length > 20)) {
    errorDisplay("last-first-name", "Votre nom doit faire entre 3 et 20 caractères");
    lastFirstName = null;
  } else if (!value.match(/^[a-zA-Z0-9 _-]*$/)) {
    errorDisplay(
      "last-first-name",
      "Votre nom est invalide"
    );
    lastFirstName = null;
  } else {
    errorDisplay("last-first-name", "", true);
    lastFirstName = value;
  }

  console.log(("Test n°2: Si les nom et prénom sont invalides, la valeur est nulle sinon elle correspond à ce qu'écrit le client"));
  console.log(lastFirstName);
};

// Fonction validité email
const emailChecker = (value) => {
  if (!value.match(/^[\w_-]+@[\w-]+\.[a-z]{2,4}$/i)) {
    errorDisplay("mail", "Cet email n'est pas valide");
    mail = null;
  } else {
    errorDisplay("mail", "", true);
    mail = value;
  }

  console.log(("Test n°3: Si le mail est invalide, la valeur est nulle sinon elle correspond à ce qu'écrit le client"));
  console.log(mail);
};

// Fonction validité mot de passe
const passwordChecker = (value) => {
  progressBar.classList = "";

  if (
    !value.match(
      /^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,}$/
    )
  ) {
    errorDisplay(
      "password",
      "Le mot de passe doit contenir au minimum 8 caractères, une majuscule, un chiffre et un caractère spécial"
    );
    progressBar.classList.add("progressRed");
    password = null;
  } else if (value.length < 12) {
    errorDisplay("password", "", true);
    progressBar.classList.add("progressBlue");
    password = value;
  } else {
    errorDisplay("password", "", true);
    progressBar.classList.add("progressGreen");
    password = value;
  }
  if (confirmPassword) confirmPasswordChecker(confirmPassword);

  console.log(("Test n°4: Si le mot de passe est invalide, la valeur est nulle sinon elle correspond à ce qu'écrit le client"));
  console.log(password);
};

// Fonction validité confirmation mot de passe
const confirmPasswordChecker = (value) => {
  if (value !== password) {
    errorDisplay("confirm-password", "Les mots de passe ne correspondent pas");
    confirmPassword = null;
  } else {
    errorDisplay("confirm-password", "", true);
    confirmPassword = true;
  }

  console.log(("Test n°5: Si la confirmation du mot de passe est invalide, la valeur est nulle sinon elle correspond à ce qu'écrit le client"));
  console.log(confirmPassword);
};

// ForEach conserver la valeur des inputs
inputs.forEach((input) => {
  input.addEventListener("input", (e) => {
    switch (e.target.id) {
      case "last-first-name":
        lastFirstNameChecker(e.target.value);
        break;
      case "mail":
        emailChecker(e.target.value);
        break;
      case "password":
        passwordChecker(e.target.value);
        break;
      case "confirm-password":
        confirmPasswordChecker(e.target.value);
        break;
      default:
        null;
    }
  });
});

// Fonction validité formulaire
form.addEventListener("submit", (e) => {
  e.preventDefault();

  if (lastFirstName && mail && password && confirmPassword) {
    const data = {
      lastFirstName,
      mail,
      password,
    };

    console.log("Test n°6: Récupération des valeurs des inputs");
    console.log(data);

    inputs.forEach((input) => (input.value = ""));
    progressBar.classList = "";
    errorDisplay("password", "", true);

    lastFirstName = null;
    mail = null;
    password = null;
    confirmPassword = null;

    alert("Inscription validée !");

    window.location.href = "../index.html"
  } else {
    alert("Veuillez remplir correctement tout les champs");
  }
});
