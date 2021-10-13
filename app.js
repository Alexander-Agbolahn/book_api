const express = require('express');
const restApi = require('./src/restApi');

const app = express();
const PORT = 6000;

app.use(express.json());
app.use('/api/v1', restApi);

app.listen(PORT, () => console.log(`App listening on port ${PORT}`));