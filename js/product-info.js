function renderProducts(product) {
  const productList = document.getElementById("carrousel");
  productList.innerHTML = '';
  const titulo = document.getElementById("tituloCat");
  const desc = document.getElementById("Proddesc");
     
  titulo.innerHTML=`<h3>${product.category}</h3>`
  desc.innerHTML=` <p>${product.description}</p>`
 
  for (const image of product.images){
    const productHTML = `
            <div class="swiper-slide">
                  <img src="${image}" alt="Imagen del ${product.name}">
                  <div class="swiper-slide-caption">
                      <h4>${product.name}</h4>
                      <h5>${product.currency} ${product.cost}</h5>
                      <p>Vendidos: ${product.soldCount}</p>
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
}

/*Parte que agrega comentarios y  */
function comentarios(product){
  const tabla=document.getElementById("tablacomentarios")
    product.forEach(element => {
        let cantidadestrellas=estrellas(element.score)
        tabla.innerHTML+= `
    <tr>
        <td class="table-warning p-2 text-center">${element.user}</td>
        <td class="table-default p-2">${element.description} <small> ${element.dateTime}</small></td>
        <td class="table-warning p-2 text-center">${cantidadestrellas}</td>
    </tr>`
    })
}

function estrellas(numero){
  var estrellas = "";
  if (numero > 0) {
    for (let i = 0; i < numero; i++) {
      estrellas += `
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star" viewBox="0 0 16 16">
          <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.56.56 0 0 0-.163-.505L1.71 6.745l4.052-.576a.53.53 0 0 0 .393-.288L8 2.223l1.847 3.658a.53.53 0 0 0 .393.288l4.052.575-2.906 2.77a.56.56 0 0 0-.163.506l.694 3.957-3.686-1.894a.5.5 0 0 0-.461 0z"/>
        </svg>
      `;
    }
  }
  return estrellas;
}
  
document.addEventListener("DOMContentLoaded", function(e){
    let id=localStorage.getItem('productID')
    let url_info=PRODUCT_INFO_URL+id+".json"
    let url_coment=PRODUCT_INFO_COMMENTS_URL+id+".json"
   getJSONData(url_info).then(function(resultObj){
          if (resultObj.status === "ok"){
              let producto= resultObj.data
              renderProducts(producto)
          }
    });
    getJSONData(url_coment).then(function(resultObj){
      if (resultObj.status === "ok"){
          let producto= resultObj.data
          comentarios(producto)
      }
  });
  })

