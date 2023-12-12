document.addEventListener("DOMContentLoaded", function() {
   
    // Obtiene el elemento donde se mostrará el nombre
    var nombreUsuarioElement = document.getElementById("nombreUsuario");
    var correoUsuarioElement = document.getElementById("correoUsuario");
    var direccionUsuarioElement = document.getElementById("direccionUsuario");

    // Muestra el nombre de usuario y su correo en el elemento HTML
    nombreUsuarioElement.textContent = "Hola, " + usuario.nombre + "!";
    correoUsuarioElement.textContent = usuario.email;
    direccionUsuarioElement.textContent = usuario.direccion;
});