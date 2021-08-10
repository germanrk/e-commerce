function showCategoriesList(array){
    let htmlContentToAppend = "";
    for(let i = 0; i < array.length; i++){
        let product = array[i];
        
        let id = "";
        if(product.name === "Autos"){
            id = `id="cars"`;
        }

        htmlContentToAppend += `
        <div class="list-group-item list-group-item-action">
            <div class="row">
                <div class="col-3">
                    <img src="` + product.imgSrc + `" alt="` + product.desc + `" class="img-thumbnail"` + id + `>
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <h4 class="mb-1">`+ product.name +`</h4>
                        <small class="text-muted">`+ product.currency+ ` ` + product.cost  + `</small>
                    </div>
                    <p>` + product.description + `</p>
                </div>
            </div>
        </div>
        `
    document.getElementById("main").innerHTML = htmlContentToAppend;
    }
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(PRODUCTS_URL).then(function(resultObj){
        if (resultObj.status === "ok"){
            list_products = resultObj.data;
            showCategoriesList(list_products);
        }
    });
});