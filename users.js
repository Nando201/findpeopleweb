const { Router } = require("express")
const router = Router()
const users = []

class User{
    constructor(id){
        this.id = id
    }
    addNames(name,username){
        this.name = name
        this.username = username
    }
    addCoordinates(posX,posY){
        this.posX = posX
        this.posY = posY
    }

    addGender(gender){
        this.gender = gender
    }
}

router.get('/people', (req,res) => {
    const id = `${Math.random()}`
    const user = new User(id)
    users.push(user)
    console.log(users)
    res.send(id)
})


router.post('/newusers/:idAsignado', (req, res) => {

    const idUsuario = req.params.idAsignado || "";
    console.log("ID recibido:", idUsuario)
    
    const {name, username, male, female} = req.body || ""

    let nameExist = users.some(user => user.name === name)
    let usernameExist = users.some(user => user.username === username)

    let userIndex = users.findIndex(user => user.id === idUsuario)

    if(!nameExist && !usernameExist){
        users[userIndex].addNames(name,username)
        if(male == 'on'){
            users[userIndex].addGender('male')
        }else{
            users[userIndex].addGender('female')
        }
        console.log(users)
        res.json("Nuevo usuario añadido")
    }else{
        return res.status(400).json({error: "Username or name already exist"});
    }
})

router.post('/enlinea/:idAsignado', (req, res) =>{
    const idUsuario = req.params.idAsignado || "";
    console.log("ID recibido:", idUsuario)
    const {posX,posY} = req.body || ""

    const userIndex = users.findIndex(user => user.id === idUsuario)
    users[userIndex].addCoordinates(posX,posY)

    const usersConected = users.filter((user) => idUsuario !== user.id)
    res.json({usersConected})
})

module.exports = router