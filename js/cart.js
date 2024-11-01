// Función para mostrar la lista de productos
function showProductsList() {
    let htmlContentToAppend = "";
    if (productosCarrito.length == 0) {
        htmlContentToAppend = "Carrito vacío";
    } else {
        for (let product of productosCarrito) {
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
                                <p class="text-muted">Subtotal: <span id="subtotal-${product.id}">${product.currency} ${product.cost}</span></p>
                            </div>
                        </div>
                        <div class="col-2 text-center">
                            <input id="cantidad-${product.id}" class="mb-2 cantidad-input" type="number" min="1" max="100" step="1" value="1" data-id="${product.id}" data-cost="${product.cost}">
                            <button class="btn btn-danger btn-sm eliminar-btn" data-id="${product.id}">Eliminar</button>
                        </div>
                    </div>
                </div>`;
        }
    }

    document.getElementById("listado").innerHTML = htmlContentToAppend;

    // Añadir event listeners a cada botón de eliminar
    document.querySelectorAll(".eliminar-btn").forEach(button => {
        button.addEventListener("click", function() {
            const productId = parseInt(this.getAttribute("data-id"));
            eliminarProducto(productId);
        });
    });

    // Añadir event listeners a cada campo de cantidad
    document.querySelectorAll(".cantidad-input").forEach(input => {
        input.addEventListener("input", actualizarSubtotal);
    });
}

// Función para actualizar el subtotal en tiempo real
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
    const index = productosCarrito.findIndex(product => product.id === id);
    if (index !== -1) {
        productosCarrito.splice(index, 1);
        localStorage.setItem("Carrito", JSON.stringify(productosCarrito));
        showProductsList();
    }
}

// Event listener para cargar los productos al inicio
document.addEventListener("DOMContentLoaded", function() {
    productosCarrito = JSON.parse(localStorage.getItem("Carrito")) || [];
    showProductsList();

    document.getElementById("seguirComprando").addEventListener("click", function() {
        window.location.href = "index.html"; 
    });
});
