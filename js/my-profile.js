document.addEventListener('DOMContentLoaded', () => {
    productosCarrito = JSON.parse(localStorage.getItem("Carrito")) || [];
        // Calcular cantidad de productos en el carrito y actualizar el contador
        document.getElementById("cantidadProductos").innerHTML = productosCarrito.length;
        
    cargarDatos();
    
    // Manejar el evento de envío del formulario para guardar los datos del usuario
    document.getElementById('profileForm').addEventListener('submit', function (e) {
        e.preventDefault(); // Evitar el envío normal del formulario
        guardarDatos(); // Guardar los datos del formulario en localStorage
    });

    // Manejando el evento del switch para activar/desactivar el modo noche
    const moodSwitch = document.getElementById('moodSwitch');
    moodSwitch.addEventListener('change', function () {
        if (this.checked) {
            // Activar el modo noche y guardar la preferencia en localStorage
            document.body.classList.add('dark-mode');
            localStorage.setItem('dark-mode', 'true'); 
        } else {
            // Desactivar el modo noche y guardar la preferencia en localStorage
            document.body.classList.remove('dark-mode');
            localStorage.setItem('dark-mode', 'false'); // Guardar el estado en localStorage
        }
    });

    // Cargar la configuración de modo noche desde el localStorage al cargar la pagina
    const isDarkMode = localStorage.getItem('dark-mode') === 'true';
    moodSwitch.checked = isDarkMode;
    if (isDarkMode) {
        document.body.classList.add('dark-mode');
    }

    // Actualizar imagen de perfil en la interfaz si existe una guardada en el local storage
    cambiarFoto();
});

function cargarDatos() {
    const nombre = localStorage.getItem('nombre') || '';
    const apellido = localStorage.getItem('apellido') || '';
    const email = localStorage.getItem('email') || '';
    const foto = localStorage.getItem('fotoPerfil') || ''; // Obtener la imagen de perfil

    document.getElementById('nombre').value = nombre;
    document.getElementById('apellido').value = apellido;
    document.getElementById('email').value = email;

    // Actualizar la imagen de perfil si existe una imagegn en localStorage
    const fotoPerfil = document.getElementById('fotoPerfil');
    if (foto) {
        fotoPerfil.style.backgroundImage = `url(${foto})`;
    }
}

function guardarFoto(){
    // Obtener el archivo de la imagen seleccionada por el usuario
    const foto = document.getElementById('fotoInput').files[0]; 
    if (foto) {
        // Leer la imagen como base64 y guardarla en localStorage
        const reader = new FileReader();
        reader.onloadend = function () {
            localStorage.setItem('fotoPerfil', reader.result); // Guardar la imagen en base64
            cambiarFoto(); // Actualizar la imagen de perfil en la interfaz
        };
        reader.readAsDataURL(foto);
    } else {
        alert('Por favor, selecciona una imagen de perfil.');
    }
}

function guardarDatos() {
    // Obtener los datos del formulario de perfil y guardarlos en localStorage
    const nombre = document.getElementById('nombre').value;
    const apellido = document.getElementById('apellido').value;
    const email = document.getElementById('email').value;
    
    localStorage.setItem('nombre', nombre);
    localStorage.setItem('apellido', apellido);
    localStorage.setItem('email', email);

    guardarFoto()
}

function cambiarFoto() {
    // Cambiar la imagen de perfil en la interfaz con la imagen guardada en localStorage
    const fotoPerfil = document.getElementById('fotoPerfil');
    const foto = localStorage.getItem('fotoPerfil');
    if (foto) {
        fotoPerfil.style.backgroundImage = `url(${foto})`;
    }
}
