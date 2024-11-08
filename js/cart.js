let productosCarrito=[]
const envioCostoUSDMOSTRAR = document.getElementById('costo-envio-usd');
const envioCostoUYUMOSTRAR = document.getElementById('costo-envio-uyu');
const totalFinalUSDMOSTRAR = document.getElementById('total-final-usd');
const totalFinalUYUMOSTRAR = document.getElementById('total-final-uyu');

const totalDisplay = document.getElementById('totalDisplay');


// Función para establecer el ID del producto en localStorage y redirigir
function setProductID(id) {
    localStorage.setItem("productID", id);
    window.location = "product-info.html";
}

// Función para mostrar la lista de productos
function showProductsList() {
    let totalUYU = 0; // Acumulador para total en UYU
    let totalUSD = 0; // Acumulador para total en USD
    let htmlContentToAppend = "";
    if (productosCarrito.length==0){
        htmlContentToAppend="Carrito vacío"
    }else{
        for (let product of productosCarrito) {
            const storedQuantity = localStorage.getItem(`cantidad-${product.id}`) || 1; // Valor por defecto es 1 si no hay en localStorage
            const subtotal = product.cost * storedQuantity; // Calcular subtotal

            // Acumular el subtotal en la moneda correspondiente
            if (product.currency === "UYU") {
                totalUYU += subtotal;
            } else if (product.currency === "USD") {
                totalUSD += subtotal;
            }
        
            htmlContentToAppend += `
            <div class="card mb-3">
                      <div class="row g-0 align-items-center cursor-active">
                          <div class="col-2">
                              <img src="${product.images[0]}" alt="${product.name}" class="img-fluid rounded-start">
                          </div>
                          <div onclick="setProductID(${product.id})" class="col-8">
                              <div class="card-body">
                                  <h5 class="card-title">${product.name}</h5>
                                  <p class="text-success">${product.currency} ${product.cost}</p>
                                  <p class="text-muted">Subtotal: <span id="subtotal-${product.id}">${product.currency} ${subtotal.toFixed(2)}</span></p>
                              </div>
                          </div>
                          <div class="col-2 text-center">
                          <input id="cantidad-${product.id}" class="mb-2 cantidad-input" type="number" min="1" max="100" step="1" value="${storedQuantity}" data-id="${product.id}" data-cost="${product.cost}">
                              <button class="btn btn-danger btn-sm eliminar-btn" data-id="${product.id}"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                              <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
                              <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
                            </svg></button>
                          </div>
                      </div>
                  </div>`;
        }
        
       actualizarTotales();
    }

    document.getElementById("listado").innerHTML = htmlContentToAppend;
    

    // Actualizar los totales en la interfaz
    document.getElementById("total-uyu").innerHTML = `${totalUYU.toFixed(2)}`;
    document.getElementById("total-usd").innerHTML = `${totalUSD.toFixed(2)}`;

    // Añadir event listeners a cada botón de eliminar
    document.querySelectorAll(".eliminar-btn").forEach(button => {
     button.addEventListener("click", function() {
            const productId = parseInt(this.getAttribute("data-id"));
            eliminarProducto(productId); 
        });
    });
   
     // Añadir event listeners a cada campo de cantidad
     const cantidadInputs = document.querySelectorAll(".cantidad-input");
     cantidadInputs.forEach(input => {
         input.addEventListener("input", function() {
             const productId = this.getAttribute("data-id");
             const cantidad = this.value;
             localStorage.setItem(`cantidad-${productId}`, cantidad);
 
             // Actualizar subtotal del producto
             const product = productosCarrito.find(p => p.id === parseInt(productId));
             const subtotal = product.cost * cantidad; 
             // Llama a la función para recalcular totales
             actualizarTotales();
         });
     });
 }

// Función para actualizar el total en el resumen
function actualizarTotales() {
    let totalUYU = 0;
    let totalUSD = 0;

    productosCarrito.forEach(product => {
        const cantidad = localStorage.getItem(`cantidad-${product.id}`) || 1;
        const subtotal = product.cost * cantidad; // Calcular subtotal

        // Sumar al total en la moneda correspondiente
        if (product.currency === "UYU") {
            totalUYU += subtotal;
        } else if (product.currency === "USD") {
            totalUSD += subtotal;
        }
    });

    // Actualizar los subtotales en resumen
    document.getElementById("total-uyu").innerHTML = ` ${totalUYU.toFixed(2)}`;
    document.getElementById("total-usd").innerHTML = ` ${totalUSD.toFixed(2)}`;
    
    //ENVIO
    const envioFactor = parseFloat(document.getElementById('tipoEnvio').value);
    const envioCostoUYU = totalUYU * envioFactor;
    const envioCostoUSD = totalUSD * envioFactor;
    envioCostoUYUMOSTRAR.innerHTML = ` ${envioCostoUYU.toFixed(2)}`;
    envioCostoUSDMOSTRAR.innerHTML = ` ${envioCostoUSD.toFixed(2)}`;
    const totalFinalUYU = totalUYU + envioCostoUYU;
    const totalFinalUSD = totalUSD + envioCostoUSD;
    totalFinalUSDMOSTRAR.innerHTML = ` ${totalFinalUSD.toFixed(2)}`;
    totalFinalUYUMOSTRAR.innerHTML = ` ${totalFinalUYU.toFixed(2)}`;
}  

// Evento para el cambio de tipo de envío
document.getElementById('tipoEnvio').addEventListener('change', actualizarTotales);


// Función para actualizar el subtotal de cada producto en tiempo real
function actualizarSubtotal(event) {
    const input = event.target;
    const id = parseInt(input.getAttribute("data-id"));
    const cost = parseFloat(input.getAttribute("data-cost"));
    const cantidad = parseInt(input.value);
    
    // Calcular el nuevo subtotal
    const subtotal = cost * cantidad;
    
    // Actualizar el subtotal en la interfaz
    document.getElementById(`subtotal-${id}`).textContent = `${subtotal}`;
}


// Función para eliminar producto por ID
function eliminarProducto(id) {
    // Buscar el índice del producto en el array
    const index = productosCarrito.findIndex(product => product.id === id);
    if (index !== -1) {
        // Eliminar el producto del array
        productosCarrito.splice(index, 1);
        
        // Actualizar el localStorage
        localStorage.setItem("Carrito", JSON.stringify(productosCarrito));
        
        // Recargar la lista de productos
        showProductsList();
        actualizarTotales();
    }
}

// Event listener
document.addEventListener("DOMContentLoaded", function() {
    productosCarrito = JSON.parse(localStorage.getItem("Carrito")) || [];
    showProductsList();

    document.getElementById("seguirComprando").addEventListener("click", function() {
        window.location.href = "index.html"; 
    });

    // Calcular cantidad de productos en el carrito
    document.getElementById("cantidadProductos").innerHTML = productosCarrito.length;
});


