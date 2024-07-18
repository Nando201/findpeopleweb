const express = require('express')
const morgan = require("morgan");
const cors = require("cors");
const PORT = process.env.PORT || 8080;
const app = express()

app.use(cors());
app.use(morgan("dev")); //Registrador de solicitudes HTTP
app.use(express.json());
app.use(express.urlencoded({extended:false}))

app.use('/', require('./users.js'))

app.listen(PORT , () =>{
    console.log('Servidor funcionando')
})