require('dotenv').config();
const express = require('express');
const routes = require('./routes');
const cors = require('cors');
require('./database');

const app = express();

app.use(cors());
app.use(express.json({limit: '5mb'}));
app.use(routes);

app.use((req, res, next) =>{
    const error = new Error('Rota não encontrada');
    error.status = 404;
    next(error);
})

app.use((error, req, res, next) => {
    res.status(error.status || 500)
    res.json({ error: error.message })
})

app.listen(process.env.PORT);