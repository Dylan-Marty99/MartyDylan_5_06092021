// Extraction de l'ID
const getId = () => {
  return location.search.slice(1);
};

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

const hydrateProduct = (getTeddies) => {};

// Fonction auto invoquée
(async function () {
  const getTeddies = await fetchTeddies();
  console.log(getTeddies);
  hydrateProduct(getTeddies);
})();

// Tentative de récupération des données du bon produit sélectionné avec l'id
const selectionedProductId = getTeddies.find(
  (element) => element._id === getId()
);
