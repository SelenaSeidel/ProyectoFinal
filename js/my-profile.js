document.addEventListener('DOMContentLoaded', () => {
    cargarDatos();
    
    // Manejar el evento de envío del formulario
    document.getElementById('profileForm').addEventListener('submit', function (e) {
        e.preventDefault(); // Evitar el envío normal del formulario
        guardarDatos();
    });

    // Manejando el switch de modo noche
    const moodSwitch = document.getElementById('moodSwitch');
    moodSwitch.addEventListener('change', function () {
        if (this.checked) {
            document.body.classList.add('dark-mode');
            localStorage.setItem('dark-mode', 'true'); // Guardar el estado en localStorage
        } else {
            document.body.classList.remove('dark-mode');
            localStorage.setItem('dark-mode', 'false'); // Guardar el estado en localStorage
        }
    });

    // Cargar la configuración de modo noche desde el localStorage
    const isDarkMode = localStorage.getItem('dark-mode') === 'true';
    moodSwitch.checked = isDarkMode;
    if (isDarkMode) {
        document.body.classList.add('dark-mode');
    }

    // Actualizar imagen de perfil usando local storage
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

    // Actualizar la imagen de perfil si existe
    const fotoPerfil = document.getElementById('fotoPerfil');
    if (foto) {
        fotoPerfil.style.backgroundImage = `url(${foto})`;
    }
}

function guardarFoto(){
    const foto = document.getElementById('fotoInput').files[0]; // Obtener la imagen seleccionada
    if (foto) {
        const reader = new FileReader();
        reader.onloadend = function () {
            localStorage.setItem('fotoPerfil', reader.result); // Guardar la imagen en base64
            cambiarFoto(); // Cambiar la foto de perfil
        };
        reader.readAsDataURL(foto);
    } else {
        alert('Por favor, selecciona una imagen de perfil.');
    }
}

function guardarDatos() {
    const nombre = document.getElementById('nombre').value;
    const apellido = document.getElementById('apellido').value;
    const email = document.getElementById('email').value;
    
    localStorage.setItem('nombre', nombre);
    localStorage.setItem('apellido', apellido);
    localStorage.setItem('email', email);

    guardarFoto()
}

function cambiarFoto() {
    const fotoPerfil = document.getElementById('fotoPerfil');
    const foto = localStorage.getItem('fotoPerfil');
    if (foto) {
        fotoPerfil.style.backgroundImage = `url(${foto})`;
    }
}
