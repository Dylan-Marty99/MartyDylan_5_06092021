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
  console.log(selectedTeddy);

  document
    .getElementById("product-bear-image")
    .setAttribute("src", `${selectedTeddy.imageUrl}`);

  document.getElementById("product-name").textContent = `${selectedTeddy.name}`;
  document.getElementById("product-descriptiob").textContent = `${selectedTeddy.description}`
};

selectedProduct();
