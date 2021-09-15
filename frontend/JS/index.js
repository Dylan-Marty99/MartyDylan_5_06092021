// Variables
const allProducts = document.querySelector(".all-bears");
let teddies;


// Fonction de récupération de l'API
const fetchTeddies = async () => {
  teddies = await fetch("http://localhost:3000/api/teddies").then((res) =>
    res.json()
  );
};


// Fonction de création des différents Teddys
const showTeddies = async () => {
  await fetchTeddies();

  allProducts.innerHTML = teddies
    .map(
      (teddy) =>
        `
        
            <div class="bear">
                <a href="./frontend/product.html?${teddy._id}" class="bear-image-container"><img src="${teddy.imageUrl}" alt="Photo du Teddy ${teddy.name}" class="bear-image-image"></a>
                <a href="./frontend/product.html?${teddy._id}"><h3 class="bear-title">${teddy.name}</h3></a>
                <p class="bear-description">${teddy.description}</p>
                <div class="baer-star">
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                </div>
                <button class="bear-wish-btn">Ajouter à la liste d'envie</button>
            </div>
        
    
    `
    )
    .join("");
};

showTeddies();