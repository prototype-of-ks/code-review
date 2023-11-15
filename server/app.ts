import express from 'express';
import { join } from 'path';

const app = express();

app.use(express.static(join(__dirname, 'public')));

app.listen(4000, () => {
    console.log('Your server is running at http://localhost:4000');
});