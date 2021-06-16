import express from 'express';
import * as bodyParser from 'body-parser';
 
function loggerMiddleware(request: express.Request, response: express.Response, next: any) {
    console.log(`${request.method} ${request.path}`);
    next();
}

class App {
  public app: express.Application;
  public port: number;
 
  constructor(controllers: any, port: any) {
    this.app = express();
    this.port = port;
 
    this.initializeMiddlewares();
    this.initializeControllers(controllers);
  }
 
  private initializeMiddlewares() {
    this.app.use(bodyParser.json());
    this.app.use(loggerMiddleware);
  }
 
  private initializeControllers(controllers: any) {
    controllers.forEach((controller: any) => {
      this.app.use('/', controller.router);
    });
  }
 
  public listen() {
    this.app.listen(this.port, () => {
      console.log(`App listening on the port ${this.port}`);
    });
  }
}
 
export default App;