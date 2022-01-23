const express = require('express')
const multer = require("multer")
const app = express()
const upload = multer()
const routes = require("./routes/index")

app.use(express.json())

app.get('/',(req,res)=>{
    res.send('Yeah, Im working 2')
})

app.use(routes);

app.listen(3333, ()=> console.log('Executando'))