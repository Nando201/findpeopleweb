class User{
    constructor(name, username, imagen, id = null, gender){
        this.name = name
        this.username = username
        this.imagen = new Image()
        this.imagen.src = imagen
        this.id = id
        this.width = 60
        this.height = 60
        this.gender = gender
        this.posX =  aleatorio(0, canvas.width - this.width)
        this.posY =  aleatorio(0, canvas.height - this.height)
    }
    pintarUsuario(){
        lienzo.drawImage(
          this.imagen,
          this.posX,
          this.posY,
          this.width,
          this.height
        )
      }
}