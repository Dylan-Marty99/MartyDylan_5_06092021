const allProducts = document.querySelector(".all-bears");

let teddys;

const fetchTeddys = async () => {
  teddys = await fetch("http://localhost:3000/api/teddies").then((res) =>
    res.json()
  );
};

const showTeddys = async () => {
  await fetchTeddys();

  allProducts.innerHTML = (teddys.map(teddy => (

    `
        
            <div class="bear">
                <a href="./frontend/product.html" class="bear-image-container"><img src="${teddy.imageUrl}" alt="Photo du Teddy ${teddy.name}" class="bear-image-image"></a>
                <a href="./frontend/product.html"><h3 class="bear-title">${teddy.name}</h3></a>
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

  )).join(""))
};

showTeddys();