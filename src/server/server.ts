
 
import express from 'express';
import * as bodyParser from 'body-parser';
import { WebPayController } from '../controller/webpay.controller';

const router = express.Router();
const app = express()
app.use(bodyParser.json());
const PORT : string|number = process.env.PORT || 4000;

function loggerMiddleware(request: express.Request, response: express.Response, next: any) {
    console.log(`${request.method} ${request.path}`);
    next();
}
 
app.use(loggerMiddleware);

app.get('/', (request, response) => {
    response.send({
      hostname: request.hostname,
      path: request.path,
      method: request.method,
    });
  });



app.get('/hello', (request, response) => {
    response.send('Hello world!');
});

app.get('/create', WebPayController.createTransaction);



app.use('/api', router);

app.listen(PORT,() => console.log(`hosting ${PORT}`));

//app.use('/', router);

/*
app.use("/",(req, res) =>{
    res.send("<h1>Hello Transbank</h1>");
});*/