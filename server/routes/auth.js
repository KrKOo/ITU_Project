import express from 'express'
import knex from '../db/connection.js';

const router = express.Router();

router.post('/login', function (req, res) {
  const username = req.body.username;
  const password = req.body.password;

  knex('user')
    .select('username')
    .where({ username: username, password: password })
    .then((users) => {
      if (users.length > 0) {
        res.send({ username: username });
      }
      else {
        res.sendStatus(401);
      }
    })
    .catch((e) => {
      console.error(e);
      res.sendStatus(401);
    })

});

router.post('/register', function (req, res) {
  const username = req.body.username
  const password = req.body.password;
  const email = req.body.email;

  knex('user')
    .insert({ email: email, username: username, password: password })
    .then(() => {
      res.sendStatus(200)
    })
    .catch((e) => {
      console.error(e);
      res.sendStatus(500);
    })
});

export default router;

