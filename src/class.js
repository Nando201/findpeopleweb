class User{
    constructor(name, username, img, id = null){
        this.name = name
        this.username = username
        this.img = new Image()
        this.img.src = img
        this.id = id
        this.width = 60
        this.height = 60
        this.posX =  aleatorio(0, canvas.width - this.width)
        this.posY =  aleatorio(0, canvas.height - this.height)
    }
    pintarUsuario(){
        lienzo.drawImage(
          this.img,
          this.posX,
          this.posY,
          this.width,
          this.height
        )
      }
}