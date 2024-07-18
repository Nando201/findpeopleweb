const { Router } = require("express")
const router = Router()
const users = []

class User{
    constructor(name, username, id){
        this.id = Math.random()
    }
}

router.get('/people', (req,res) => {
    const user = new User()
    users.push(user)
    console.log(users)
    res.json({
        id:user.id
    })
})

module.exports = router