cargarDatos();

// Manejar el evento de envío del formulario
document.getElementById('profileForm').addEventListener('submit', function (e) {
    e.preventDefault(); // Evitar el envío normal del formulario
    guardarDatos();
});

// Actualizar imagen de perfil usando local storage
cambiarFoto();

// Manejar el cambio del interruptor de modo noche
const moodSwitch = document.getElementById('moodSwitch');
moodSwitch.addEventListener('change', function() {
    if (this.checked) {
        document.body.classList.add('dark-mode'); // Agregar clase para modo oscuro
        localStorage.setItem('darkMode', 'true'); // Guardar estado en localStorage
    } else {
        document.body.classList.remove('dark-mode'); // Remover clase para modo oscuro
        localStorage.setItem('darkMode', 'false'); // Guardar estado en localStorage
    }
});

// Cargar estado del modo noche al cargar la página
function cargarModoNoche() {
    const darkMode = localStorage.getItem('darkMode');
    if (darkMode === 'true') {
        moodSwitch.checked = true; // Activar el interruptor
        document.body.classList.add('dark-mode'); // Aplicar modo oscuro
    }
}

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

    cargarModoNoche(); // Cargar estado del modo noche
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
        document.getElementById("fotoPerfil").style.backgroundImage = "url('" + reader.result + "')";
        localStorage.setItem("fotoPerfil", reader.result); // Guardar la imagen en localStorage
    };
}

function cambiarFoto() {
    const fotoPerfil = localStorage.getItem("fotoPerfil");
    if (fotoPerfil) {
        document.getElementById("fotoPerfil").style.backgroundImage = "url('" + fotoPerfil + "')";
    }
}