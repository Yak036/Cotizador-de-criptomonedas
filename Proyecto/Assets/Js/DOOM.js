
// DOOM del index (pagina de LOGIN)

let Doom = document.getElementById('doom')
Doom.innerHTML='<div class="body"> <form class="container"> <h1>Iniciar sesión</h1> <!-- Nombre del Usuario --> <div class="quest"> <h3>Nombre y Apellido</h3> <i class="fa-solid fa-user" id="logo1"></i> <input type="text" placeholder="Ej. Ramces Vera" id="Inombre" class="nombre"> <!-- Clave del Usuario --> <h3>Contraseña</h3> <i class="fa-solid fa-lock" id="logo2"></i> <input type="password" id="Icontraseña" class="contraseña" placeholder="***********"> </div> <!-- Link a la pagina de registro --> <a href="registro.html">¿No tienes cuenta? Registrate</a> <input type="button" value="Iniciar" class="iniciar" onclick="iniciodesesion()"> </form> </div>';

