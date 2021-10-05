// Extraction de l'ID
const queryStringUrlId = window.location.search;
const urlSearchParams = new URLSearchParams(queryStringUrlId);
const getId = urlSearchParams.get("_id");

// Fonction de récupération de l'API
const fetchTeddies = () => {
  return fetch("http://localhost:3000/api/teddies")
    .then((res) => {
      return res.json();
    })
    .then((article) => {
      return article;
    })
    .catch((error) => {
      alert(error);
    });
};

// Fonction de récupération et d'injection des données de chaque produits
const selectedProduct = async () => {
  const getTeddies = await fetchTeddies();
  const selectedTeddy = getTeddies.find((element) => element._id === getId);

  // Ajout de l'image
  document
    .getElementById("product-bear-image")
    .setAttribute("src", `${selectedTeddy.imageUrl}`);

  // Ajout du nom
  document.getElementById("product-name").textContent = `${selectedTeddy.name}`;

  // Ajout de la description
  document.getElementById(
    "product-descriptiob"
  ).textContent = `${selectedTeddy.description}`;

  // Ajout des options de couleurs
  const optionColor = selectedTeddy.colors;
  let structureOptions = [];

  for (i = 0; i < optionColor.length; i++) {
    structureOptions =
      structureOptions +
      `
      <option value="${optionColor[i]}">${optionColor[i]}</option>
    `;
  }

  const options = document.getElementById("product-color");
  options.innerHTML = structureOptions;

  // Ajout du prix
  document.getElementById("product-price").textContent = `${
    selectedTeddy.price / 100
  } €`;

  // Ajout des éléments de description détaillé
  document.getElementById("product-infos").innerHTML = ` 
      <h2 class="product-caracteristic-title">Caractéristiques techniques</h2>
      <p class="product-caracteristic-text">Dimensions : ${selectedTeddy.description}</p>
      <p class="product-caracteristic-text">Poids : ${selectedTeddy.description}</p>       
      <p class="product-caracteristic-text">Composition : ${selectedTeddy.description}</p>
      <p class="product-caracteristic-text">Entretien : ${selectedTeddy.description}</p>
      `;

  // Ajout d'une meta description
  document
    .querySelector('meta[name="description"]')
    .setAttribute(
      "content",
      `Retrouvez ${selectedTeddy.name} au doux prix de ${
        selectedTeddy.price / 100
      } € dans la ou les couleurs ${optionColor}. Alors n'attendez plus et trouvez votre Teddy !`
    );

  // Ajout du title
  document.querySelector("title").textContent = `Teddy ${selectedTeddy.name} - OriBears`

};

selectedProduct();

//---------- Récupération des données pour le panier ----------------

const dataBasket = async () => {
  // Récupération de l'API
  const getTeddies = await fetchTeddies();
  const selectedTeddy = getTeddies.find((element) => element._id === getId);

  //Récupération de l'input couleur et du boutton
  const idOptions = document.getElementById("product-color");
  const btnAddToBasket = document.getElementById("product-btn");

  // Evénement click pour l'envoie du produit au panier
  btnAddToBasket.addEventListener("click", (e) => {
    e.preventDefault();

    const colorsChoice = idOptions.value;
    const quantityChoice = document.getElementById("product-number").value;

    let productOptions = {
      image: selectedTeddy.imageUrl,
      name: selectedTeddy.name,
      id: selectedTeddy._id,
      description: selectedTeddy.description,
      color: colorsChoice,
      quantity: quantityChoice,
      price: selectedTeddy.price / 100,
    };

    let products = selectedTeddy._id;

    // Ajout d'un pop-up pour confirmer que l'article est bien dans le panier
    document.getElementById("popup-product").style.top = "0px";

    //--------Stocker les données choisis dans le local storage---------------
    let productInLocalStorage = JSON.parse(localStorage.getItem("product"));
    let productsInLocalStorage = JSON.parse(localStorage.getItem("products"));

    // Si un produit est présent dans le local storage
    if (productInLocalStorage) {
      productInLocalStorage.push(productOptions);
      productsInLocalStorage.push(products);

      localStorage.setItem("product", JSON.stringify(productInLocalStorage));
      localStorage.setItem("products", JSON.stringify(productsInLocalStorage));
      console.log(productInLocalStorage);

      // Si aucun produit n'est présent dans le local storage
    } else {
      productInLocalStorage = [];
      productsInLocalStorage = [];

      productInLocalStorage.push(productOptions);
      productsInLocalStorage.push(products);

      localStorage.setItem("product", JSON.stringify(productInLocalStorage));
      localStorage.setItem("products", JSON.stringify(productsInLocalStorage));
      console.log(productInLocalStorage);
    }
  });
};

dataBasket();
