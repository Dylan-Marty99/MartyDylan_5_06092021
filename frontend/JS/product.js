// Variables
const queryStringUrlId = window.location.search;
let teddies;

// Extraction de l'ID uniquement
const justId = queryStringUrlId.slice(1);

console.log(justId);


// Tentative de récupération des données du bon produit sélectionné avec l'id

// fetch("http://localhost:3000/api/teddies")
//   .then((res) => res.json())
//   .then((data) => {
//     let selectionedProductId = data.find((element) => element._id === justId);
//   });
// console.log(selectionedProductId);
