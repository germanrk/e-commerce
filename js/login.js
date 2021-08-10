let idUser = ``;
let nameUser = ``;
let imgUser = ``;
let emailUser = ``;

function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    idUser = profile.getId();
    nameUser = profile.getName();
    imgUser = profile.getImageUrl();
    emailUser = profile.getEmail();
}