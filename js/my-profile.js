cargarDatos();

    // Manejar el evento de envío del formulario
    document.getElementById('profileForm').addEventListener('submit', function (e) {
        e.preventDefault(); // Evitar el envío normal del formulario
        guardarDatos();
    });

    // Actualizar imagen de perfil usando local storage
    cambiarFoto();

function cargarDatos() {
    const user = localStorage.getItem('username');
    const email = localStorage.getItem(`${user}-email`);

    // Cargar email
    if (email) {
        document.getElementById('email').value = email;
    }

    // Cargar otros datos si existen
    const nombre = localStorage.getItem(`${user}-nombre`) || '';
    const segundoNombre = localStorage.getItem(`${user}-segundoNombre`) || '';
    const apellido = localStorage.getItem(`${user}-apellido`) || '';
    const segundoApellido = localStorage.getItem(`${user}-segundoApellido`) || '';
    const telefono = localStorage.getItem(`${user}-telefono`) || '';

    document.getElementById('nombre').value = nombre;
    document.getElementById('segundoNombre').value = segundoNombre;
    document.getElementById('apellido').value = apellido;
    document.getElementById('segundoApellido').value = segundoApellido;
    document.getElementById('telefono').value = telefono;
}

function guardarDatos() {
    // Validar campos obligatorios
    const nombre = document.getElementById('nombre').value.trim();
    const apellido = document.getElementById('apellido').value.trim();

    if (!nombre || !apellido) {
        alert("Por favor, completa todos los campos obligatorios.");
        return;
    }

    const segundoNombre = document.getElementById('segundoNombre').value.trim();
    const segundoApellido = document.getElementById('segundoApellido').value.trim();
    const email = document.getElementById('email').value.trim();
    const telefono = document.getElementById('telefono').value.trim();

    const user = localStorage.getItem('username');

    // Guardar datos en localStorage
    localStorage.setItem(`${user}-nombre`, nombre);
    localStorage.setItem(`${user}-segundoNombre`, segundoNombre);
    localStorage.setItem(`${user}-apellido`, apellido);
    localStorage.setItem(`${user}-segundoApellido`, segundoApellido);
    localStorage.setItem(`${user}-email`, email);
    localStorage.setItem(`${user}-telefono`, telefono);

    alert("Datos guardados correctamente.");
}

function guardarFoto() {
    const file = document.getElementById("subirFoto").files[0];
    if (file) {
        base64(file);
    } else {
        alert("Por favor, selecciona una imagen para subir.");
    }
}

function base64(file) {
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
        const user = localStorage.getItem('username');
        localStorage.setItem(`${user}-profileImage`, reader.result);
        cambiarFoto();
    };
    reader.onerror = function (error) {
        console.log('Error: ', error);
    };
}

function cambiarFoto() {
    const user = localStorage.getItem('username');
    const img = localStorage.getItem(`${user}-profileImage`);
    if (img) {
        document.getElementById("fotoPerfil").style.backgroundImage = "url(" + img + ")";
    } else {
        document.getElementById("fotoPerfil").style.backgroundImage = ""; // Si no hay imagen, limpiar el fondo
    }
}