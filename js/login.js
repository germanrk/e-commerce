let idUser = ``;
let nameUser = ``;
let imgUser = ``;
let emailUser = ``;
let idTokenUser =``;

// 
// 
//inicio de sesion con google
// 
// 

function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    idTokenUser = googleUser.getAuthResponse().id_token;
    idUser = profile.getId();
    nameUser = profile.getName();
    imgUser = profile.getImageUrl();
    emailUser = profile.getEmail();
    window.location.href="./inicio.html";
    sessionStorage.setItem('name',''+ nameUser +'');
    sessionStorage.setItem('img',''+ imgUser +'');
    sessionStorage.setItem('token',''+ idTokenUser +'');
    sessionStorage.setItem("last_connection", formatDateTime(dateTime()))

}
// 
// 
// validacion a traves de un login nativo
// 
// 
function verificationStatus(id){
  if(($("#"+id+"").css("display") === "none")){
    $("#"+id+"").slideDown();
  }else if(($("#"+id+"").css("display") === "block")){
    $("#"+id+"").fadeOut();
  }
}

// 
// 
// show de alert error de login
// 
// 

function cerrar_alertas(alerta, tiempo){
  window.setTimeout(function(){
      $(alerta).fadeTo(500, 0).slideUp(500, function(){
          $(this).remove(); 
      });
  }, tiempo);
}

function validationLogin(){
    let email = document.getElementById("email-login").value;
    let pass = document.getElementById("password-login").value;

    if((email ===``) && (pass ===``)){
      cerrar_alertas("#alert-email-pass", 2000);
      // verificationStatus("alert-email-pass")
    }else if(email ===``){
      // verificationStatus("alert-email")
      cerrar_alertas("#alert-email", 2000);
    }else if(pass === ``){
      // verificationStatus("alert-pass")
      cerrar_alertas("#alert-pass", 2000);
    }

    if((email === `user`) && (pass === `user`)){
        sessionStorage.setItem('name', email);
        sessionStorage.setItem("prueba", "este es una prueba")
        sessionStorage.setItem("last_connection", formatDateTime(dateTime()))
        window.location.href="./inicio.html"

      }else{(email != `user`) && (pass != `user`)
        // $("#alert-help").show()
        verificationStatus("alert-help")
      }
  }

$("#password-login").keyup(function (event) {
  if (event.keyCode == 13) {
    $("#btn-login").click();
  }
});

$("#email-login").keyup(function (event) {
  if (event.keyCode == 13) {
    $("#btn-login").click();
  }
});

document.getElementById("btn-login").onclick=function(){
  validationLogin();
}