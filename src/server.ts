import express from 'express';
const app = express()
const PORT : string|number = process.env.PORT || 4000;

app.use("*",(req, res) =>{
    res.send("<h1>Hello Transbank</h1>");
});

app.listen(PORT,() => console.log(`hosting ${PORT}`));