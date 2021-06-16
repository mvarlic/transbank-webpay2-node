import express from 'express';
import path from "path";
import { WebPayController } from './controller/webpay.controller';
const app = express()
const PORT : string|number = process.env.PORT || 4000;

app.set( "views", path.join( __dirname, "views" ) );
app.set( "view engine", "ejs" );
app.use(express.static(__dirname + '/public'));
/*
app.get("/",(req, res) =>{
    res.send("<h1>Welcome to your simple server! Awesome right</h1>");
});*/
app.get('/', function(req, res) {
    res.render('index');
});

app.get('/create', WebPayController.createTransaction);

app.listen(PORT,() => console.log(`hosting ${PORT}`));