import express from 'express';
import cors from 'cors';
import testRedis from './TestRedis.ts';

const app = express();
app.use(cors());

app.get('/api/products', (req, res) => {
    res.json([
        { id: 1, name: 'Laptop' },
        { id: 2, name: 'Phone' },
    ]);
});

app.listen(3001, () => {
    console.log('API running on http://localhost:3001');
    testRedis();
});
