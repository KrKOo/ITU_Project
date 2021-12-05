import knex from '../db/connection.js';
import path from 'path';
import express from 'express'
const router = express.Router();

router.get('/getAll', function (req, res) {
  knex('song')
    .select('name', 'argist', 'album', 'username', 'id')
    .then(
      (data) => {
        res.send(data);
      }
    )
    .catch(e => {
      console.error(e);
      res.sendStatus(500);
    })
});

router.get('/getInfoById', function (req, res) {
  const songID = req.query.id;

  knex('song')
    .select('name', 'artist', 'album', 'username')
    .where({ id: req.query.id })
    .then(
      (data) => {
        res.send(data);
      }
    ).catch(e => {
      console.error(e);
      res.sendStatus(500);
    })

});


router.get('/getFileById', function (req, res) {
  let filepath;
  knex('song').select('path').where({ id: req.query.id }).then((data) => {
    filepath = data[0].path;
    console.log(data)

    const file = path.join(path.resolve(), 'musicFiles', filepath)

    res.download(file);
  }).catch(e => {
    console.error(e);
    res.sendStatus(500);
  })


});

router.get('/search', function (req, res) {
  const songName = req.query.name;
  console.log(songName);

  knex('song')
    .select('name', 'artist', 'album', 'username', 'id')
    .where('name', 'like', `%${songName}%`)
    .then(
      (data) => {
        return res.send(data);
      }
    )
    .catch(e => {
      console.error(e);
      res.sendStatus(500);
    })

});


router.post('/upload', function (req, res) {
  const songName = req.body.name;
  const username = req.body.username;
  const artist = req.body.artist;
  const album = req.body.album;
  const file = req.files.file;

  const uploadPath = path.join(path.resolve(), 'musicFiles', songName + path.extname(file.name))

  file.mv(uploadPath, function (err) {
    if (err)
      return res.status(500).send(err);

    knex('song')
      .insert({ name: songName, username: username, artist: artist, album: album, path: songName + path.extname(file.name) })
      .then((data) => console.log(data))
    res.sendStatus(200);
  });
});

export default router;

