let idUser = ``;
let firstNameUser = ``;
let lastNameUser = ``;
let imgUser = ``;
let emailUser = ``;

function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    var idTokenUser = googleUser.getAuthResponse().id_token;
    idUser = profile.getId();
    firstNameUser = profile.getFirstName();
    lastNameUser = profile.getLasName();
    imgUser = profile.getImageUrl();
    emailUser = profile.getEmail();
    console.log(googleUser);
    console.log(profile);
    console.log(idTokenUser);
    console.log(firstNameUser)
    console.log(idUser)
    console.log(lastNameUser)

    if(idUser){
        let htmlContentToAppend = "";
        htmlContentToAppend += `
            <div><a class="btn btn-denger" href="./inicio.html">Entrar</a></div>
        `
        document.getElementById("intro").innerHTML = htmlContentToAppend;
    }
}