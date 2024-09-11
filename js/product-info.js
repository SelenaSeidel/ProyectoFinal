function renderProducts(products) {
    const productList = document.getElementById("carrousel");
    productList.innerHTML = ''; 
  
    products.forEach(product => {
        const productHTML = `
            <div class="swiper-slide">
                  <img src="${product.image}" alt="Imagen del ${product.name}">
                  <div class="swiper-slide-caption">
                      <h4>${product.name}</h4>
                      <p>${product.description}</p>
                      <h5>${product.currency} ${product.cost}</h5>
                      <p>Vendidos: ${product.soldCount}</p>
                  </div>
                </div>
            </div>
        `;
  
        productList.innerHTML += productHTML;
    });
  
    new Swiper('.swiper-container', {
      effect: 'coverflow',
      slidesPerView: 2,
      centeredSlides: true,
      initialSlide: 2,
      coverflowEffect: {
          rotate: 0,
          stretch: 200,
          depth: 100,
          modifier: 1,
          slideShadows: true,
      },
     
      
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    });
    
  }
  
  document.addEventListener("DOMContentLoaded", () => {
    const categoryId = localStorage.getItem("catID");
    fetch(
      `https://japceibal.github.io/emercado-api/cats_products/${categoryId}.json`
    )
      .then((response) => response.json())
      .then((productsData) => renderProducts(productsData.products));
  });