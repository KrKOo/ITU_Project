import express from 'express'
const router = express.Router();

router.get('/', function (req, res) {
  res.send('song')
});
router.get('/get', function (req, res) {
  res.send('get')
});
router.get('/upload', function (req, res) {
  res.send('upload')
})

export default router;

