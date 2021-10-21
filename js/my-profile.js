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
    for (let i = 0; i < data.length; i++) {
        const datos = data[i];
        if(data){
            document.getElementById("firstName").value = datos.firstName;
            document.getElementById("secondName").value = datos.secondName;
            document.getElementById("lastName").value = datos.lastName;
            document.getElementById("middleName").value = datos.middleName;
            document.getElementById("email").value = datos.email;
            document.getElementById("fono").value = datos.fono;
            document.getElementById("yearsOld").value = datos.yearsOld;
            
            document.getElementById("edit").innerHTML = `
            <button class="btn btn-success mt-3" id="btnEdit" data-toggle="modal" data-target="#contidionsModal" type="button" onclick="editProfile()">Editar datos</button>
            `
            muteDataProfile();
        }
    }
}

function muteDataProfile(){
    document.getElementById("firstName").disabled = true;
    document.getElementById("secondName").disabled = true;
    document.getElementById("lastName").disabled = true;
    document.getElementById("middleName").disabled = true;
    document.getElementById("email").disabled = true;
    document.getElementById("fono").disabled = true;
    document.getElementById("yearsOld").disabled = true;
}

function editProfile(){
    document.getElementById("firstName").disabled = false;
    document.getElementById("secondName").disabled = false;
    document.getElementById("lastName").disabled = false;
    document.getElementById("middleName").disabled = false;
    document.getElementById("email").disabled = false;
    document.getElementById("fono").disabled = false;
    document.getElementById("yearsOld").disabled = false;

    document.getElementById("edit").innerHTML = `
    <button class="btn btn-danger mt-3" type="button" onclick="showDataUser()">Cancelar</button>`

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
                addData(firstName, secondName, lastName, middName, email, fono, yearsOld)
                form.classList.add('was-validated')

            }, false)    
        })
    })()
    showDataUser();
});