const express = require('express')
const app = express()
const port = 3000

app.use(express.static('../client',{extensions: ['html', 'htm']}))

app.listen(port, (req,res) => {
    console.log('Goood run')
});