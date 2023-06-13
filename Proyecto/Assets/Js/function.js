
//signos los cuales no entiendo pero sirven pa validar cosas 
// esta constante actua como un objeto
const expresiones = {
    Eusuario: /^[A-ZÑa-zñáéíóúÁÉÍÓÚ'° ]+$/,
    Egmail:/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/,
    Econtraseña:/^(?=(.*[0-9]))(?=.*[\!@#$%^&*()\\[\]{}\-_+=|:;"'<>,./?])(?=.*[a-z])(?=(.*)).{6,}/,
}


//function para ingresar los datos del formulario al localstorage
function registrar(){
    // queryselector es selector abierto, seleccionas como si fuese css
    let nombre=document.querySelector('#nombre').value
    let gmail=document.querySelector('#gmail').value
    let contraseña= document.querySelector('#contraseña').value
    let contraseña2 = document.querySelector('#contraseña2').value
    validacion()
    // esta function valida si los datos son compatibles con las expresiones regulares
    function validacion(){
        //si el nombre y el gmail son validos entonces verificara la siguiente
        if(expresiones.Eusuario.test(nombre)&expresiones.Egmail.test(gmail))
        {
            //si la contraseña es valida y es identica a la contraseña2 entonces guardara los datos en local storage
            if(expresiones.Econtraseña.test(contraseña)&&contraseña==contraseña2)
            {
                // LocalStorage.setItem = agrega un item nuevo al local storage, lo que va entre comillas
                // es el nombre con el q lo puedes llamar en otra parte del codigo y lo q esta alado
                // es el valor q tendra
                localStorage.setItem('Nombre',nombre)
                localStorage.setItem('Gmail',gmail)
                localStorage.setItem('Contraseña',contraseña)
                alert("Datos Guardados con exito")
                setTimeout(
                    window.location.href= 'index.html'
                ,10000)
            }
            //si la contraseña es simple o no se parecen suelta una alerta
            else
            alert("La contraseña es muy simple o no se parecen")
        }
        //si el gmail o el nombre son invalidos suelta una alerta
        else
        alert("El Gmail o el nombre son invalidos")
        
    }
    
}


//Con esta function se verifica si los datos ingresados al formulario
// son similares a los q estan en local storage
function iniciodesesion(){ 
    // Localstora.getItem = Esta llama a los datos que esten en el local estorage
    let Lnombre= localStorage.getItem('Nombre');
    let Inombre = document.getElementById('Inombre').value;
    let Lcontraseña = localStorage.getItem('Contraseña');
    let Icontraseña = document.getElementById('Icontraseña').value;
    if(Lnombre == Inombre && Lcontraseña == Icontraseña)
    {
        window.location.href='CryptLobby.html'
    }
    else
        alert('Los datos ingresados no estan registrados')

}

// Cierre de sesion
const cerrar = document.getElementById('cerrar')
function cerrarsesion(){

    localStorage.setItem('Contraseña','');
    localStorage.setItem('Nombre','');
    localStorage.setItem('Gmail','');
    verificarusuario();
}
cerrar.addEventListener('click',cerrarsesion);

//Efecto del boton para cerrar sesion con css y js
const candado1 = document.getElementById('candado1')
const candado2 = document.getElementById('candado2')
// function para aparecer el primer candado y desaparecer el segundo
function aparecer(){
    candado1.style.display='none';
    candado2.style.display='block';
    candado1.style.transition='0.5s';
    candado2.style.transition='0.5s';
}
//addEventListener agrega un evento ya sea de teclado mause o otras acciones hay una lista de ellos
cerrar.addEventListener('mouseover',aparecer)
// function para aparecer el primer candado y desaparecer el primero
function desaparecer(){
    candado1.style.display='block';
    candado2.style.display='none';
    candado1.style.transition='0.5s';
    candado2.style.transition='0.5s';
}

cerrar.addEventListener('mouseout',desaparecer)

