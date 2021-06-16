# Simple deploy typescript application to Heroku 

https://dev.to/hte305/simple-deploy-typescript-application-to-heroku-5b6g

## Step 1. Making project root directory

```bash
mkdir simple-deploy-app-typescript-to-heroku
```

## Step 2. Initialize your directory as a node project 
automatic create new file package.json

```bash
cd simple-deploy-app-typescript-to-heroku
npm init -y 
```

## Step 3. Install required dependency using NPM
```bash
npm i @types/express @types/node express nodemon ts-node typescript
```

## Step 4. Configuring Typescript 
automatic for create new file tsconfig.json

```bash
sudo npm install typescript -g
```

```bash
tsc --init 
```
### Then add new line below compilerOptions object.

```bash
"include" : [
    "src/**/*.ts"   /* Include every ts file in source folder */
],
"exclude" : [
    "node_modules"  /* exclude everything in  node_modules */
]
```

## Step 5. Setting up server
Edit file package.json


```bash
"compilerOptions" : {
  //**/
},
"scripts": {
    "start": "ts-node src/config/server.ts",
    "dev": "nodemon -x ts-node src/config/server.ts"
},
```

## Step 6. Setting up server
Server script would live in src/config/server.ts

Create a new simple server with express now.
src/config/server.ts



```bash
import express from 'express';
const app = express()
const PORT : string|number = process.env.PORT || 4000;

app.use("*",(req, res) =>{
    res.send("<h1>Welcome to your simple server! Awesome right</h1>");
});

app.listen(PORT,() => console.log(`hosting @${PORT}`));

```


```bash
npm run dev
```
