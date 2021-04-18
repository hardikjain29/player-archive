import express, { Application, Request, Response } from 'express';
import { ProfileType, PlayerType } from '../frontend/src/types';
const cors = require('cors');

const PORT = 5000;


const app: Application = express();
app.use(cors());

app.get('/player/:id', (req: Request, res: Response): void => {
  try {
    const player: PlayerType = require(`./data/players/${req.params.id}.json`);
    res.json(player);
  }
  catch {
    res.sendStatus(404);
  }
});

app.get('/profile/:id', (req: Request, res: Response): void => {
  try {
    const profile: ProfileType = require(`./data/profile/${req.params.id}`);
    res.json(profile);
  }
  catch {
    res.sendStatus(404);
  }
});

app.listen(PORT, () => {
  console.log('server started at http://localhost:' + PORT);
});
