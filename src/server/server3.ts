import PostsController from '../controller/posts.controller';
import App from './app';
const PORT : string|number = process.env.PORT || 4000;
 
const app = new App(
  [
    new PostsController(),
  ],
  PORT,
);
 
app.listen();