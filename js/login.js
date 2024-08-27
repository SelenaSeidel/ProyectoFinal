document.addEventListener("DOMContentLoaded", function () {
    /*Para que no haya campos vacios al apretar el boton */
    let boton = document.getElementById("regBtn");
    boton.addEventListener("click", function () {  //al hacer click
        let usuario=document.getElementById("nombreUsuario");
        let contraseña=document.getElementById("password");
        if (usuario.value=="" || contraseña.value==""){
            alert("Hay campos sin llenar");
        }else{
            localStorage.setItem('username', usuario.value);
            localStorage.setItem('authenticated', 'true'); /*desafíate*/
            location.replace("index.html");
            /*redirecciona*/
           
       
        }
    })
})
