import express from 'express';
import { WebPayController } from '../controller/webpay.controller';
const app = express()
const PORT : string|number = process.env.PORT || 4000;

app.use("/",(req, res) =>{
    res.send("<h1>Welcome to your simple server! Awesome right</h1>");
});

app.get('/create', WebPayController.createTransaction);

app.listen(PORT,() => console.log(`hosting ${PORT}`));