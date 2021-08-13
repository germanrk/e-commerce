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

function showElement(id) {
    var x = document.getElementById(id);
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
}
// function verificationStatus(id){
//   if(($("#"+id+"").css("display") === "none")){
//     $("#"+id+"").css("display") = "block"
//   }else if(($("#"+id+"").css("display") === "block")){
//     $("#"+id+"").css("display") = "none"
//   }
// }

function verificationStatus(id){
  if(($("#"+id+"").css("display") === "none")){
    $("#"+id+"").slideDown();
  }else if(($("#"+id+"").css("display") === "block")){
    $("#"+id+"").fadeOut();
  }
}
function validationLogin(){
    let email = document.getElementById("email-login").value;
    let pass = document.getElementById("password-login").value;
    if((email === ``) && (pass === ``)){
      verificationStatus("alert-email-pass")
    }else if(email === ``){
      verificationStatus("alert-email")
    }else if(pass === ``){
      verificationStatus("alert-pass")
    }
    if((email === `user`) && (pass === `user`)){
        window.location.href="./inicio.html"
      }else{(email != `user`) && (pass != `user`)
        $("#alert-help").show()
      }
  }

document.getElementById("btn-login").onclick=function(){
    validationLogin();
  }