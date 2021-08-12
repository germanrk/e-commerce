let idUser = ``;
let nameUser = ``;
let imgUser = ``;
let emailUser = ``;

function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    var idTokenUser = googleUser.getAuthResponse().id_token;
    idUser = profile.getId();
    nameUser = profile.getName();
    imgUser = profile.getImageUrl();
    emailUser = profile.getEmail();
    console.log(googleUser);
    console.log(profile);
    console.log(idTokenUser);
    console.log(idUser)
        // <div class="mt-2" id="btn-intro"><a class="btn btn-denger" href="./inicio.html">Entrar</a></div>
        htmlContentToAppend += `
            <div class="mt-2"><a href="#" onclick="signOut();">Sign out</a>
                <img src="`+ imgUser +`">
            </div>
        `
        document.getElementById("intro").innerHTML = htmlContentToAppend;
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