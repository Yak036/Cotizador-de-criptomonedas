
// DOOM De la pagina de REGISTRO
let Doom2 = document.getElementById('doom2')
Doom2.innerHTML= '<div class="body"> <form class="container" id="registro"> <div class="quest"> <h1>Regístrate </h1> <h3>Nombre y Apellido</h3> <input type="text" placeholder="Ej. Ramces Vera" class="nombre" id="nombre"> <h3>Correo lectronico</h3> <input type="email" placeholder="Ej. ElBrayan@gmail.com" class="correo" id="gmail"> <h3>Contraseña</h3> <input type="password" class="contraseña" id="contraseña" placeholder="Debe contener numeros, letras y simbolos"> <h3>Confirmar contraseña</h3> <input type="password" class="contraseña2" id="contraseña2" placeholder="********"> </div> <input type="button" value="Registrarse" class="registro" id="btmregistrarpersonas" onclick="registrar()"> </form> </div>'
