import express, { Request, Response } from 'express';

const PORT = 5000;

const app = express();

app.get('/player/:id', (req: Request, res: Response) => {
  try {
    const player = require(`./data/players/${req.params.id}.json`);
    res.json(player);
  }
  catch {
    res.sendStatus(404);
  }
});

app.get('/profile/:id', (req: Request, res: Response) => {
  try {
    const profile = require(`./data/profile/${req.params.id}.json`);
    res.json(profile);
  }
  catch {
    res.sendStatus(404);
  }
});

app.listen(PORT, () => {
  console.log('server started at http://localhost:' + PORT);
});
