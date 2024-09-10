const ORDER_BY_SOLD_COUNT = "Vendidos";
const ORDER_BY_PRICE_ASC = "Precio_ASC";
const ORDER_BY_PRICE_DESC = "Precio_DESC";
let productcurrentProductsArray = [];
let currentSortCriteria = undefined;
let minCount = undefined;
let maxCount = undefined;
let minPrice = undefined;
let maxPrice = undefined;

function sortProducts(criteria, array) {
    let result = [];
    if (criteria === ORDER_BY_SOLD_COUNT) {
        result = array.sort(function(a, b) {
            let aCount = parseInt(a.soldCount);
            let bCount = parseInt(b.soldCount);
            if (aCount > bCount) return -1;
            if (aCount < bCount) return 1;
            return 0;
        });
    } else if (criteria === ORDER_BY_PRICE_ASC) {
        result = array.sort(function(a, b) {
            let aPrice = parseFloat(a.cost);
            let bPrice = parseFloat(b.cost);
            if (aPrice < bPrice) return -1;
            if (aPrice > bPrice) return 1;
            return 0;
        });
    } else if (criteria === ORDER_BY_PRICE_DESC) {
        result = array.sort(function(a, b) {
            let aPrice = parseFloat(a.cost);
            let bPrice = parseFloat(b.cost);
            if (aPrice > bPrice) return -1;
            if (aPrice < bPrice) return 1;
            return 0;
        });
    }
    return result;
}

function setProductID(id) {
    localStorage.setItem("productID", id);
    window.location = "product-info.html";
}

function showProductsList() {
    let htmlContentToAppend = "";
    for (let i = 0; i < productcurrentProductsArray.length; i++) {
        let product = productcurrentProductsArray[i];

        if (((minCount == undefined) || (minCount != undefined && parseInt(product.soldCount) >= minCount)) &&
            ((maxCount == undefined) || (maxCount != undefined && parseInt(product.soldCount) <= maxCount)) &&
            ((minPrice == undefined) || (minPrice != undefined && parseFloat(product.cost) >= minPrice)) &&
            ((maxPrice == undefined) || (maxPrice != undefined && parseFloat(product.cost) <= maxPrice))) {

            htmlContentToAppend += `
            <div onclick="setProductID(${product.id})" class="list-group-item list-group-item-action cursor-active">
                <div class="row">
                    <div class="col-3">
                        <img src="${product.image}" alt="${product.description}" class="img-thumbnail">
                    </div>
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <h4 class="mb-1">${product.name} - ${product.currency} ${product.cost} </h4>
                            <small class="text-muted">${product.soldCount} artículos</small>
                        </div>
                        <p class="mb-1">${product.description}</p>
                    </div>
                </div>
            </div>
            `;
        }
    }

    document.getElementById("cat-list-container").innerHTML = htmlContentToAppend;
}

function sortAndShowCategories(sortCriteria, categoriesArray) {
    currentSortCriteria = sortCriteria;

    if (categoriesArray != undefined) {
        productcurrentProductsArray = categoriesArray;
    }

    productcurrentProductsArray = sortProducts(currentSortCriteria, productcurrentProductsArray);

    // Mostrar las categorías ordenadas
    showProductsList();
}

// Función que se ejecuta una vez que se haya lanzado el evento de
// que el documento se encuentra cargado, es decir, se encuentran todos los
// elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e) {
    const categoria = localStorage.getItem("catID");
    const url = PRODUCTS_URL + categoria + ".json";

    getJSONData(url).then(function(resultObj) {
        if (resultObj.status === "ok") {
            productcurrentProductsArray = resultObj.data.products;
            showProductsList();
            // Puedes llamar a sortAndShowCategories con un criterio de orden predeterminado si lo deseas.
            // sortAndShowCategories(ORDER_BY_SOLD_COUNT, resultObj.data.products);
        }
    });

    // Agregar eventos para el filtrado y ordenamiento
    document.getElementById("sortBySoldCount").addEventListener("click", function() {
        sortAndShowCategories(ORDER_BY_SOLD_COUNT);
    });

    document.getElementById("sortByPriceAsc").addEventListener("click", function() {
        sortAndShowCategories(ORDER_BY_PRICE_ASC);
    });

    document.getElementById("sortByPriceDesc").addEventListener("click", function() {
        sortAndShowCategories(ORDER_BY_PRICE_DESC);
    });

    document.getElementById("clearRangeFilter").addEventListener("click", function() {
        document.getElementById("rangeFilterCountMin").value = "";
        document.getElementById("rangeFilterCountMax").value = "";
        document.getElementById("rangeFilterPriceMin").value = "";
        document.getElementById("rangeFilterPriceMax").value = "";

        minCount = undefined;
        maxCount = undefined;
        minPrice = undefined;
        maxPrice = undefined;

        showProductsList();
    });

    document.getElementById("rangeFilterCount").addEventListener("click", function() {
        // Obtengo el mínimo y máximo de los intervalos para filtrar por cantidad
        minCount = document.getElementById("rangeFilterCountMin").value;
        maxCount = document.getElementById("rangeFilterCountMax").value;

        if ((minCount != undefined) && (minCount != "") && (parseInt(minCount)) >= 0) {
            minCount = parseInt(minCount);
        } else {
            minCount = undefined;
        }

        if ((maxCount != undefined) && (maxCount != "") && (parseInt(maxCount)) >= 0) {
            maxCount = parseInt(maxCount);
        } else {
            maxCount = undefined;
        }

        showProductsList();
    });

    document.getElementById("rangeFilterPrice").addEventListener("click", function() {
        // Obtengo el mínimo y máximo de los intervalos para filtrar por precio
        minPrice = document.getElementById("rangeFilterPriceMin").value;
        maxPrice = document.getElementById("rangeFilterPriceMax").value;

        if ((minPrice != undefined) && (minPrice != "") && (parseFloat(minPrice)) >= 0) {
            minPrice = parseFloat(minPrice);
        } else {
            minPrice = undefined;
        }

        if ((maxPrice != undefined) && (maxPrice != "") && (parseFloat(maxPrice)) >= 0) {
            maxPrice = parseFloat(maxPrice);
        } else {
            maxPrice = undefined;
        }

        showProductsList();
    });
});
