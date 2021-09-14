const form = document.querySelector("form");
const inputs = document.querySelectorAll(
  `input[type="text"], input[type="password"]`
);
const progressBar = document.getElementById("password-progress-bar");
let name, email, password, confirmPassword;

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

const nameChecker = (value) => {
  if (value.length > 0 && (value.length < 3 || value.length > 20)) {
    errorDisplay("name", "Votre nom doit faire entre 3 et 20 caractères");
    name = null;
  } else if (!value.match(/^[a-zA-Z0-9_.-]*$/)) {
    errorDisplay(
      "name",
      "Votre nom ne peut pas contenir de caractères spéciaux"
    );
    name = null;
  } else {
    errorDisplay("name", "", true);
    name = value;
  }
};

const emailChecker = (value) => {
  if (!value.match(/^[\w_-]+@[\w-]+\.[a-z]{2,4}$/i)) {
    errorDisplay("email", "Cet email n'est pas valide");
    email = null;
  } else {
    errorDisplay("email", "", true);
    email = value;
  }
};

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
};

const confirmPasswordChecker = (value) => {
  if (value !== password) {
    errorDisplay("confirm-password", "Les mots de passe ne correspondent pas");
    confirmPassword = null;
  } else {
    errorDisplay("confirm-password", "", true);
    confirmPassword = true;
  }
};

inputs.forEach((input) => {
  input.addEventListener("input", (e) => {
    switch (e.target.id) {
      case "name":
        nameChecker(e.target.value);
        break;
      case "email":
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

form.addEventListener("submit", (e) => {
  e.preventDefault();

  if (name && email && password && confirmPassword) {
    const data = {
      name,
      email,
      password,
    };
    console.log(data);

    inputs.forEach((input) => (input.value = ""));
    progressBar.classList = "";
    errorDisplay("password", "", true);

    name = null;
    email = null;
    password = null;
    confirmPassword = null;
    alert("Inscription validée !");
  } else {
    alert("Veuillez remplir correctement tout les champs");
  }
});
