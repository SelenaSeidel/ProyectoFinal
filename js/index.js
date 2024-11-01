function checkAuthentication() {
    // Comprobar si el usuario está autenticado
    if (localStorage.getItem('authenticated') !== 'true') {
        window.location.href = 'login.html'; // Redirigir a la página de login si no está autenticado
    }
}
document.addEventListener("DOMContentLoaded", function(){
    checkAuthentication();

    document.getElementById("autos").addEventListener("click", function() {
        localStorage.setItem("catID", 101);
        window.location = "products.html"
    });
    document.getElementById("juguetes").addEventListener("click", function() {
        localStorage.setItem("catID", 102);
        window.location = "products.html"
    });
    document.getElementById("muebles").addEventListener("click", function() {
        localStorage.setItem("catID", 103);
        window.location = "products.html"
    });

    
});
