function showImagesGallery(array){

    let htmlContentToAppend = "";

    for(let i = 0; i < array.length; i++){
        let imageSrc = array[i];
        htmlContentToAppend += `
        <div class="col-lg-3 col-md-4 col-6">
            <div class="d-block mb-4 h-100">
                <img class="img-fluid img-thumbnail" src="` + imageSrc + `" alt="">
            </div>
        </div>
        `

        document.getElementById("productImagesGallery").innerHTML = htmlContentToAppend;
    }
}


//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCT_INFO_URL).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            product = resultObj.data;

            let productsNameHTML  = document.getElementById("categoryName");
            let productsDescriptionHTML = document.getElementById("productDescription");
            let productCountHTML = document.getElementById("productCount");
            let productCriteriaHTML = document.getElementById("productCriteria");
            
            productsNameHTML.innerHTML = product.name;
            productsDescriptionHTML.innerHTML = product.description;
            productCountHTML.innerHTML = product.soldCount;
            productCriteriaHTML.innerHTML = product.productCriteria;

            //Muestro las imagenes en forma de galería
            showImagesGallery(product.images);
        }
    });

    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function(resultObjet){
        if(resultObjet.status === "ok"){
            comment = resultObjet.data;

            let htmlContentToAppend = "";
            let countComents = `
            Comentarios (` + comment.length + `)
            `
            document.getElementById("countComments").innerHTML = countComents;

            for(let i = 0; i < comment.length; i++){
                let comments = comment[i];
                htmlContentToAppend = `
                <div class="card p-3">
                    <div class="d-flex justify-content-between align-items-center">
                        <div class="user d-flex flex-row align-items-center"> <img src="https://www.prensalibre.com/wp-content/uploads/2019/05/1467646262_522853_1467646344_noticia_normal.jpg?quality=82&w=664" width="30" class="user-img rounded-circle mr-2"> 
                        <span><small class="font-weight-bold text-primary">` + comments.user + `:</small> 
                            <small class="font-weight-bold">` + comments.description + `</small></span> 
                        </div>
                    </div>
                    <div class="action d-flex mt-2 align-items-center">
                        <div class="icons align-items-center"><small id="qualification`+ i +`">Calificacion: </small>
                        </div>
                    </div>
                    <div>
                        <spam class="text-muted align-items-center"> Fecha del comentario: ` + comments.dateTime + `</spam>
                    </div>
                </div>               
                `
                document.getElementById("cardAdd").innerHTML += htmlContentToAppend;

                let stars = ``;
                for(let s = 0; s < parseInt(comments.score); s++){
                    stars +=`
                    <i class="fas fa-star"></i>
                    `
                };
                document.getElementById("qualification" + i).innerHTML += stars
            }
        }
    })
});