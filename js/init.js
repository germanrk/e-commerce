const CATEGORIES_URL = "https://japdevdep.github.io/ecommerce-api/category/all.json";
const PUBLISH_PRODUCT_URL = "https://japdevdep.github.io/ecommerce-api/product/publish.json";
const CATEGORY_INFO_URL = "https://japdevdep.github.io/ecommerce-api/category/1234.json";
const PRODUCTS_URL = "https://japdevdep.github.io/ecommerce-api/product/all.json";
const PRODUCT_INFO_URL = "https://japdevdep.github.io/ecommerce-api/product/5678.json";
const PRODUCT_INFO_COMMENTS_URL = "https://japdevdep.github.io/ecommerce-api/product/5678-comments.json";
const CART_INFO_URL = "https://japdevdep.github.io/ecommerce-api/cart/987.json";
const CART_BUY_URL = "https://japdevdep.github.io/ecommerce-api/cart/buy.json";
const LIST_CHANGE = "http://data.fixer.io/api/latest?access_key=f6a00ddc26464ce6063f48a303a5bb55"
let change = {};
let appendNav = ``;
const countries = "../json/countries.json";
const cities = "../json/states.json"

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
// 
// Cambio
// 
//

function dolarUyu(listado){
  let uyu = listado.UYU;
  let usd = listado.USD;
  let eur = listado.EUR;
  return (eur / usd) * uyu;
}

function changer(price, money){
  let total = 0;
  if(money === `USD`){
    total = price * dolarUyu(change);
  }else if(money === `UYU`){
    total = price / dolarUyu(change);
  }
  return total;
}


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
// Cambia primera letra del input search por mayusculas
// 
// 

function toUpperWord(palabra){
  let firstWord = palabra.charAt(0).toUpperCase();
  firstWord = firstWord + palabra.slice(1);
  return firstWord;
}

// 
// 
// funcion para agregar paises a un select
// 
// 

function addCountries(urlCountries, idCountries) {      
  fetch(urlCountries)
  .then(res => res.json())
  .then(function(data) {
      let addHtml = ``;
      for (let i = 0; i < data.countries.length; i++) {
          const countrie = data.countries[i];
          addHtml += `
          <option value="${countrie.id}">${countrie.name}</option>
          `
      }
      document.getElementById(idCountries).innerHTML = addHtml;
  })
}

// 
// 
// funcion para agregar ciudades a un select
// 
// 

function addCities(url, idCountries, idCities) {      
  fetch(url)
  .then(res => res.json())
  .then(function(data) {
      let addHtml = ``;
      for (let i = 0; i < data.states.length; i++) {
          const city = data.states[i];
          if(city.id_country === parseInt(idCountries)){
            addHtml += `
            <option>${city.name}</option>
            `
          }
      }
      document.getElementById(idCities).innerHTML = addHtml;
  })
}


// 
// 
// Se se hace el login de Oauth Google
// 
// 

const getName = sessionStorage.getItem('nameG');
const getImg = sessionStorage.getItem('img');
const getToken = sessionStorage.getItem('token');
const getLast_connection = sessionStorage.getItem("last_connection");


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

function verificationStatus(id){
  if(($(`#${id}`).css("display") === "none")){
    $(`#${id}`).slideDown();
  }else if(($(`#${id}`).css("display") === "block")){
    $(`#${id}`).fadeOut();
  }
}

function showLogout(name, image, last_connection){
  if(name){
    appendNav += `
      <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
      `+toUpperWord(name)+` <img class="imgPerfil ml-2" src="`+image+`">
      </a>
      <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
        <a class="dropdown-item disabled" href="#" tabindex="-1" aria-disabled="true">`+toUpperWord(name)+`</a>
        <a class="dropdown-item disabled" href="#" tabindex="-1" aria-disabled="true"> Ultima conexión `+last_connection+`</a>
        <a class="dropdown-item" href="./my-profile.html"> Mi perfil</a>
        <a class="dropdown-item" href="./cart.html"> Ir al carrito</a>
        <a class="dropdown-item" id="exitGoogle" href="#" onclick="exit()> Cerrar Sesion</a>
      </div>
    `
  }else{

    appendNav += `
      <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
      `+ toUpperWord(sessionStorage.getItem("nameG")) +` <img class="imgPerfil ml-2" src="`+ sessionStorage.getItem("img") +`"> 
      </a>
      <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
        <a class="dropdown-item disabled" href="#" tabindex="-1" aria-disabled="true">`+ toUpperWord(sessionStorage.getItem("nameG")) +`</a>
        <a class="dropdown-item disabled" href="#" tabindex="-1" aria-disabled="true"> Ultima conexión ` +last_connection+ `</a>
        <a class="dropdown-item" href="./my-profile.html"> Mi perfil</a>
        <a class="dropdown-item" href="./cart.html"> Ir al carrito</a>
        <a class="dropdown-item" id"exit" href="#" onclick="exit()">Cerrar Sesion</a>
      </div>
    `
  }
  document.getElementById("logout").innerHTML = appendNav;
}

function signOut() {
  var auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function () {
    verificationStatus("logout-google");
    verificationStatus("login-google");
    document.getElementById("btn-login-google").style.display = "none";
    localStorage.clear()
    sessionStorage.clear()
  });
}

function onLoad() {
  gapi.load('auth2', function() {
    gapi.auth2.init();
  });
}

function dateTime(){
  let dataTime = new Date();
  return dataTime
}

function formatDateTime(date){
  var d = new Date(date),
  month =  (d.getMonth() + 1).toString(),
  day = d.getDate().toString(),
  year = d.getFullYear().toString();
  hours = d.getHours().toString();
  minutes = d.getMinutes().toString();

if (month.length < 2) 
  month = '0' + month;
if (day.length < 2) 
  day = '0' + day;
if (hours.length < 2) 
  hours = '0' + hours;
if (minutes.length < 2) 
  minutes = '0' + minutes;

return [day, month , year].join(`-`) + ` | ` + [hours, minutes].join(`:`);
}
function exit(){
  localStorage.clear()
  sessionStorage.clear()
  window.location.href ="./index.html"
}


    //Función que se ejecuta una vez que se haya lanzado el evento de
    //que el documento se encuentra cargado, es decir, se encuentran todos los
    //elementos HTML presentes.
    document.addEventListener("DOMContentLoaded", function(e){
    if(document.getElementById("logout")){
      showLogout(getName, getImg, getLast_connection)
    }
});