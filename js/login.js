let idUser = ``;
let nameUser = ``;
let imgUser = ``;
let emailUser = ``;
let idTokenUser =``;

function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    idTokenUser = googleUser.getAuthResponse().id_token;
    idUser = profile.getId();
    nameUser = profile.getName();
    imgUser = profile.getImageUrl();
    emailUser = profile.getEmail();
    console.log(googleUser);
    console.log(profile);
    console.log(idTokenUser);
    console.log(idUser);
    window.location.href="./inicio.html";
}

function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
      window.location.href="./index.html";
      showElement(btn-intro);
      showElement(login-google);
    });
  }
function showElement(id) {
    var x = document.getElementById(id);
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
}
function validationLogin(){
    let email = document.getElementById("email-login").value;
    let pass = document.getElementById("password-login").value;
    if((email === ``) && (pass === ``)){
        $("#alert-email-pass").show(300)
    }else if(email === ``){
        $("#alert-email").show(300)
      // alert("Le falto poner su email");
    }else if(pass === ``){
        $("#alert-pass").show(300)
      // alert("Le falto poner su password");
    }
    if((email === `user`) && (pass === `user`)){
        window.location.href="./inicio.html"
      }else{(email != `user`) && (pass != `user`)
        $("#alert-help").show(300)
      }
  }

document.getElementById("btn-login").onclick=function(){
    validationLogin();
  }