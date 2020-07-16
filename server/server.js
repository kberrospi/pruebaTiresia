const express = require('express');
const mysql = require('mysql');
const cors = require('cors')
const bodyParser = require('body-parser');
const app = express();
const fecth = require('node-fetch');

app.use(bodyParser.json());
app.use(cors());
const port = 3001

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'mydb'
  });

connection.connect(function(err){
    if (err) return err
    console.log('DB conectada')
});

app.listen(port,()=>{
    console.info(`server is running on port ${port}`);
})

console.log();

app.get('/paises', async (req, res)=>{
    const resp = await fecth('http://battuta.medunes.net/api/country/all/?key=bb6db4348a3f4f77141ed21b2cc7c220');
    const respjson = await resp.json();
    res.send( JSON.stringify(respjson));
});

app.get('/departamentos/:code', async (req, res) => {
    let cod = req.params.code
    const resp = await fecth(`http://battuta.medunes.net/api/region/${cod}/all/?key=bb6db4348a3f4f77141ed21b2cc7c220`);
    const respjson = await resp.json();
    res.send( JSON.stringify(respjson));
});

app.get('/ciudad/:pais/:dep', async (req, res) => {
    let pais = req.params.pais
    let dep = req.params.dep
    const resp = await fecth(`http://battuta.medunes.net/api/city/${pais}/search/?region=${dep}&key=bb6db4348a3f4f77141ed21b2cc7c220`);
    const respjson = await resp.json();
    res.send( JSON.stringify(respjson));
});

app.post('/cliente',async (req,res)=>{
    let cod = req.body.pais
    const resp = await fecth(`http://battuta.medunes.net/api/country/code/${cod}/?key=bb6db4348a3f4f77141ed21b2cc7c220`);
    const respjson = await resp.json();
    let pais = respjson[0].name;

     connection.query('INSERT INTO clientes SET ? ',{
        identificacion: req.body.identificacion,
        nombre: req.body.nombre,
        telefono: req.body.telefono,
        direccion_res: req.body.direccion_res,
        pais: pais,
        departamento: req.body.departamento,
        ciudad: req.body.ciudad
    }, (err, data)=>{
        if(err) return res.json(err)
        return res.json('Cliente creado')
    })
})

app.get('/clientes',(req, res)=>{
    connection.query('SELECT * FROM clientes', (err, data)=>{
        if(err) return res.json(err)
        return res.send(JSON.stringify(data))
    })
});