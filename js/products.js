const ORDER_BY_SOLD_COUNT = "Vendidos";
const ORDER_BY_PRICE_ASC = "Precio_ASC";
const ORDER_BY_PRICE_DESC = "Precio_DESC";
const searchInput = document.getElementById("searchInput");
let allProductsArray = []; // Lista original de productos
let currentProductsArray = []; // Lista actual para trabajar
let currentSortCriteria = undefined;
let minPrice = undefined;
let maxPrice = undefined;

// Función para ordenar productos
function sortProducts(criteria, array) {
    return array.sort((a, b) => {
        if (criteria === ORDER_BY_SOLD_COUNT) {
            return b.soldCount - a.soldCount; // Mayor cantidad vendidos primero
        } else if (criteria === ORDER_BY_PRICE_ASC) {
            return a.cost - b.cost; // Precio ascendente
        } else if (criteria === ORDER_BY_PRICE_DESC) {
            return b.cost - a.cost; // Precio descendente
        }
        return 0; // Sin cambio
    });
}

// Función para mostrar productos
function showProductsList() {
    let htmlContentToAppend = "";

    for (let product of currentProductsArray) {
        if (((minPrice === undefined) || (parseFloat(product.cost) >= minPrice)) &&
            ((maxPrice === undefined) || (parseFloat(product.cost) <= maxPrice))) {

            htmlContentToAppend += `
            <div onclick="setProductID(${product.id})" class="list-group-item list-group-item-action cursor-active">
                <div class="row">
                    <div class="col-3">
                        <img src="${product.image}" alt="${product.description}" class="img-thumbnail">
                    </div>
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <h4 class="mb-1">${product.name} - ${product.currency} ${product.cost}</h4>
                            <small class="text-muted">${product.soldCount} vendidos</small>
                        </div>
                        <p class="mb-1">${product.description}</p>
                    </div>
                </div>
            </div>`;
        }
    }

    document.getElementById("cat-list-container").innerHTML = htmlContentToAppend;
}

// Función para establecer el ID del producto en localStorage y redirigir
function setProductID(id) {
    localStorage.setItem("productID", id);
    window.location = "product-info.html";
}

// Función para ordenar y mostrar productos
function sortAndShowProducts(sortCriteria) {
    currentSortCriteria = sortCriteria;
    currentProductsArray = sortProducts(currentSortCriteria, [...allProductsArray]); // Usar la lista completa
    showProductsList();
}

// Función para mostrar el nombre de la categoría
function showCatName() {
    const subtitulo = document.getElementById("subtitulo");
    const id = localStorage.getItem("catID");
    const url = PRODUCTS_URL + id + EXT_TYPE;

    getJSONData(url).then(function (resultObj) {
        if (resultObj.status === "ok") {
            const categoria = resultObj.data;
            subtitulo.innerHTML += ` ${categoria.catName}.`;
        }
    });
}

// Event listener al cargar la página
document.addEventListener("DOMContentLoaded", function () {
    const categoryId = localStorage.getItem("catID");
    const url = PRODUCTS_URL + categoryId + EXT_TYPE;

    // Cargar productos
    getJSONData(url).then(function (resultObj) {
        if (resultObj.status === "ok") {
            allProductsArray = resultObj.data.products; // Guardar lista original
            currentProductsArray = [...allProductsArray]; // Copiar a la lista actual
            showProductsList(); // Mostrar productos
            showCatName(); // Mostrar nombre de la categoría
        }
    });

    // Event listeners para ordenamientos
    document.getElementById("sortByCount").addEventListener("click", function () {
        sortAndShowProducts(ORDER_BY_SOLD_COUNT);
    });

    document.getElementById("sortByPriceAsc").addEventListener("click", function () {
        sortAndShowProducts(ORDER_BY_PRICE_ASC);
    });

    document.getElementById("sortByPriceDesc").addEventListener("click", function () {
        sortAndShowProducts(ORDER_BY_PRICE_DESC);
    });

    // Limpiar filtro de precios
    document.getElementById("clearRangeFilter").addEventListener("click", function () {
        document.getElementById("rangeFilterPriceMin").value = "";
        document.getElementById("rangeFilterPriceMax").value = "";
        minPrice = undefined;
        maxPrice = undefined;
        currentProductsArray = [...allProductsArray]; // Restaurar lista completa
        showProductsList();
    });

    // Aplicar filtro de precios
    document.getElementById("rangeFilterPrice").addEventListener("click", function () {
        // Obtener valores mínimos y máximos del rango de precio
        const minPriceInput = document.getElementById("rangeFilterPriceMin").value;
        const maxPriceInput = document.getElementById("rangeFilterPriceMax").value;

        // Convertir los valores ingresados en números o dejarlos como `undefined` si están vacíos
        minPrice = minPriceInput ? parseFloat(minPriceInput) : undefined;
        maxPrice = maxPriceInput ? parseFloat(maxPriceInput) : undefined;

        // Filtrar los productos según el rango de precios
        currentProductsArray = allProductsArray.filter(product => {
            const cost = parseFloat(product.cost); // Asegurarnos de que el costo sea un número
            return (!minPrice || cost >= minPrice) && (!maxPrice || cost <= maxPrice);
        });

        // Mostrar la lista filtrada
        showProductsList();
    });

    // Filtro de búsqueda
    searchInput.addEventListener("input", function () {
        const searchTerm = searchInput.value.toLowerCase();

        if (searchTerm === "") {
            currentProductsArray = [...allProductsArray];
        } else {
            currentProductsArray = allProductsArray.filter(product => {
                return product.name.toLowerCase().includes(searchTerm) ||
                       product.description.toLowerCase().includes(searchTerm);
            });
        }

        showProductsList();
    });
});
