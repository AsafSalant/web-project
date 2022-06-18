const express = require('express')
const app = express()
const port = 3000

app.use(express.static('../public',{extensions: ['html', 'htm']}))

app.listen(port, (req,res) => {
    console.log('Goood run')
});