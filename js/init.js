const CATEGORIES_URL = "https://japdevdep.github.io/ecommerce-api/category/all.json";
const PUBLISH_PRODUCT_URL = "https://japdevdep.github.io/ecommerce-api/product/publish.json";
const CATEGORY_INFO_URL = "https://japdevdep.github.io/ecommerce-api/category/1234.json";
const PRODUCTS_URL = "https://japdevdep.github.io/ecommerce-api/product/all.json";
const PRODUCT_INFO_URL = "https://japdevdep.github.io/ecommerce-api/product/5678.json";
const PRODUCT_INFO_COMMENTS_URL = "https://japdevdep.github.io/ecommerce-api/product/5678-comments.json";
const CART_INFO_URL = "https://japdevdep.github.io/ecommerce-api/cart/987.json";
const CART_BUY_URL = "https://japdevdep.github.io/ecommerce-api/cart/buy.json";
let appendNav = ``;

var showSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "block";
}

var hideSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "none";
}
let getName = localStorage.getItem('name');
let getImg = localStorage.getItem('img');
let getToken = localStorage.getItem('token');

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
        <a class="dropdown-item" href="./index.html">Cerrar Sesion</a>
      </div>
    `
  }else{
    appendNav += `
      <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        <img class="imgPerfil" src="https://www.prensalibre.com/wp-content/uploads/2019/05/1467646262_522853_1467646344_noticia_normal.jpg?quality=82&w=664">
      </a>
      <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
        <a class="dropdown-item disabled" href="#" tabindex="-1" aria-disabled="true">User</a>
        <a class="dropdown-item" href="./index.html">Cerrar Sesion</a>
      </div>
    `
  }
  document.getElementById("logout").innerHTML = appendNav;
}
    function signOut() {
      var auth2 = gapi.auth2.getAuthInstance();
      auth2.signOut().then(function () {
        showElement(btn-intro);
        showElement(login-google);
      });
    }
    //Función que se ejecuta una vez que se haya lanzado el evento de
    //que el documento se encuentra cargado, es decir, se encuentran todos los
    //elementos HTML presentes.
    document.addEventListener("DOMContentLoaded", function(e){
    showLogout()
    document.getElementById("signOut").onclick = function(){
    signOut()
    }
});