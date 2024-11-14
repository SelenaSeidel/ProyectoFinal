document.addEventListener("DOMContentLoaded", function() {
    let productosCarrito = JSON.parse(localStorage.getItem("Carrito")) || [];
    const envioCostoUSDMOSTRAR = document.getElementById('costo-envio-usd');
    const envioCostoUYUMOSTRAR = document.getElementById('costo-envio-uyu');
    const totalFinalUSDMOSTRAR = document.getElementById('total-final-usd');
    const totalFinalUYUMOSTRAR = document.getElementById('total-final-uyu');

    // Mostrar lista de productos en el carrito
    function showProductsList() {
        let totalUYU = 0;
        let totalUSD = 0;
        let htmlContentToAppend = "";

        if (productosCarrito.length == 0) {
            htmlContentToAppend = "Carrito vacío";
        } else {
            for (let product of productosCarrito) {
                const storedQuantity = parseInt(localStorage.getItem(`cantidad-${product.id}`)) || 1;
                const subtotal = product.cost * storedQuantity;

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
                                <button class="btn btn-danger btn-sm eliminar-btn" data-id="${product.id}">Eliminar</button>
                            </div>
                        </div>
                    </div>`;
            }
            actualizarTotales();
        }
        document.getElementById("listado").innerHTML = htmlContentToAppend;
    }

    // Función para actualizar los totales en el resumen
    function actualizarTotales() {
        let totalUYU = 0;
        let totalUSD = 0;

        productosCarrito.forEach(product => {
            const cantidad = parseInt(localStorage.getItem(`cantidad-${product.id}`)) || 1;
            const subtotal = product.cost * cantidad;

            if (product.currency === "UYU") {
                totalUYU += subtotal;
            } else if (product.currency === "USD") {
                totalUSD += subtotal;
            }
        });

        document.getElementById("total-uyu").innerHTML = `${totalUYU.toFixed(2)}`;
        document.getElementById("total-usd").innerHTML = `${totalUSD.toFixed(2)}`;

        const envioFactor = parseFloat(document.getElementById('tipoEnvio').value) || 0;
        const envioCostoUYU = totalUYU * envioFactor;
        const envioCostoUSD = totalUSD * envioFactor;
        envioCostoUYUMOSTRAR.innerHTML = `${envioCostoUYU.toFixed(2)}`;
        envioCostoUSDMOSTRAR.innerHTML = `${envioCostoUSD.toFixed(2)}`;

        totalFinalUYUMOSTRAR.innerHTML = `${(totalUYU + envioCostoUYU).toFixed(2)}`;
        totalFinalUSDMOSTRAR.innerHTML = `${(totalUSD + envioCostoUSD).toFixed(2)}`;
    }

    // Validar y finalizar la compra
    function validarYFinalizarCompra() {
        let isValid = true;

        if (productosCarrito.length === 0) {
            alert("Tu carrito está vacío. Por favor, agrega productos antes de proceder.");
            isValid = false;
        }

        const departamento = document.getElementById("departamento");
        const localidad = document.getElementById("localidad");
        const calle = document.getElementById("calle");
        const numero = document.getElementById("numero");

        document.getElementById("departamentoError").style.display = departamento.value ? "none" : "block";
        document.getElementById("localidadError").style.display = localidad.value ? "none" : "block";
        document.getElementById("calleError").style.display = calle.value ? "none" : "block";
        document.getElementById("numeroError").style.display = numero.value ? "none" : "block";
        if (!departamento.value || !localidad.value || !calle.value || !numero.value) isValid = false;

        const tipoEnvio = document.getElementById("tipoEnvio").value;
        if (!["0.15", "0.07", "0.05"].includes(tipoEnvio)) {
            alert("Por favor, selecciona un tipo de envío.");
            isValid = false;
        }

        let cantidadValida = true;
        document.querySelectorAll(".cantidad-input").forEach(input => {
            if (isNaN(input.value) || parseInt(input.value) <= 0) {
                cantidadValida = false;
            }
        });
        if (!cantidadValida) {
            alert("La cantidad de cada producto debe ser un número mayor a 0.");
            isValid = false;
        }

        const formaPagoSeleccionada = document.querySelector('input[name="paymentMethod"]:checked');
        if (!formaPagoSeleccionada) {
            alert("Por favor, selecciona una forma de pago.");
            isValid = false;
        } else {
            if (formaPagoSeleccionada.value === "credit") {
                const nombreTarjeta = document.getElementById("nombreTarjeta");
                const numeroTarjeta = document.getElementById("numeroTarjeta");
                const vencimientoTarjeta = document.getElementById("vencimientoTarjeta");
                const codigoSeguridad = document.getElementById("codigoSeguridadTarjeta");

                document.getElementById("nombreTarjetaError").style.display = nombreTarjeta.value ? "none" : "block";
                document.getElementById("numeroTarjetaError").style.display = numeroTarjeta.value ? "none" : "block";
                document.getElementById("vencimientoTarjetaError").style.display = vencimientoTarjeta.value ? "none" : "block";
                document.getElementById("codigoSeguridadTarjetaError").style.display = codigoSeguridad.value ? "none" : "block";

                if (!nombreTarjeta.value || !numeroTarjeta.value || !vencimientoTarjeta.value || !codigoSeguridad.value) {
                    isValid = false;
                }
            } else if (formaPagoSeleccionada.value === "bank") {
                const homebankingSelect = document.getElementById("homebankingSelect");
                document.getElementById("homebankingError").style.display = homebankingSelect.value ? "none" : "block";
                if (!homebankingSelect.value) isValid = false;
            }
        }

        if (isValid) alert("Compra realizada con éxito. ¡Gracias por tu compra!");
    }

    showProductsList();
    document.getElementById("finalizarCompra").addEventListener("click", validarYFinalizarCompra);
});

