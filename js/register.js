document.addEventListener("DOMContentLoaded", function (e) {

    (function () {'use strict'
        var forms = document.querySelectorAll('.needs-validation');
        Array.prototype.slice.call(forms).forEach(function (form) {
            document.getElementById("btn-submit").addEventListener('click', function (event) {
                console.log("hola")
                if (!form.checkValidity()) {
                    event.preventDefault()
                    event.stopPropagation()
                }
            }, false)    
        })
    })()
})