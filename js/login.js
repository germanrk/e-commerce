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
    sessionStorage.setItem('nameG',''+ nameUser +'');
    sessionStorage.setItem('img',''+ imgUser +'');
    sessionStorage.setItem('token',''+ idTokenUser +'');
    sessionStorage.setItem("last_connection", formatDateTime(dateTime()))
    verificationStatus("login-google");
    verificationStatus("logout-google");
    document.getElementById("googleIntro").innerHTML = `
      <button id="btn-login-google" type="button" name="button" class="btn btn-dark w-100" >
        Entrar
      </button>
  `

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

    if((email !=``) && (pass != ``)){
        sessionStorage.setItem('name', email);
        sessionStorage.setItem(`pass`, pass);
        sessionStorage.setItem("prueba", "este es una prueba")
        sessionStorage.setItem("last_connection", formatDateTime(dateTime()))
        if(sessionStorage.getItem(`img`)===null){
          sessionStorage.setItem(`img`, `https://www.prensalibre.com/wp-content/uploads/2019/05/1467646262_522853_1467646344_noticia_normal.jpg?quality=82&w=664`)
        }else if(sessionStorage.getItem(`img`)===``){
          sessionStorage.setItem(`img`, `https://www.prensalibre.com/wp-content/uploads/2019/05/1467646262_522853_1467646344_noticia_normal.jpg?quality=82&w=664`)
        }
        window.location.href="./inicio.html"
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

document.getElementById("googleIntro").onclick=function(){
  window.location.href="./inicio.html";
}

document.getElementById("register").onclick=function(){
  window.location.href="./register.html";
}