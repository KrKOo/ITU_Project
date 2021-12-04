import express from 'express'
const router = express.Router();

router.get('/', function (req, res) {
  res.send('playlist')
});
router.get('/addSong', function (req, res) {
  res.send('addSong')
});
router.get('/removeSong', function (req, res) {
  res.send('removeSong')
})

export default router;

