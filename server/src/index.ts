import * as express from "express";
const profilesData = require('./profiles');

import config from './config/app.config';
import Profiles from "./profiles.service";


const app: express.Application = config(express());
const profiles = new Profiles(profilesData);


const pattern = '([a-z/0-9/-]+){0,36}';


// get all profiles
app.get('/profiles', function(req, res) {
  const { result } = profiles.getProfiles();
  result ? res.send(result) : res.sendStatus(404);
});

// get profile by given id
app.get(`/profiles/:id(${pattern})`, function (req, res) {
  const { result } = profiles.getProfile(req.params.id);
  result ? res.send(result) : res.sendStatus(404);
});

// add new profile
app.post('/profiles', function (req, res) {
  const { result } = profiles.addProfile(req.body);
  result ? res.send({result}) : res.sendStatus(422);
});

// Update profile with given id
app.put('/profiles', function(req, res) {
  const { id, ...userData } = req.body;
  
  const { result, error } = profiles.updateProfile(id, userData);
  if ( error ) return res.sendStatus(422);

  result ? res.send(result) : res.sendStatus(404);
});

// Remove profile with given id
app.delete('/profiles/:id', function(req, res) {
  const { id } = req.params;
  const { result } = profiles.removeProfile(id);
  result ? res.send({ result }) : res.sendStatus(404);
});




app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});