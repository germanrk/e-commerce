let idUser = ``;
let nameUser = ``;
let imgUser = ``;
let emailUser = ``;
let idTokenUser =``;
let log = false;
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
    console.log(nameUser);
    window.location.href="./inicio.html";
    localStorage.setItem('name',''+ nameUser +'');
    localStorage.setItem('img',''+ imgUser +'');
    localStorage.setItem('token',''+ idTokenUser +'');
    log = true;
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
function validationLogin(){
    let email = document.getElementById("email-login").value;
    let pass = document.getElementById("password-login").value;
    if((email ===``) && (pass ===``)){
      verificationStatus("alert-email-pass")
    }else if(email ===``){
      verificationStatus("alert-email")
    }else if(pass === ``){
      verificationStatus("alert-pass")
    }
    if((email === `user`) && (pass === `user`)){
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