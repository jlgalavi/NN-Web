console.clear();

import database from "../database.js";
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';

//Configuración inicial
const app = express();
app.set('port', 4000);
app.listen(app.get('port'));
console.log("escuchando en el puerto "+ app.get('port'));

//middlewares
app.use(cors({
    origin: ["http://127.0.0.1:5501", "http://127.0.0.1:5500"] //para poder acceder a la api desde localhost
}));
app.use(morgan('dev'));
app.use(express.json());

//Rutas
app.get("/envios", async (req, res) => {
    const connection = database;
    const result = await connection.query("SELECT * FROM envio");
    res.json(result);
});

app.post("/pedido", async (req, res) => {
    if(req.body && req.body.length > 0){
        let TotalPrice = 0;
        req.body.forEach(producto => {
            console.log(producto);
        });
        console.log(TotalPrice);
        console.log("Pedido recibido");
        return res.sendStatus(200);
    }
    res.sendStatus(400);
});