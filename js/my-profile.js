//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.

function addData(firstName, secondName, lastName, middleName, email, fono, yearsOld){
    let username = sessionStorage.getItem("name");
    let dataUser = [{"user": username, "firstName": firstName, "secondName": secondName, 
    "lastName": lastName, "middleName": middleName, "email": email, 
    "fono": fono, "yearsOld": yearsOld}];
    
    localStorage.setItem('datosUser', JSON.stringify(dataUser));
}

function showDataUser() {
    let data = JSON.parse(localStorage.getItem('datosUser'));
    if(data){
    for (let i = 0; i < data.length; i++) {
        const datos = data[i];
            document.getElementById("firstName").value = datos.firstName;
            document.getElementById("secondName").value = datos.secondName;
            document.getElementById("lastName").value = datos.lastName;
            document.getElementById("middleName").value = datos.middleName;
            document.getElementById("email").value = datos.email;
            document.getElementById("fono").value = datos.fono;
            document.getElementById("yearsOld").value = datos.yearsOld;
            document.getElementById("formFile").value = sessionStorage.getItem('img');
            
            document.getElementById("edit").innerHTML = `
            <button class="btn btn-success mt-3" id="btnEdit" data-toggle="modal" data-target="#contidionsModal" type="button">Editar datos</button>
            `
            document.getElementById("btn-submit").style.display = "block";
            document.getElementById("edit").style.float = "left";
            
            muteDataProfile();

        }
    }
}

function muteDataProfile(){
    let datos = document.getElementsByClassName("data")
    for (let i = 0; i < datos.length; i++){
        datos[i].disabled = true
    }
    document.getElementById("btn-submit").style.display = "none";
}

function editProfile(){
    let datos = document.getElementsByClassName("data")
    for (let i = 0; i < datos.length; i++){
        datos[i].disabled = false
    }
    document.getElementById("btn-submit").style.display = "block";


    document.getElementById("edit").innerHTML = `
    <button class="btn btn-danger mt-3" type="button" onclick="showDataUser()">Cancelar</button>`

}


function getBase64Image(img){
    var canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;

    var ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);

    var dataURL = canvas.toDataURL("image/png");
    console.log(dataURL);

    return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
}

document.addEventListener("DOMContentLoaded", function (e) {

    (function () {'use strict'
        var forms = document.querySelectorAll('.needs-validation');
        Array.prototype.slice.call(forms).forEach(function (form) {
            document.getElementById("btn-submit").addEventListener('click', function (event) {
                if (!form.checkValidity()) {
                    event.preventDefault()
                    event.stopPropagation()
                }
                let firstName = document.getElementById("firstName").value; 
                let secondName = document.getElementById("secondName").value;
                let lastName = document.getElementById("lastName").value;
                let middName = document.getElementById("middleName").value;
                let email = document.getElementById("email").value;
                let fono = document.getElementById("fono").value;
                let yearsOld = document.getElementById("yearsOld").value;
                if(document.getElementById("formFile").value != ``){
                    sessionStorage.setItem("img", document.getElementById("formFile").value)
                }
                addData(firstName, secondName, lastName, middName, email, fono, yearsOld)
                form.classList.add('was-validated')

            }, false)    
        })
    })()
    showDataUser();

    document.getElementById("btnVeriPass").addEventListener("click", function(e){
        let pass = document.getElementById("passUser").value;
        if(pass === sessionStorage.getItem('pass')){
            editProfile()
            document.getElementById("closeVeri").click()
        }else{
            alert("su pass esta mal")
        }
    })
});