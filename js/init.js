const CATEGORIES_URL = "https://japdevdep.github.io/ecommerce-api/category/all.json";
const PUBLISH_PRODUCT_URL = "https://japdevdep.github.io/ecommerce-api/product/publish.json";
const CATEGORY_INFO_URL = "https://japdevdep.github.io/ecommerce-api/category/1234.json";
const PRODUCTS_URL = "https://japdevdep.github.io/ecommerce-api/product/all.json";
const PRODUCT_INFO_URL = "https://japdevdep.github.io/ecommerce-api/product/5678.json";
const PRODUCT_INFO_COMMENTS_URL = "https://japdevdep.github.io/ecommerce-api/product/5678-comments.json";
const CART_INFO_URL = "https://japdevdep.github.io/ecommerce-api/cart/987.json";
const CART_BUY_URL = "https://japdevdep.github.io/ecommerce-api/cart/buy.json";
let appendNav = ``;

// 
// 
// Variables para listar 
// 
// 

const ORDER_ASC_BY_NAME = "AZ";
const ORDER_DESC_BY_NAME = "ZA";
const ORDER_BY_PROD_COUNT_Down = "CantDown";
const ORDER_BY_PROD_COUNT_UP = "CantUp";
const ORDER_BY_PROD_REL_UP = "RelUp";
const ORDER_BY_PROD_REL_Down = "RelDown";
var currentCategoriesArray = [];
var currentProductArray = [];
var currentSortCriteria = undefined;
var minCount = undefined;
var maxCount = undefined;
// 
// Se creean los spinner 
// 
// 6

var showSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "block";
}

var hideSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "none";
}

// 
// 
// Se se hace el login de Oauth Google
// 
// 

let getName = sessionStorage.getItem('nameG');
let getImg = sessionStorage.getItem('img');
let getToken = sessionStorage.getItem('token');
let last_connection = sessionStorage.getItem("last_connection");


var getJSONData = function(url){
  var result = {};
  showSpinner();
  return fetch(url)
  .then(response => {
    if (response.ok) {
      return response.json();
    }else{
      throw Error(response.statusText);
    }
  })
  .then(function(response) {
        result.status = 'ok';
        result.data = response;
        hideSpinner();
        return result;
  })
  .catch(function(error) {
      result.status = 'error';
      result.data = error;
      hideSpinner();
      return result;
  });
}

function showLogout(){
  if(getName){
    appendNav += `
      <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        <img class="imgPerfil" src="`+getImg+`">
      </a>
      <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
        <a class="dropdown-item disabled" href="#" tabindex="-1" aria-disabled="true">`+getName+`</a>
        <a class="dropdown-item disabled" href="#" tabindex="-1" aria-disabled="true">`+last_connection+`</a>
        <a class="dropdown-item" id="exitGoogle" href="#"> Cerrar Sesion</a>
      </div>
    `
  }else{
    sessionStorage.removeItem(`img`)
    sessionStorage.setItem(`img`, `https://www.prensalibre.com/wp-content/uploads/2019/05/1467646262_522853_1467646344_noticia_normal.jpg?quality=82&w=664`)

    appendNav += `
      <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        <img class="imgPerfil" src="`+ sessionStorage.getItem("img") +`">
      </a>
      <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
        <a class="dropdown-item disabled" href="#" tabindex="-1" aria-disabled="true">`+ sessionStorage.getItem("name") +`</a>
        <a class="dropdown-item disabled" href="#" tabindex="-1" aria-disabled="true"> Ultima conexión ` +last_connection+ `</a>
        <a class="dropdown-item" id"exit" href="./index.html">Cerrar Sesion</a>
      </div>
    `
  }
  document.getElementById("logout").innerHTML = appendNav;
}
function signOut() {
  var auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function () {
  });
}

function onLoad() {
  gapi.load('auth2', function() {
    gapi.auth2.init();
  });
}

function dateTime(){
  let dataTime = new Date();
  let fullTime = dataTime.getDate() + "-" + (dataTime.getMonth()+1) + "-" + dataTime.getFullYear() + "  " + dataTime.getHours()+ ":" +dataTime.getMinutes()+ ":"+ dataTime.getSeconds();
  
  return fullTime
}

function formatDateTime(date){
  var d = new Date(date),
  month = `` + (d.getMonth() + 1),
  day = `` + d.getDate(),
  year = `` + d.getFullYear();
  hours = `` + d.getHours();
  minutes = `` + d.getMinutes();

if (month.length < 2) 
  month = '0' + month;
if (day.length < 2) 
  day = '0' + day;
if (hours.length < 2) 
  hours = '0' + hours;
if (minutes.length < 2) 
  minutes = '0' + minutes;

return [month, day, year].join(`-`) + ` | ` + [hours, minutes].join(`:`);
}



    //Función que se ejecuta una vez que se haya lanzado el evento de
    //que el documento se encuentra cargado, es decir, se encuentran todos los
    //elementos HTML presentes.
    document.addEventListener("DOMContentLoaded", function(e){
    if(document.getElementById("logout")){
      showLogout()
    }
    // if(document.getElementById("exit"))
    //   document.getElementById("exit").onclick = function(){
    //   signOut()
    //   GoogleAuth.disconnect();
    // }

    if(document.getElementById("exitGoogle")){
      document.getElementById("exitGoogle").onclick = function(){
        localStorage.clear()
        sessionStorage.clear()
        window.location.href ="./index.html"
        signOut()
      }
    }

    if(document.getElementById("exit")){
      document.getElementById("exit").onclick = function(){
        localStorage.clear()
        sessionStorage.clear()
      }
    }
});