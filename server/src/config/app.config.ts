import * as bodyParser from 'body-parser';
import * as express from "express";


export default function(app: express.Application) :express.Application {
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  return app; 
}