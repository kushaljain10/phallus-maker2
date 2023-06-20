const fs = import('fs');
import {generatePhallus} from './generate-phallus.js';
import {generateBro} from './generate-bro.js';
import express from 'express';
import cors from 'cors';
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());

app.get('/generate-phallus', generatePhallus)

app.get('/generate-bro', generateBro)

app.get('/', (req, res) => {
    res.send('Choo Choo! Welcome to your Express app 🚅');
})

app.listen(port, () => {
    console.log(`Phallus Maker listening on port ${port}`)
})