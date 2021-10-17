// 
// 
// Muestra lista de productos sin filtro de AZ
// 
// 

function showProductList(){
    let htmlContentToAppend = "";
    for(let i = 0; i < currentProductArray.length; i++){
        let product = currentProductArray[i];
        
        if (((minCount == undefined) || (minCount != undefined && parseInt(product.cost) >= minCount)) &&
            ((maxCount == undefined) || (maxCount != undefined && parseInt(product.cost) <= maxCount))){

            htmlContentToAppend += `
            <a href="#" id="${product.name}" class="list-group-item list-group-item-action" onclick="save(this.id)">
                <div class="row">
                    <div class="col-3">
                        <img src="` + product.imgSrc + `" alt="` + product.desc + `" class="img-thumbnail">
                    </div>
                    <div class="col-6">
                        <h4 class="mb-1">`+ product.name +`</h4>
                        <p>` + product.description + `</p>
                    </div>
                    <div class="col-3">
                        <div class="d-flex justify-content-end">
                            <p class="text-muted">`+ product.currency+ ` ` +Intl.NumberFormat("de-DE").format(product.cost)  + `</p>
                            <p class="text-muted ml-2">|</p>
                            <p class="text-muted ml-2">`+ product.soldCount+ ` Vendidos</p>
                        </div>
                    </div>
                 </div>
            </a>
            `
        }
    document.getElementById("main").innerHTML = htmlContentToAppend;
    }
}

// 
// 
// Tipo de filtrado
// 
// 

function sortProducts(criteria, array){
    let result = [];
    if (criteria === ORDER_ASC_BY_NAME){
        result = array.sort(function(a, b) {
            if ( a.name < b.name ){ return -1; }
            if ( a.name > b.name ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_DESC_BY_NAME){
        result = array.sort(function(a, b) {
            if ( a.name > b.name ){ return -1; }
            if ( a.name < b.name ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_BY_PROD_COUNT_UP){
        result = array.sort(function(a, b) {
            let aCount = parseInt(a.cost);
            let bCount = parseInt(b.cost);

            if ( aCount > bCount ){ return -1; }
            if ( aCount < bCount ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_BY_PROD_REL_UP){
        result = array.sort(function(a, b) {
            let aRel = parseInt(a.soldCount);
            let bRel = parseInt(b.soldCount);

            if ( aRel > bRel ){ return -1; }
            if ( aRel < bRel ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_BY_PROD_COUNT_Down){
        result = array.sort(function(a, b) {
            let aCount = parseInt(a.cost);
            let bCount = parseInt(b.cost);

            if ( aCount < bCount ){ return -1; }
            if ( aCount > bCount ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_BY_PROD_REL_Down){
        result = array.sort(function(a, b) {
            let aRel = parseInt(a.soldCount);
            let bRel = parseInt(b.soldCount);

            if ( aRel < bRel ){ return -1; }
            if ( aRel > bRel ){ return 1; }
            return 0;
        });
    }
    
    return result;
  }

function sortAndShowProduct(sortCriteria, productArray){
    currentSortCriteria = sortCriteria;

    if(productArray != undefined){
        currentProductArray = productArray;
    }
    currentProductArray = sortProducts(currentSortCriteria, currentProductArray);

    showProductList();
}

// 
// 
// Se actualiza la lista por el search
// 
// 

function searchFilter() {
    
    let input_search = $("#search_product"); 
    let textSearch = input_search.val();
    let regEx = (string) =>  new RegExp(string, "gi")

    let htmlContentToAppend = "";
    newCurrentProducArray = currentProductArray.filter(product => 
         (product.name?.match(regEx(textSearch)) || product.description?.match(regEx(textSearch)))
    )

        newCurrentProducArray.forEach(product => {
            htmlContentToAppend += `
            <a href="#" id="${product.name}" class="list-group-item list-group-item-action" onclick="save(this.id)">
                <div class="list-group-item list-group-item-action">
                    <div class="row">
                        <div class="col-3">
                            <img src="` + product.imgSrc + `" alt="` + product.desc + `" class="img-thumbnail">
                        </div>
                        <div class="col-6">
                            <h4 class="mb-1">`+ product.name +`</h4>
                            <p>` + product.description + `</p>
                        </div>
                        <div class="col-3">
                            <div class="d-flex justify-content-end">
                                <p class="text-muted">`+ product.currency+ ` ` + Intl.NumberFormat("de-DE").format(product.cost)  + `</p>
                                <p class="text-muted ml-2">|</p>
                                <p class="text-muted ml-2">`+ product.soldCount+ ` Vendidos</p>
                            </div>
                        </div>
                    </div>
                </div>
            </a>
            `
        });

    if(newCurrentProducArray.length === 0){
        htmlContentToAppend =
            `
            <div class="container p-5">
                <div class="alert alert-danger" role="alert" style="position: relative; width:auto; top: 0;">
                    <h4 class="alert-heading">No se pudo encontrar lo que usted busca, puede verificar su búsqueda o buscar en categorías.</h4>
                    <hr>
                    <p class="mb-0"> Si desea ir a Categorias <a href="./categories.html">haga click aqui!</a></p>
                </div>
            </div>
            `
    }
    document.getElementById("main").innerHTML = htmlContentToAppend;
}

function save(name){
    if(name != "Chevrolet Onix Joy"){
        sessionStorage.setItem("carName", `${name}`);
    }
    window.location.href="./product-info.html"
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    sessionStorage.removeItem('carName');
    getJSONData(PRODUCTS_URL).then(function(resultObj){
        if (resultObj.status === "ok"){
            list_products = resultObj.data;
            sortAndShowProduct(ORDER_ASC_BY_NAME, list_products);
        }
    });
    
    document.getElementById("sortAsc").addEventListener("click", function(){
        sortAndShowProduct(ORDER_ASC_BY_NAME);
    });

    document.getElementById("sortDesc").addEventListener("click", function(){
        sortAndShowProduct(ORDER_DESC_BY_NAME);
    });

    document.getElementById("sortByCountUp").addEventListener("click", function(){
        sortAndShowProduct(ORDER_BY_PROD_COUNT_UP);
    });

    document.getElementById("sortByCountDown").addEventListener("click", function(){
        sortAndShowProduct(ORDER_BY_PROD_COUNT_Down);
    });

    document.getElementById("sortByRelUp").addEventListener("click", function(){
        sortAndShowProduct(ORDER_BY_PROD_REL_UP);
    });

    document.getElementById("sortByRelDown").addEventListener("click", function(){
        sortAndShowProduct(ORDER_BY_PROD_REL_Down);
    });

    document.getElementById("clearRangeFilter").addEventListener("click", function(){
        document.getElementById("rangeFilterCountMin").value = "";
        document.getElementById("rangeFilterCountMax").value = "";

        minCount = undefined;
        maxCount = undefined;

        showProductList();
    });

    document.getElementById("rangeFilterCount").addEventListener("click", function(){
        minCount = document.getElementById("rangeFilterCountMin").value;
        maxCount = document.getElementById("rangeFilterCountMax").value;

        if ((minCount != undefined) && (minCount != "") && (parseInt(minCount)) >= 0){
            minCount = parseInt(minCount);
        }
        else{
            minCount = undefined;
        }

        if ((maxCount != undefined) && (maxCount != "") && (parseInt(maxCount)) >= 0){
            maxCount = parseInt(maxCount);
        }
        else{
            maxCount = undefined;
        }

        showProductList();
    });

    $("#search_product").on("input", function() {
        searchFilter();
    });

});