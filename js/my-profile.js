
document.addEventListener('DOMContentLoaded', function () {
    /*const moodSwitch = document.getElementById('moodSwitch');

    // Verifica el estado del toggle al cargar la página
    if (localStorage.getItem('dark-mode') === 'true') {
        document.body.classList.add('dark-mode');
        moodSwitch.checked = true; // Mantiene el estado del switch
    }

    // Cambia el modo claro/oscuro al hacer clic en el toggle
    moodSwitch.addEventListener('change', function () {
        if (this.checked) {
            document.body.classList.add('dark-mode');
            localStorage.setItem('dark-mode', 'true'); // Guarda la preferencia
        } else {
            document.body.classList.remove('dark-mode');
            localStorage.setItem('dark-mode', 'false'); // Guarda la preferencia
        }
    });*/

    // Actualizar imagen de perfil usando local storage
    cambiarFoto()
});

function guardarFoto() {
    const file = document.getElementById("subirFoto").files[0]
    base64(file)
}

function base64(file) {
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
        user = localStorage.getItem('username')
        localStorage.setItem(`${user}-profileImage`, reader.result)
        cambiarFoto()
    };
    reader.onerror = function (error) {
        console.log('Error: ', error);
    };
}

function cambiarFoto(){
    const user = localStorage.getItem('username')
    const img = localStorage.getItem(`${user}-profileImage`);
    document.getElementById("fotoPerfil").style.backgroundImage = "url("+ img +")";
}