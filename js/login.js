document.addEventListener("DOMContentLoaded", function () {
     // Esperamos que el contenido de la página se haya cargado antes de ejecutar el código
    let boton = document.getElementById("regBtn");
    // Asignamos un evento de clic al botón de registro
    boton.addEventListener("click", function () { 
        let usuario=document.getElementById("nombreUsuario");
        let contraseña=document.getElementById("password");
        if (usuario.value=="" || contraseña.value==""){
            alert("Hay campos sin llenar");
        }else{
            localStorage.setItem('username', usuario.value);
            localStorage.setItem('authenticated', 'true'); 
            location.replace("index.html");
            // Redirigimos a la página de inicio
        }
    })
})
