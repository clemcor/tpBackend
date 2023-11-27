require('dotenv').config();
const express = require('express');
const app = express();
const port =3000
const bodyParser = require('body-parser');
const getRouter = require('./src/loader/routes');

//connection a la Bdd
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://student:ensim@clusterdpe.dly181i.mongodb.net/dpe?retryWrites=true&w=majority').then(()=> console.log('Connected'));





app.use(bodyParser.json());

app.use(getRouter());

app.listen(port, () => {
    console.log(`app listening at http://localhost:${port}`)
})

