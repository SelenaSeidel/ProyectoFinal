function renderProducts(product) {
  const productList = document.getElementById("carrousel");
  productList.innerHTML = '';
  const titulo = document.getElementById("tituloCat");
  const desc = document.getElementById("Proddesc");
     
  titulo.innerHTML=`<h3>${product.category}</h3>`
 
  for (const image of product.images){
    const productHTML = `
            <div class="swiper-slide">
                  <img src="${image}" alt="Imagen del ${product.name}">
                  <div class="swiper-slide-caption">
                      <h4>${product.name}</h4>
                      <h5>${product.currency} ${product.cost}</h5>
                      <p>Vendidos: ${product.soldCount}</p>
                      <p>${product.description}</p>
                  </div>
                </div>
            </div>
           `;
  
    productList.innerHTML += productHTML;
  };
  
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

  
  const relatedProducts = document.querySelector("#related-products .carousel-inner");
 
  product.relatedProducts.forEach((p, i) => {
    const relatedProductElement = document.createElement("div")
    relatedProductElement.classList.add("carousel-item")
    const relatedProductImg = document.createElement("img")
    relatedProductImg.setAttribute('src', p.image)
    relatedProductElement.appendChild(relatedProductImg)

    if(i == 0) {
      relatedProductElement.classList.add("active")
    }
  
    relatedProducts.appendChild(relatedProductElement);
  })
}



document.addEventListener("DOMContentLoaded", function(e){
    let id=localStorage.getItem('productID')
    let url=PRODUCT_INFO_URL+id+".json"
   getJSONData(url).then(function(resultObj){
          if (resultObj.status === "ok"){
              let producto= resultObj.data
              renderProducts(producto)
          }
      });
  })

