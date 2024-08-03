const form = document.getElementById('form')
const inputName = document.getElementById('input-name')
const inputUsername = document.getElementById('input-username')
const inputMale = document.getElementById('input-male')
const inputFemale = document.getElementById('input-female')
const loginButton = document.getElementById('login-button')
const sectionLogin = document.getElementById('login')
const canvasSection = document.getElementById('lienzo-section')
const canvas = document.getElementById('canvas')
const divMessageError = document.getElementById('message-error')
const lienzo = canvas.getContext('2d')
const sonidoUsuarioNuevo = new Audio('../assets/sonido.mp3');
const pathMaleImage = '../assets/thumbnail.png'
const pathFemaleImage = '../assets/female.jpg'

let rutaImagen = ''
let pathImages = ''
let newUser = null
let usuariosConectados = []
let users = []
let nuevoUsuario
let idAsignado = null
let gender = ''


canvasSection.style.display = 'none'
let backgroundImage = new Image()
backgroundImage.src = '../assets/backgroundCanvas.jpg'
let anchoDeseado = window.innerWidth
let altoDeseado = window.innerHeight  

canvas.width = anchoDeseado
canvas.height = altoDeseado

let intervalo
let velocidadX
let velocidadY

asignacionIdIngreso()
form.addEventListener('submit', registroNuevoUsuario)


function aleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
} 



async function asignacionIdIngreso(){
    try{
        let response = await fetch(`http://localhost:8080/people`)
        if(!response.ok){
            throw new Error(`Error en la solicitud: ${response.status}`);
        }
        let id = await response.json()
        idAsignado = id
        console.log(idAsignado)
    }catch(err){
        console.error(err)
    }
}


async function registroNuevoUsuario(e){
    
    e.preventDefault()
    // Validar que los campos no estén vacíos
    if (inputName.value === '' || inputUsername.value === '') {
        alert('Por favor, completa todos los campos');
        return; // Detiene el envío del formulario
    }
    if(inputMale.checked){
        gender = 'male'
    }else if(inputFemale.checked){
        gender = 'female'
    }else{
        gender = 'other'
    }

    console.log(gender)
    
    let formData = new FormData(form)
    let urlEncodedData = new URLSearchParams(formData);

    console.log(urlEncodedData.toString())
    //Validar que no exista otro usuario igual, y lo añade
    try{
        let response = await fetch(`http://localhost:8080/newusers/${idAsignado}`,{
            method: 'POST',
            mode: 'cors',
            headers: {
                "Content-Type":  'application/x-www-form-urlencoded',
            },
            body: urlEncodedData.toString()
        })
        let data = await response.json()

        if(gender == 'male'){
            pathImages = pathMaleImage
        }else{
            pathImages = pathFemaleImage
        }
        newUser = new User(inputName.value, inputUsername.value,pathImages, idAsignado, gender)
        sectionLogin.style.display = 'none'
        canvasSection.style.display = 'flex'
        lienzo.clearRect(0, 0, canvas.width, canvas.height)
        intervalo = setInterval(pintarUsuariosCanvas, 50)
        if(!response.ok){
            divMessageError.style.display = 'flex'
            divMessageError.textContent = data.error
            throw new Error(`Error en la solicitud: ${response.status}`);
        }
    }catch(err){
        console.error(err)
    }
    
}

async function enviarYObtenerCoordenadas(){
    try{
        let response = await fetch(`http://localhost:8080/enlinea/${idAsignado}`,{
            method: 'POST',
            mode: 'cors',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                posX: newUser.posX,
                posY: newUser.posY
            })
        })
        if(!response.ok){
            throw new Error(`Error en la solicitud: ${response.status}`);
        }
        let {usersConected} = await response.json() //Usuarios y sus coordenadas
        usuariosConectados = usersConected
        console.log(usuariosConectados)
    }catch(err){
        console.error(err)
    }
}

function crearYPintarUsuarios(){
    
    let nombreUsuario = ''
    let usuariosFiltrados = usuariosConectados.filter((user) => user.name !== undefined)
    usuariosFiltrados.forEach(user => {
        nombreUsuario = user.name
        if(user.gender == 'male'){
            rutaImagen = pathMaleImage
        }else{
            rutaImagen = pathFemaleImage
        }
        nuevoUsuario = new User(user.name, user.username, rutaImagen, user.id, user.gender)
        //Verificar si existe
        let userExist = users.some(usuario => usuario.name === nombreUsuario);
        // Si no existe, añadir al array
        if (!userExist) {
            users.push(nuevoUsuario);
            sonidoUsuarioNuevo.play();
        }
        let userIndex = users.findIndex(usuario => usuario.name === nombreUsuario)
        if(userIndex >= 0){
            users[userIndex].posX = user.posX
            users[userIndex].posY = user.posY
        }
        users[userIndex].pintarUsuario()
    })
}

function pintarUsuariosCanvas(){
    enviarYObtenerCoordenadas() //Para enviar mis coordenadas y obtener las de los otros usuarios
    newUser.pintarUsuario()
    crearYPintarUsuarios()
}


