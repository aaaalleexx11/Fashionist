document.getElementById('registroButton').addEventListener('click', function () {
    registroUser();
});

function registroUser() {
    // Obtén los valores de correo electrónico y contraseña 
    var nombre = document.getElementById('nombre').value;
    var direccion = document.getElementById('direccion').value;
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;

    // Valida los campos (puedes agregar más validaciones según tus requisitos)
    if (email === '' || password === '' || nombre === '' || direccion === '') {
        alert('Por favor, completa todos los campos.');
        return;
    }

    // Redirige a otra página o realiza otras acciones después de iniciar sesión
    window.location.href = 'home.html';
}
