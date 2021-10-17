let productRelevant = ``;

function showImagesGallery(array){

    let htmlCountImg = "";
    let htmladdImg =  ``;

    for(let i = 0; i < array.length; i++){
        let imageSrc = array[i];
        if(imageSrc === array[0]){
            htmlCountImg = `<li data-target="#carouselThePicture" data-slide-to="` + i +`" class="active"></li>`
            htmladdImg = `<div class="carousel-item active">
                            <img class="d-block w-100" src="`+ imageSrc +`" alt="First slide">
                        </div>`
        }else{

            htmlCountImg += `
                <li data-target="#carouselThePicture" data-slide-to="`+ i + `"></li>`         
            
            htmladdImg +=`
                <div class="carousel-item">
                    <img class="d-block w-100" src="`+ imageSrc +`" alt="Second slide">
                </div>
                `
        }

        document.getElementById("countImgCarousel").innerHTML = htmlCountImg;
        document.getElementById("addImgCarousel").innerHTML = htmladdImg;
    }
}

function showRelated(array){
    getJSONData(PRODUCTS_URL).then(function(resultObj){
        if (resultObj.status === "ok"){
            product = resultObj.data;
        }

        let addHtml = ``;
        let addButtom =``;
        let countIf = 0;
        for (let index = 0; index < array.length; index++) {
            let productRel = array[index];

            for (let i = 0; i < product.length; i++) {
                let productshow = product[i];
                
                if(productRel === i){
                    if(countIf === 0){

                        addButtom += `
                                <li data-target="#carouselRel" data-slide-to=`+ countIf +` class="active"></li>
                                `
                        addHtml += `
                                <div class="carousel-item active">
                                    <img src="`+ productshow.imgSrc +`" class="d-block w-100" alt="Imagen` +countIf + 1 +`">
                                    <div class="carousel-caption d-none d-md-block">
                                        <h5>` + toUpperWord(productshow.name) + `</h5>
                                        <spam>` + productshow.description + `</spam>
                                        <spam>` + productshow.currency + ` ` + Intl.NumberFormat("de-DE").format(productshow.cost) + `</spam>
                                    </div>
                                </div>
                                `
                    }else{
                        addButtom += `
                            <li data-target="#carouselRel" data-slide-to="`+ countIf + `"></li>`         
                        addHtml += `
                            <div class="carousel-item">
                                <img src="`+ productshow.imgSrc +`" class="d-block w-100" alt="Imagen` +countIf + 1 +`">
                                <div class="carousel-caption d-none d-md-block">
                                    <h5>` + toUpperWord(productshow.name) + `</h5>
                                    <spam>` + productshow.description + `</spam>
                                    <spam>` + productshow.currency + ` ` + Intl.NumberFormat("de-DE").format(productshow.cost) + `</spam>
                                </div>
                            </div>
                            `
                    }
                    countIf++;
                }
            }
        }

        document.getElementById("buttonCarousel").innerHTML = addButtom;
        document.getElementById("cardCarousel").innerHTML = addHtml;
    });
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    document.getElementById("newComment").value = ``;
    let car = sessionStorage.getItem("carName")
    if(car){
        getJSONData(PRODUCTS_URL).then(function(resultObj){

            if (resultObj.status === "ok"){
                product = resultObj.data;
                for (let i = 0; i < product.length; i++) {
                    const element = product[i];                    
                    if(element.name === car){
                        let elementNameHTML  = document.getElementById("categoryName");
                        let elementDescriptionHTML = document.getElementById("productDescription");
                        let elementCoust = document.getElementById("ProductCoust");
                        let elementSold = document.getElementById("productSold");
        
                        elementSold.innerHTML = element.soldCount
                        elementCoust.innerHTML = element.currency
                        elementCoust.innerHTML += ` ` + Intl.NumberFormat("de-DE").format(element.cost)
                        elementNameHTML.innerHTML = toUpperWord(element.name);
                        elementDescriptionHTML.innerHTML = element.description;
        
                        //Muestro las imagenes en forma de galería
                        document.getElementById("oneImage").innerHTML=`

                        <div id="carouselExampleControls" class="carousel slide" data-ride="carousel">
                            <div class="carousel-inner">
                                <div class="carousel-item active">
                                    <img src="${element.imgSrc}" class="d-block w-100" alt="...">
                                </div>
                            </div>
                            <a class="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
                            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span class="sr-only">Previous</span>
                            </a>
                            <a class="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
                            <span class="carousel-control-next-icon" aria-hidden="true"></span>
                            <span class="sr-only">Next</span>
                            </a>
                        </div>
                        `
                        // <img src="${element.imgSrc}">
                    }
                }
            }

        })
    }else{
        getJSONData(PRODUCT_INFO_URL).then(function(resultObj){

            if (resultObj.status === "ok"){
                product = resultObj.data;
                let productsNameHTML  = document.getElementById("categoryName");
                let productsDescriptionHTML = document.getElementById("productDescription");
                let productCoust = document.getElementById("ProductCoust");
                let productSold = document.getElementById("productSold");

                showRelated(product.relatedProducts);
                productRelevant = product.relatedProducts;
                productSold.innerHTML = product.soldCount
                productCoust.innerHTML = product.currency
                productCoust.innerHTML += ` ` + Intl.NumberFormat("de-DE").format(product.cost)
                productsNameHTML.innerHTML = toUpperWord(product.name);
                productsDescriptionHTML.innerHTML = product.description;

                //Muestro las imagenes en forma de galería
                showImagesGallery(product.images);
            }
        });
    }

    let totalComments = 0;

    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function(resultObjet){
        if(resultObjet.status === "ok"){
            comment = resultObjet.data;

            totalComments = comment.length;
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
                        <span><small class="font-weight-bold text-primary">` + toUpperWord(comments.user) + `:</small> 
                            <small class="font-weight-bold">` + comments.description + `</small></span> 
                        </div>
                    </div>
                    <div class="action d-flex mt-2 align-items-center">
                        <div class="icons align-items-center"><small id="qualification`+ i +`">Calificacion: </small>
                        </div>
                    </div>
                    <div>
                        <spam class="text-muted align-items-center"> Fecha del comentario: ` + formatDateTime(comments.dateTime) + `</spam>
                    </div>
                </div>               
                `
                document.getElementById("cardAdd").innerHTML += htmlContentToAppend;

                let stars = ``;
                for(let s = 0; s < parseInt(comments.score); s++){
                    stars +=`
                    <i class="fas fa-star checked"></i>
                    `
                };
                
                for(let i = parseInt(comments.score); i < 5 ; i++){
                    stars +=`
                    <i class="far fa-star" id="starNotChecked"></i>
                    `
                };
        

                document.getElementById("qualification" + i).innerHTML += stars
            }
        }
    })

    document.getElementById("cancelComment").addEventListener("click", function(){
        document.getElementById("newComment").value = ``;
        $("#star-3").prop('checked', true);

    })

    let countStars = 3;

    document.getElementById("star-5").addEventListener("click", function(){
        countStars = 5;
    });

    document.getElementById("star-4").addEventListener("click", function(){
        countStars = 4;
    });

    document.getElementById("star-3").addEventListener("click", function(){
        countStars = 3;
    });

    document.getElementById("star-2").addEventListener("click", function(){
        countStars = 2;
    });

    document.getElementById("star-1").addEventListener("click", function(){
        countStars = 1;
    });

    let addCountStars = ``;

    function addStars(count){
        addCountStars = ``;
        for (let i = 0; i < count; i++) {
            addCountStars += `<i class="fas fa-star checked"></i>`
        }
        for (let i = count; i < 5; i++) {
            addCountStars += `<i class="far fa-star" id="starNotChecked"></i>`
        }
        return addCountStars;
    }

    document.getElementById("toPost").addEventListener("click", function(){
        let comment = document.getElementById("newComment").value

        htmlContentToAppend = `
        <div class="card p-3">
            <div class="d-flex justify-content-between align-items-center">
                <div class="user d-flex flex-row align-items-center"> <img src=` + sessionStorage.getItem("img") + ` width="30" class="user-img rounded-circle mr-2"> 
                <span><small class="font-weight-bold text-primary">` + toUpperWord(sessionStorage.getItem("name")) + `:</small> 
                    <small class="font-weight-bold">` + comment + `</small></span> 
                </div>
            </div>
            <div class="action d-flex mt-2 align-items-center">
                <div class="icons align-items-center"><small id="qualification">Calificacion:` + addStars(countStars)+ `</small>
                </div>
            </div>
            <div>
                <spam class="text-muted align-items-center"> Fecha del comentario: ` + formatDateTime(dateTime()) + `</spam>
            </div>
        </div>               
        `
        totalComments++
        document.getElementById("cardAdd").innerHTML += htmlContentToAppend;
        document.getElementById("countComments").innerHTML = `Comentarios (` + totalComments + `)`
        document.getElementById("newComment").value = ``;
        // document.getElementById("star-3").attributes
        $("#star-3").prop('checked', true);
    })
    
    document.getElementById("commentsImg").src=sessionStorage.getItem("img");

});