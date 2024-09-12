const ORDER_BY_SOLD_COUNT = "Vendidos";
const ORDER_BY_PRICE_ASC = "Precio_ASC";
const ORDER_BY_PRICE_DESC = "Precio_DESC";
const searchInput = document.getElementById("searchInput");
let currentProductsArray = []; 
let currentSortCriteria = undefined;
let currentCategoriesArray = [];
let minCount = undefined;
let maxCount = undefined;
let minPrice = undefined;
let maxPrice = undefined;
       




function parseValue(value, type) {
    if (type === 'soldCount') {
      return parseInt(value);
    } else if (type === 'cost') {
      return parseFloat(value);
    }
    return value;
}

function sortProducts(criteria, array) {
    let result = [];
    if (criteria === ORDER_BY_SOLD_COUNT) {
        result = array.sort((a, b) => {
            const aValue = parseValue(a.soldCount, 'soldCount');
            const bValue = parseValue(b.soldCount, 'soldCount');
            if (aValue > bValue) return -1;
            if (aValue < bValue) return 1;
            return 0;
        });
    } else if (criteria === ORDER_BY_PRICE_ASC) {
        result = array.sort((a, b) => {
            const aValue = parseValue(a.cost, 'cost');
            const bValue = parseValue(b.cost, 'cost');
            if (aValue < bValue) return -1;
            if (aValue > bValue) return 1;
            return 0;
        });
    } else if (criteria === ORDER_BY_PRICE_DESC) {
        result = array.sort((a, b) => {
            const aValue = parseValue(a.cost, 'cost');
            const bValue = parseValue(b.cost, 'cost');
            if (aValue > bValue) return -1;
            if (aValue < bValue) return 1;
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

   
    for (let i = 0; i < currentProductsArray.length; i++) { // Corregido de 'currentProductsArray'
        let product = currentProductsArray[i];

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
                            <small class="text-muted">${product.soldCount} vendidos</small>
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
      currentProductsArray = categoriesArray; // Corregido de 'currentProductsArray'
  }

  currentProductsArray = sortProducts(currentSortCriteria, currentProductsArray); // Corregido de 'currentProductsArray'

  showProductsList();
}

document.addEventListener("DOMContentLoaded", function(e) {
  const categoria = localStorage.getItem("catID");
  const url = PRODUCTS_URL + categoria + EXT_TYPE;

  getJSONData(url).then(function(resultObj) {
      if (resultObj.status === "ok") {
          currentProductsArray = resultObj.data.products; // Corregido de 'currentProductsArray'
          showProductsList();
          
      }
      
  });
})


function showCatName(){
    let subtitulo=document.getElementById("subtitulo");
    let id=localStorage.getItem('catID')
    let url=PRODUCTS_URL+id+".json"
    getJSONData(url).then(function(resultObj){
          if (resultObj.status === "ok"){
              let categoria= resultObj.data;
              subtitulo.innerHTML += ` ${categoria.catName}`
          }
      });

}

function showCatName(){
    let subtitulo=document.getElementById("subtitulo");
    let id=localStorage.getItem('catID')
    let url=PRODUCTS_URL+id+".json"
    getJSONData(url).then(function(resultObj){
          if (resultObj.status === "ok"){
              let categoria= resultObj.data;
              subtitulo.innerHTML += ` ${categoria.catName}.`
          }
      });

}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    const categoria = localStorage.getItem("catID")
    const url = PRODUCTS_URL + categoria + ".json"

    showCatName();

    getJSONData(url).then(function(resultObj){
        if (resultObj.status === "ok"){
            currentProductsArray = resultObj.data.products
            showProductsList()
            //sortAndShowProducts(ORDER_ASC_BY_NAME, resultObj.data);
        }
    });

    document.getElementById("sortByCount").addEventListener("click", function() { // ID corregido en función al HTML
      sortAndShowCategories(ORDER_BY_SOLD_COUNT);
  });

  document.getElementById("sortByPriceAsc").addEventListener("click", function() {
      sortAndShowCategories(ORDER_BY_PRICE_ASC);
  });

  document.getElementById("sortByPriceDesc").addEventListener("click", function() {
      sortAndShowCategories(ORDER_BY_PRICE_DESC);
  });

  document.getElementById("clearRangeFilter").addEventListener("click", function() {
      document.getElementById("rangeFilterPriceMin").value = ""; // Se eliminan los campos de cantidad ya que no existen en el HTML
      document.getElementById("rangeFilterPriceMax").value = "";

      minPrice = undefined;
      maxPrice = undefined;

      showProductsList();
  });

  document.getElementById("rangeFilterPrice").addEventListener("click", function() {
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

console.log(searchInput);
    searchInput.addEventListener("input", () => {
        const searchTerm = searchInput.value.toLowerCase();
        console.log(searchTerm);
        console.log(currentProductsArray);
        currentProductsArray.filter((product) => { 
        return product.name.toLowerCase().includes(searchTerm);

    })     
    });

        


