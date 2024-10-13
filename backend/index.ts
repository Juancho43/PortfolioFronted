
const mongoose = require('mongoose');
const express = require('express');
const app = express();
const port = 3000;


mongoose.connect('mongodb://localhost:27017/portfolio', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});



app.listen(port, () => {
    console.log(`Servidor escuchando en el puerto ${port}`);
});

app.get('/', ()=>{});