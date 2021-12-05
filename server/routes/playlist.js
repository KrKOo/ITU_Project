import express from 'express'
import knex from '../db/connection.js';
import path from 'path';
const router = express.Router();

router.post('/create', function (req, res) {
  const name = req.body.name;
  const userID = req.body.userID;
  const file = req.files.image;

  const uploadPath = path.join(path.resolve(), 'playlistImages', file.name)

  file.mv(uploadPath, function (err) {
    if (err)
      return res.status(500).send(err);

    console.log(name, userID, file.name)

    knex('playlist')
      .insert({ name: name, userId: userID, imagePath: file.name })
      .then((data) => res.sendStatus(200))
      .catch((e) => {
        console.error(e);
        res.sendStatus(500);
      })

  });
});

router.get('/getByUserId', function (req, res) {
  const userID = req.query.id;
  knex('playlist')
    .select('id', 'name', 'userId')
    .where({ userId: userID })
    .then(
      (data) => {
        res.send(data);
      }
    ).catch(e => {
      console.error(e);
      res.sendStatus(500);
    })
});

router.get('/getImageById', function (req, res) {
  let filepath;
  knex('playlist').select('imagePath').where({ id: req.query.id }).then((data) => {
    filepath = data[0].imagePath;
    console.log(data)

    const file = path.join(path.resolve(), 'playlistImages', filepath)

    res.download(file);
  }).catch(e => {
    console.error(e);
    res.sendStatus(500);
  })

});

router.post('/addSong', function (req, res) {
  const songID = req.body.songID;
  const playlistID = req.body.playlistID;

  knex('playlistSong').insert({ songId: songID, playlistId: playlistID }).then((data) => {
    res.sendStatus(200);
  }).catch(e => {
    console.error(e);
    res.sendStatus(500);
  })
});
router.post('/removeSong', function (req, res) {
  const songID = req.body.songID;
  const playlistID = req.body.playlistID;

  knex('playlistSong').del().where({ songId: songID, playlistId: playlistID }).then((data) => {
    res.sendStatus(200);
  }).catch(e => {
    console.error(e);
    res.sendStatus(500);
  })
})

router.get('/getAllSongs', function (req, res) {
  const playlistID = req.query.id;

  knex('playlistSong')
    .leftJoin('song', 'playlistSong.songId', 'song.id')
    .select('song.id',
      'song.username',
      'song.name',
      'song.artist',
      'song.album',
      'playlistSong.playlistId')
    .where({ playlistId: playlistID })

    .then(
      (data) => {
        res.send(data);
      }
    )
    .catch(e => {
      console.error(e);
      res.sendStatus(500);
    })
})

export default router;

