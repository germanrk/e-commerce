//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
let articles = {};
function addCart(array, id){
    let cost = 0;
    let money = ``;
    let img = ``;
    let name = ``;
    let appendHtml = ``;
    let count = 0;

    if(array.length === 0){
        $(`#${id}`).html(``);
    }else{
        for (let i = 0; i < array.length; i++) {
            const product = array[i];
            money = product.currency;
            cost = parseInt(product.unitCost);
            img = product.src;
            name = product.name;
            count = parseInt(product.count);
            
            if(money === `USD`){
                cost = cost * 45
            }
            money = `$`
            appendHtml += `
            <div class="row" id="${name}Row">
                <div class="col-2 p-0 mr-0 ml-0 mt-2 d-flex justify-content-center">
                    <img id="imgCart" src="${img}" alt="">
                </div>
                
                <div class="col-3 p-0 mr-0 ml-0 mt-2 d-flex justify-content-center">
                    <span>${name}</span>
                </div>
                    
                <div class="col-2 p-0 mr-0 mt-2 ml-0 d-flex justify-content-center">
                    <span class="numbers">${money}${Intl.NumberFormat("de-DE").format(cost)}</span>
                </div>
                                
                <div class="col-1 p-0 mr-0 ml-0 d-flex justify-content-center">
                    <input type="number" class="form-control" id="${name}" placeholder="1" min="1" value="${count}" onchange="changeInput(this.value, this.id, articles, 'productCart')">
                </div>
                                
                <div class="col-3 p-0 mr-0 ml-0 d-flex justify-content-center">
                    <span class="mt-2 numbers">${money}${Intl.NumberFormat("de-DE").format(cost * count)}</span>
                </div>
    
                <div class="col-1 p-0 mr-0 ml-0 d-flex justify-content-center">
                    <button id="${name}" class="btn btn-light" onclick="remove(this)">
                        <i class="fas fa-trash-alt"></i>
                    </button>
                </div>
            </div>
            <hr class="mb-4">
            `
            $(`#${id}`).html(appendHtml);
        }

    }
    $("#productCostSub").text(`${money}${Intl.NumberFormat("de-DE").format(showSubTotal(array))}`);
    showPercentAndTotal(array);
    $("#totalCostCart").prepend(money);
}

function changeInput(val, id, array, add){

    for (let i = 0; i < array.length; i++) {
        const product = array[i];
        if(product.name === id){
            product.count = parseInt(val)
        }
    }
    addCart(array, add);
    document.getElementById(id).value = val;
}

function showCart (id, url){
    getJSONData(url).then(function(resultObj){
        if (resultObj.status === "ok"){
            articles = resultObj.data.articles;
            addCart(articles, id);
        }
    })
}

function cleanCart(){
    articles.length = 0;
    addCart(articles, "productCart");
}

function removeItem(item){
    for (let i = 0; i < articles.length; i++) {
        let product = articles[i];
        if(item === product.name){
            articles.splice(i, 1);
        }
    }
    addCart(articles, "productCart");
}

function remove(button){
    let id = button.id;
    removeItem(id)
}

function captureId(button){
    let id = button.id;
    console.log(id)
}

function showSubTotal(array){
    let total = 0;
    let usd = 0;
    let uyu = 0;
    let currency = ``;

    for (let i = 0; i < array.length; i++) {
        const price = array[i];
        if(price.currency === "USD"){
            usd += ((price.unitCost * price.count) * 45);
        }
        uyu += price.unitCost * price.count;

    }
   total = uyu + usd;
   return total;
}

function dateTarjet() {
    var dateObj = new Date();
    var month = dateObj.getUTCMonth() + 1; //months from 1-12
    var year = dateObj.getUTCFullYear();

    return newdate = month + "/" + year;
}

function showPercentAndTotal(array){
    const radios = document.getElementsByTagName('input');
    let total = 0;
    for (let i = 0; i < radios.length; i++){
        const elemento = radios[i];
        if (elemento.type === 'radio' && elemento.checked) {
            if(elemento.id === "goldradio"){
                total = showSubTotal(array);
                $("#comissiontax").text(`$${Intl.NumberFormat("de-DE").format((total/100)*13)}`);
                total += (total /100) * 13;
                $("#totalCostCart").html(Intl.NumberFormat("de-DE").format(total));

            }else if(elemento.id === "premiumradio"){
                total = showSubTotal(array);
                $("#comissiontax").text(`$${Intl.NumberFormat("de-DE").format((total/100)*7)}`);
                total += (total /100) * 7;
                $("#totalCostCart").html(Intl.NumberFormat("de-DE").format(total));

                
            }else if(elemento.id === "standardradio"){
                total = showSubTotal(array);
                $("#comissiontax").text(`$${Intl.NumberFormat("de-DE").format((total/100)*3)}`);
                total += (total /100) * 3;
                $("#totalCostCart").html(Intl.NumberFormat("de-DE").format(total));
            }

        }
    }
}


showCart("productCart", "https://japdevdep.github.io/ecommerce-api/cart/654.json");

$("#cleanCart").click(function (){
    cleanCart();
});

var radios = document.querySelectorAll('input[type=radio][name="metodo-pago"]')
function changeHandler(event) {
    if(this.id === "trasference"){
        let addButtom =`
        <button type="button" id="proceedPayment" class="btn btn-block btn-primary" onclick="payVerification('wireTransfer')">Continuar el pago</button>
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>`
        document.getElementById("transactionCard").style.display = "none";
        document.getElementById("transactionPaypal").style.display = "none";
        document.getElementById("wireTransfer").style.display = "block";
        document.getElementById("footerModal").innerHTML = addButtom;

    }else if(this.id === "paypal"){
        let addButtom =`
        <button type="button" id="proceedPayment" class="btn btn-block btn-primary" onclick="payVerification('transactionPaypal')">Continuar el pago</button>
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>`
        document.getElementById("transactionCard").style.display = "none";
        document.getElementById("wireTransfer").style.display = "none";
        document.getElementById("transactionPaypal").style.display = "block";
        document.getElementById("footerModal").innerHTML = addButtom;
    }else{
        let addButtom =`
        <button type="button" id="proceedPayment" class="btn btn-block btn-primary" onclick="payVerification('transactionCard')">Continuar el pago</button>
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>`
        document.getElementById("transactionPaypal").style.display = "none";
        document.getElementById("wireTransfer").style.display = "none";
        document.getElementById("transactionCard").style.display = "block";
        document.getElementById("footerModal").innerHTML = addButtom;
    }
 }

(function() {
    'use strict';
    window.addEventListener('load', function() {
      var forms = document.getElementsByClassName('needs-validation');
      var validation = Array.prototype.filter.call(forms, function(form) {
        document.getElementById("proceedPayment").addEventListener('click', function(event) {
          if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
          }
          form.classList.add('was-validated');
        }, false);
    });
}, false);
  })();

function validar(){
    preventDefault();
}

function payVerification(id){
    let fields = document.querySelectorAll(`#${id} input`)

    for (let i = 0; i < fields.length; i++) {
        const input = fields[i];
        console.log(input.value.length);
        if(input.value.length === 0){
        return
        }
    }
    setTimeout(`window.location.href = "./inicio.html"`, 3000);
    return swal({
        title: "Su pago se realizo correctamente!",
        text: "Muchas gracias!",
        icon: "success",
        button: false
    });
}

document.getElementById("formPayment").addEventListener('submit', validar);
document.getElementById("tarjeta-expiracion").placeholder = dateTarjet();

 
 Array.prototype.forEach.call(radios, function(radio) {
    radio.addEventListener('change', changeHandler);
 });

 (function() {
    'use strict';
    window.addEventListener('load', function() {
      var forms = document.getElementsByClassName('needsValidationDirection');
      var validation = Array.prototype.filter.call(forms, function(form) {
        document.getElementById("toPay").addEventListener('click', function(event) {
          if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
          }
          form.classList.add('was-validated');
        }, false);
    });
}, false);
  })();

  document.getElementById("countries").addEventListener("click", addCountries(countries, "countries"))

  $( "#countries" ).change(function() {
    addCities(cities, $(this).val(), "city")
  });