/* Projekt: Tvorba uživatelských rozhraní - Music player
 *
 * Autori: Kristian Kovac (xkovac61)
 *
 */

import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import logger from 'morgan';
import fileUpload from 'express-fileupload';

import authRouter from './routes/auth.js';
import playlistRouter from './routes/playlist.js';
import songRouter from './routes/song.js';

const app = express();

app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(fileUpload());


app.use(express.static(path.join(path.resolve(), "..", "client", "build")));


app.use('/api/auth', authRouter);
app.use('/api/playlist', playlistRouter);
app.use('/api/song', songRouter);

app.get('*', (req, res) => {
  res.sendFile(path.resolve(path.join(path.resolve(), "..", "client", "build", "index.html")));
});

export default app;
