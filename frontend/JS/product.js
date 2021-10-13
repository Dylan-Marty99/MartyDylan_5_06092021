// Extraction de l'ID
const queryStringUrlId = window.location.search;
const urlSearchParams = new URLSearchParams(queryStringUrlId);
const getId = urlSearchParams.get("_id");

console.log("Test n°1: Récupération de l'id dans l'URL");
console.log(getId);

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

  console.log("Test n°2: Récupération des données du Teddy");
  console.log(selectedTeddy);

  // Ajout de l'image
  teddyImage = document.getElementById("product-bear-image");

  teddyImage.setAttribute("src", `${selectedTeddy.imageUrl}`);
  teddyImage.setAttribute("alt", `Photo de ${selectedTeddy.name}`)

  // Ajout du nom
  const teddyName = (document.getElementById(
    "product-name"
  ).textContent = `${selectedTeddy.name}`);

  // Ajout de la description
  const teddyDescripton = (document.getElementById(
    "product-description"
  ).textContent = `${selectedTeddy.description}`);

  console.log(
    "Test n°3: Récupération du nom et de la description et injection dans le code HTML"
  );
  console.log(teddyName);
  console.log(teddyDescripton);

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

  console.log(
    "Test n°4: Récupération des couleurs et injection dans le code HTML"
  );
  console.log(structureOptions);

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
  document.querySelector(
    "title"
  ).textContent = `Teddy ${selectedTeddy.name} - OriBears`;
};

selectedProduct();

//---------- Récupération des données pour le panier ----------------

const dataBasket = async () => {
  // Récupération de l'API
  const getTeddies = await fetchTeddies();
  const selectedTeddy = getTeddies.find((element) => element._id === getId);

  //Récupération de l'input couleur et du boutton
  const btnAddToBasket = document.getElementById("product-btn");

  // Evénement click pour l'envoie du produit au panier
  btnAddToBasket.addEventListener("click", (e) => {
    e.preventDefault();

    const colorsChoice = document.getElementById("product-color").value;
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

    console.log(
      "Test n°5: Objet contenant les données sur le Teddy et qui va être envoyé dans le local storage"
    );
    console.log(productOptions);

    let products = selectedTeddy._id;

    // Ajout d'un pop-up pour confirmer que l'article est bien dans le panier
    document.getElementById("popup-product").style.top = "0px";

    //--------Stocker les données choisis dans le local storage---------------
    let productInLocalStorage = JSON.parse(localStorage.getItem("product"));
    let productsInLocalStorage = JSON.parse(localStorage.getItem("products"));

    // Si un produit est présent dans le local storage
    if (productInLocalStorage) {
      var newProduct = 0;

      //------------- Gestion des quantités --------
      for (x in productInLocalStorage) {
        let productAlreadyChosen = productInLocalStorage[x];

        let nb1 = parseInt(productOptions.quantity);
        let nb2 = parseInt(productAlreadyChosen.quantity);
        let nb3 = parseInt(nb1 + nb2);

        console.log(
          "Test n°6: Addition de la quantité d'un produit choisit s'il existe déjà dans le panier"
        );
        console.log(nb1);
        console.log(nb2);
        console.log(nb3);

        // Gestion des quantités en focntion de l'id et de la couleur
        if (
          productAlreadyChosen.id == selectedTeddy._id &&
          productAlreadyChosen.color == colorsChoice
        ) {
          productInLocalStorage[x].quantity = nb3;
          newProduct++;
        }
      }
      if (newProduct == 0) {
        productInLocalStorage.push(productOptions);
        productsInLocalStorage.push(products);
      }

      localStorage.setItem("product", JSON.stringify(productInLocalStorage));
      localStorage.setItem("products", JSON.stringify(productsInLocalStorage));

      console.log(
        "Test n°7-2: Envoi des données du Teddy dans le local storage"
      );
      console.log(productInLocalStorage);
      console.log(productsInLocalStorage);

      // Si aucun produit n'est présent dans le local storage
    } else {
      productInLocalStorage = [];
      productsInLocalStorage = [];

      productInLocalStorage.push(productOptions);
      productsInLocalStorage.push(products);

      localStorage.setItem("product", JSON.stringify(productInLocalStorage));
      localStorage.setItem("products", JSON.stringify(productsInLocalStorage));

      console.log(
        "Test n°7-1: Envoi des données du Teddy dans le local storage"
      );
      console.log(productInLocalStorage);
      console.log(productsInLocalStorage);
    }
  });
};

dataBasket();

//---- Pop-up lorsqu'un Teddy est acheté -----
document.getElementById("popup-continuer-achat").addEventListener("click", () => {
  window.location.href= "../index.html"
})

document.getElementById("popup-consulter-panier").addEventListener("click", () => {
  window.location.href= "./panier.html"
})
