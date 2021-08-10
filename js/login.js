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

    if(nameUser){
        let htmlContentToAppend = "";
        htmlContentToAppend += `
            <div><a class="btn btn-denger" href="./inicio.html">Entrar</a></div>
        `
        document.getElementById("intro").innerHTML = htmlContentToAppend;
    }
}