
// Función para verificar si el usuario está autenticado
// Si no lo está, lo redirige a la página de login
function checkAuthentication() {
    
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
