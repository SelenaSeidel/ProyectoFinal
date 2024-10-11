
document.addEventListener('DOMContentLoaded', function() {
    const moodSwitch = document.getElementById('moodSwitch');

    // Verifica el estado del toggle al cargar la página
    if (localStorage.getItem('dark-mode') === 'true') {
        document.body.classList.add('dark-mode');
        moodSwitch.checked = true; // Mantiene el estado del switch
    }

    // Cambia el modo claro/oscuro al hacer clic en el toggle
    moodSwitch.addEventListener('change', function() {
        if (this.checked) {
            document.body.classList.add('dark-mode');
            localStorage.setItem('dark-mode', 'true'); // Guarda la preferencia
        } else {
            document.body.classList.remove('dark-mode');
            localStorage.setItem('dark-mode', 'false'); // Guarda la preferencia
        }
    });
});
