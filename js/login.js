
document.addEventListener("DOMContentLoaded", function () {
    let boton = document.getElementById("regBtn");
    boton.addEventListener("click", function () {  //al hacer click 
        let usuario=document.getElementById("nombreUsuario");
        let contraseña=document.getElementById("password");
        if (usuario.value=="" || contraseña.value==""){
            alert("Hay campos sin llenar");
        }else{
            location.replace("index.html");
            
        }
    })
})

