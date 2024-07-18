const form = document.getElementById('form')
const inputName = document.getElementById('input-name')
const inputUsername = document.getElementById('input-username')
const loginButton = document.getElementById('login-button')
const sectionLogin = document.getElementById('login')
const canvasSection = document.getElementById('lienzo')
const canvas = document.getElementById('canvas')
const lienzo = canvas.getContext('2d')
const allUsers = []
canvasSection.style.display = 'none'
let backgroundImage = new Image()
backgroundImage.src = '../assets/backgroundCanvas.jpg'
let anchoDeseado = window.innerWidth
let altoDesado = window.innerHeight 

canvas.width = anchoDeseado
canvas.height = altoDesado

let intervalo
let velocidadX
let velocidadY

form.addEventListener('submit', loginGame)

async function loginGame(e){
    e.preventDefault()
    // Validar que los campos no estén vacíos
    if (inputName.value === '' || inputUsername.value === '') {
        alert('Por favor, completa todos los campos');
        return; // Detiene el envío del formulario
    }
    formData = new FormData(form)
    urlEncodedData = new URLSearchParams(formData).toString();
    canvasSection.style.display = 'flex'
    sectionLogin.style.display = 'none'
    try{
        let response = await fetch(`http://localhost:8080/people`)
        if(!response.ok){
            throw new Error(`Error en la solicitud: ${response.status}`);
        }
        let {id} = await response.json()
        console.log(id)
    }catch(err){
        console.error(err)
    }
    const user = new User(inputName.value, inputUsername.value, '../assets/thumbnail.png', idAsignado)
    intervalo = setInterval(ingresoCanvas, 50)
}


async function ingresoCanvas(){
    try{
        let response = await fetch(`http://localhost:8080/people/conected/${user.id}`)
        if(!response.ok){
            throw new Error(`Error en la solicitud: ${response.status}`);
        }
        let usuariosConectados = await response.json()
        console.log(usuariosConectados)
    }catch(err){
        console.error(err)
    }
    lienzo.clearRect(0, 0, canvas.width, canvas.height)
    user.pintarUsuario()
}



function aleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }



