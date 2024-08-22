const productsData = {
    "catID": 101,
    "catName": "Autos",
    "products": [
      {
        "id": 50921,
        "name": "Chevrolet Onix Joy",
        "description": "Generación 2019, variedad de colores. Motor 1.0, ideal para ciudad.",
        "cost": 13500,
        "currency": "USD",
        "soldCount": 14,
        "image": "img/prod50921_1.jpg"
      },
      {
        "id": 50922,
        "name": "Fiat Way",
        "description": "La versión de Fiat que brinda confort y a un precio accesible.",
        "cost": 14500,
        "currency": "USD",
        "soldCount": 52,
        "image": "img/prod50922_1.jpg"
      },
      {
        "id": 50923,
        "name": "Suzuki Celerio",
        "description": "Un auto que se ha ganado la buena fama por su economía con el combustible.",
        "cost": 12500,
        "currency": "USD",
        "soldCount": 25,
        "image": "img/prod50923_1.jpg"
      },
      {
        "id": 50924,
        "name": "Peugeot 208",
        "description": "El modelo de auto que se sigue renovando y manteniendo su prestigio en comodidad.",
        "cost": 15200,
        "currency": "USD",
        "soldCount": 17,
        "image": "img/prod50924_1.jpg"
      },
      {
        "id": 50925,
        "name": "Bugatti Chiron",
        "description": "El mejor hiperdeportivo de mundo. Producción limitada a 500 unidades.",
        "cost": 3500000,
        "currency": "USD",
        "soldCount": 0,
        "image": "img/prod50925_1.jpg"
      }
    ]
  };
  function renderProducts(products) {
    const productList = document.getElementById('product-list');
    productList.innerHTML = ''; 
  
    products.forEach(product => {
      const productHTML = `
        <div class="col-lg-4 col-md-6 mb-4">
          <div class="card h-100">
            <img class="card-img-top" src="${product.image}" alt="Imagen del ${product.name}">
            <div class="card-body">
              <h4 class="card-title">${product.name}</h4>
              <p class="card-text">${product.description}</p>
              <h5>${product.currency} ${product.cost}</h5>
              <p class="card-text">Vendidos: ${product.soldCount}</p>
            </div>
          </div>
        </div>
      `;
      productList.innerHTML += productHTML;
    });
  }
  
  document.addEventListener('DOMContentLoaded', () => {
    renderProducts(productsData.products);
  });
  