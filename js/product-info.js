function renderProducts(product) {
  // Función para renderizar los productos en la página
  const productList = document.getElementById("carrousel");
  productList.innerHTML = '';
  // Mostrar el título de la categoría del producto y su descripción
  const titulo = document.getElementById("tituloCat");
  const desc = document.getElementById("Proddesc");
     
  titulo.innerHTML=`<h3>${product.category}</h3>`
 // Mostrar las imágenes del producto en el carrusel
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
  // Inicialización del Swiper para el carrusel de imágenes
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
 // Mostrar productos relacionados en el carrusel
  product.relatedProducts.forEach((p, i) => {
    const relatedProductElement = document.createElement("div")
    relatedProductElement.onclick = function(){
      localStorage.setItem("productID", p.id);
      window.location = "product-info.html";
    }
    relatedProductElement.classList.add("carousel-item")
    const relatedProductName = document.createElement("h3")
    relatedProductName.innerHTML = p.name
    relatedProductElement.appendChild(relatedProductName)


    const relatedProductImg = document.createElement("img")
    relatedProductImg.setAttribute('src', p.image)
    relatedProductElement.appendChild(relatedProductImg)

    if(i == 0) {
      relatedProductElement.classList.add("active")
    }
  
    relatedProducts.appendChild(relatedProductElement);
  })
}

// Función para mostrar los comentarios del producto
function mostrarComentarios(comentarios){
  const tabla=document.getElementById("tablacomentarios")
  tabla.innerHTML = ""
  comentarios.forEach(comentario => {
        let cantidadestrellas=estrellas(comentario.score)
        tabla.innerHTML+= `
    <tr>
        <td class="table-warning p-2 text-center">${comentario.user}</td>
        <td class="table-default p-2">${comentario.description} <small> ${comentario.dateTime}</small></td>
        <td class="table-warning p-2 text-center">${cantidadestrellas}</td>
    </tr>`
    })
}
// Función para mostrar las estrellas de puntuación según el valor recibido
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

// Obtener el nombre de usuario del localStorage y mostrarlo en el campo de calificacion
  const username = localStorage.getItem('username');

  
  const userNameDisplay = document.getElementById("userNameDisplay");
  userNameDisplay.value = username ? username : ''; // Asignar el nombre o dejar vacío si no hay



const submitComment = document.getElementById("submitComment");
// Función que se ejecuta al hacer clic en el botón de enviar comentario
submitComment.addEventListener("click", function(){
  /*Voy a definir que va a hacer el botòn de enviar */
  const comentarioValue = document.getElementById("comentarioValue").value;
  const rating = document.getElementById("rating").value;
  const id=localStorage.getItem('productID')
  /*Voy a imprimir el comentario */
  var today = new Date();
  var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
  var time = today.getHours()+':'+today.getMinutes()+':'+today.getSeconds();
  console.log();
  const nuevoComentario = {product:id, user: userNameDisplay.value,  description: comentarioValue, dateTime:date + ' '+ time, score: rating }
// Obtener los comentarios guardados en localStorage
  const comentarios = JSON.parse(localStorage.getItem("comentarios")) || []
  comentarios.push(nuevoComentario)

  localStorage.setItem("comentarios", JSON.stringify(comentarios))

  mostrarComentarios(comentarios)
}) 


document.addEventListener("DOMContentLoaded", function(e){
  productosCarrito = JSON.parse(localStorage.getItem("Carrito")) || [];
  // Calcular cantidad de productos en el carrito
  document.getElementById("cantidadProductos").innerHTML = productosCarrito.length;
  
    let id=localStorage.getItem('productID')
    let url_info=PRODUCT_INFO_URL+id+".json"
    let url_coment=PRODUCT_INFO_COMMENTS_URL+id+".json"
   getJSONData(url_info).then(function(resultObj){
          if (resultObj.status === "ok"){
              let producto= resultObj.data
              renderProducts(producto)
          }
    });

    const comentarios = JSON.parse(localStorage.getItem("comentarios")) || []

    if (comentarios.length == 0) {
      getJSONData(url_coment).then(function(resultObj){
        if (resultObj.status === "ok"){
            let comentarios = resultObj.data
            localStorage.setItem("comentarios", JSON.stringify(comentarios))
            mostrarComentarios(comentarios)
        }
      });
    }else{
      mostrarComentarios(comentarios)
    }
  
  
  
  })

// modo noche - modo dia
const toggleButton = document.getElementById('toggle-theme');
const body = document.body;
// Función que cambia entre modo noche y día

document.addEventListener('DOMContentLoaded', () => {
  const toggleButton = document.getElementById('toggle-theme');
  const body = document.body;

  // Al cargar la página, verificar la preferencia del usuario (si hay algún valor guardado en localStorage)
  if (localStorage.getItem('darkMode') === 'enabled') {
      body.classList.add('night-mode');  // Si está habilitado el modo nocturno, agregar la clase al body
      toggleButton.textContent = 'Modo Día';  // Cambiar el texto del botón
  } else {
      toggleButton.textContent = 'Modo Nocturno';  // Si no está habilitado el modo nocturno, mantener el texto original
  }

  // Cambiar de tema al hacer clic en el botón
  toggleButton.addEventListener('click', () => {
      body.classList.toggle('night-mode');  // Alternar la clase night-mode
      if (body.classList.contains('night-mode')) {
          localStorage.setItem('darkMode', 'enabled');  // Guardar la preferencia en localStorage
          toggleButton.textContent = 'Modo Día';  // Cambiar el texto del botón
      } else {
          localStorage.setItem('darkMode', 'disabled');  // Guardar la preferencia en localStorage
          toggleButton.textContent = 'Modo Nocturno';  // Cambiar el texto del botón
      }
  });
});


function Comprar() {
  let id = localStorage.getItem('productID');
  let url_info = PRODUCT_INFO_URL + id + ".json";

  getJSONData(url_info).then(function(resultObj) {
    if (resultObj.status === "ok") {
      let producto = resultObj.data;

      // Recuperar el carrito de localStorage
      let Carrito = localStorage.getItem("Carrito");

      if (Carrito === null) {
        Carrito = []; // Si no hay carrito, crear un array vacío
      } else {
        Carrito = JSON.parse(Carrito); // Si existe, parsear el JSON a un array
      }

       // Verificar si el producto ya está en el carrito
       const productoExistente = Carrito.find(item => item.id === producto.id);
      
       if (!productoExistente) {
         Carrito.push(producto); // Agregar el producto al array si no está en el carrito
         localStorage.setItem("Carrito", JSON.stringify(Carrito)); // Guardar el array actualizado en localStorage
       }
 
       window.location = "cart.html";
     }
  });
}

document.getElementById("comprar").addEventListener('click', Comprar);

