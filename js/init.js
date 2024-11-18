const CATEGORIES_URL = "https://japceibal.github.io/emercado-api/cats/cat.json";
const PUBLISH_PRODUCT_URL = "https://japceibal.github.io/emercado-api/sell/publish.json";
const PRODUCTS_URL = "https://japceibal.github.io/emercado-api/cats_products/";
const PRODUCT_INFO_URL = "https://japceibal.github.io/emercado-api/products/";
const PRODUCT_INFO_COMMENTS_URL = "https://japceibal.github.io/emercado-api/products_comments/";
const CART_INFO_URL = "https://japceibal.github.io/emercado-api/user_cart/";
const CART_BUY_URL = "https://japceibal.github.io/emercado-api/cart/buy.json";
const EXT_TYPE = ".json";

// Muestra el spinner (indicador de carga) en la página
let showSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "block";
}
// Oculta el spinner (indicador de carga) en la página
let hideSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "none";
}
// Maneja el evento de clic en el botón de salir
let boton = document.getElementById("SalirBtn")
boton.addEventListener("click", function () {  //al hacer click
    localStorage.setItem('authenticated', 'false');
    window.location.href = 'login.html';
})
// Función que realiza una solicitud HTTP a la URL proporcionada y devuelve los datos en formato JSON
let getJSONData = function(url){
    let result = {};
    showSpinner();
    return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }else{
        throw Error(response.statusText);
      }
    })
    .then(function(response) {
          result.status = 'ok';
          result.data = response;
          hideSpinner();
          return result;
    })
    .catch(function(error) {
        result.status = 'error';
        result.data = error;
        hideSpinner();
        return result;
    });

   
}
document.addEventListener("DOMContentLoaded", function () {
  productosCarrito = JSON.parse(localStorage.getItem("Carrito")) || [];
        
  // Calcular cantidad de productos en el carrito
  document.getElementById("cantidadProductos").innerHTML = productosCarrito.length;
  let userName = localStorage.getItem('username');
  if (userName) {
    document.getElementById("userName").textContent = `Bienvenido, ${userName}`;
  }

  let boton = document.getElementById("SalirBtn")
  boton.addEventListener("click", function () {  //al hacer click
      localStorage.setItem('authenticated', 'false');
      window.location.href = 'login.html';
  })
});

