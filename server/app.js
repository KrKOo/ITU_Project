import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import authRouter from './routes/auth.js';
import playlistRouter from './routes/playlist.js';
import songRouter from './routes/song.js';

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


app.use(express.static(path.join(path.resolve(), "..", "client", "build")));

app.use('/api/auth', authRouter);
app.use('/api/playlist', playlistRouter);
app.use('/api/song', songRouter);

export default app;
