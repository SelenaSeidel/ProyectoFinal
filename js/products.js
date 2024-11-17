const ORDER_BY_SOLD_COUNT = "Vendidos";
const ORDER_BY_PRICE_ASC = "Precio_ASC";
const ORDER_BY_PRICE_DESC = "Precio_DESC";
const searchInput = document.getElementById("searchInput");
let currentProductsArray = []; 
let currentSortCriteria = undefined;
let minCount = undefined;
let maxCount = undefined;
let minPrice = undefined;
let maxPrice = undefined;

// Función para parsear valores según el tipo
function parseValue(value, type) {
    if (type === 'soldCount') {
        return parseInt(value);
    } else if (type === 'cost') {
        return parseFloat(value);
    }
    return value;
}

// Función para ordenar productos según el criterio especificado
function sortProducts(criteria, array) {
    return array.sort((a, b) => {
        let aValue, bValue;
        if (criteria === ORDER_BY_SOLD_COUNT) {
            aValue = parseValue(a.soldCount, 'soldCount');
            bValue = parseValue(b.soldCount, 'soldCount');
            return bValue - aValue; // Ordenar descendente por cantidad de ventas
        } else if (criteria === ORDER_BY_PRICE_ASC) {
            aValue = parseValue(a.cost, 'cost');
            bValue = parseValue(b.cost, 'cost');
            return aValue - bValue; // Ordenar ascendente por precio
        } else if (criteria === ORDER_BY_PRICE_DESC) {
            aValue = parseValue(a.cost, 'cost');
            bValue = parseValue(b.cost, 'cost');
            return bValue - aValue; // Ordenar descendente por precio
        }
        return 0; // Sin cambio en caso de que el criterio no coincida
    });
}

// Función para establecer el ID del producto en localStorage y redirigir
function setProductID(id) {
    localStorage.setItem("productID", id);
    window.location = "product-info.html";
}

// Función para mostrar la lista de productos filtrados y ordenados
function showProductsList() {
    let htmlContentToAppend = "";

    for (let product of currentProductsArray) {
        if (((minCount === undefined) || (parseInt(product.soldCount) >= minCount)) &&
            ((maxCount === undefined) || (parseInt(product.soldCount) <= maxCount)) &&
            ((minPrice === undefined) || (parseFloat(product.cost) >= minPrice)) &&
            ((maxPrice === undefined) || (parseFloat(product.cost) <= maxPrice))) {

            htmlContentToAppend += `
            <div onclick="setProductID(${product.id})" class="list-group-item list-group-item-action cursor-active">
                <div class="row">
                    <div class="col-3">
                        <img src="${product.image}" alt="${product.description}" class="img-thumbnail">
                    </div>
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <h4 class="mb-1">${product.name} - ${product.currency} ${product.cost} </h4>
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

// Función para ordenar y mostrar productos de una categoría
function sortAndShowCategories(sortCriteria, categoriesArray) {
    currentSortCriteria = sortCriteria;

    if (categoriesArray) {
        currentProductsArray = categoriesArray;
    }

    currentProductsArray = sortProducts(currentSortCriteria, currentProductsArray);
    showProductsList();

    const categoryId = localStorage.getItem("catID");
    const url = PRODUCTS_URL + categoryId + EXT_TYPE;

    getJSONData(url).then(function(resultObj) {
        if (resultObj.status === "ok") {
            currentProductsArray = resultObj.data.products;
            showProductsList();
        }
    });

    showCatName();
}

// Función para mostrar el nombre de la categoría
function showCatName() {
    const subtitulo = document.getElementById("subtitulo");
    const id = localStorage.getItem('catID');
    const url = PRODUCTS_URL + id + EXT_TYPE;

    getJSONData(url).then(function(resultObj) {
        if (resultObj.status === "ok") {
            const categoria = resultObj.data;
            subtitulo.innerHTML += ` ${categoria.catName}.`;
        }
    });
}

// Event listeners para ordenar y filtrar productos
document.addEventListener("DOMContentLoaded", function() {
     // Inicializar carrito de compras (si existe) y mostrar la cantidad de productos en el carrito
    productosCarrito = JSON.parse(localStorage.getItem("Carrito")) || [];   
    
    document.getElementById("cantidadProductos").innerHTML = productosCarrito.length;
    const categoryId = localStorage.getItem("catID");
    const url = PRODUCTS_URL + categoryId + EXT_TYPE;
    // Obtener los productos desde la API
    getJSONData(url).then(function(resultObj) {
        if (resultObj.status === "ok") {
            currentProductsArray = resultObj.data.products;
            showProductsList();
        }
    });
    // Event listener para ordenar productos por cantidad de ventas
    document.getElementById("sortByCount").addEventListener("click", function() {
        sortAndShowCategories(ORDER_BY_SOLD_COUNT);
    });

    // Event listener para ordenar productos por precio ascendente  
    document.getElementById("sortByPriceAsc").addEventListener("click", function() {
        sortAndShowCategories(ORDER_BY_PRICE_ASC);
    });
    // Event listener para ordenar productos por precio descendente
    document.getElementById("sortByPriceDesc").addEventListener("click", function() {
        sortAndShowCategories(ORDER_BY_PRICE_DESC);
    });

    document.getElementById("clearRangeFilter").addEventListener("click", function() {
        document.getElementById("rangeFilterPriceMin").value = "";
        document.getElementById("rangeFilterPriceMax").value = "";
        minPrice = undefined;
        maxPrice = undefined;
        showProductsList();
    });

    document.getElementById("rangeFilterPrice").addEventListener("click", function() {
        minPrice = document.getElementById("rangeFilterPriceMin").value;
        maxPrice = document.getElementById("rangeFilterPriceMax").value;

        minPrice = (minPrice && parseFloat(minPrice) >= 0) ? parseFloat(minPrice) : undefined;
        maxPrice = (maxPrice && parseFloat(maxPrice) >= 0) ? parseFloat(maxPrice) : undefined;

        showProductsList();
    });

    searchInput.addEventListener("input", () => {
        const searchTerm = searchInput.value.toLowerCase();

        // Filtrar los productos basados en el término de búsqueda
        currentProductsArray = currentProductsArray.filter((product) => {
            return product.name.toLowerCase().includes(searchTerm) || product.description.toLowerCase().includes(searchTerm);
        });

        showProductsList();  
    });
});
