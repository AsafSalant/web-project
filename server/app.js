const express = require('express')
const bodyParser = require('body-parser');
const app = express()
const port = 3000

app.use(express.static('../client',{extensions: ['html', 'htm']}))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.post("/booking",(req,res) => {
    console.log(req.body);
});

app.listen(port, (req,res) => {
    console.log('Goood run')
});