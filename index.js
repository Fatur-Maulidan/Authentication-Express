const express = require('express');
const connection = require('./configs/connection');
const bodyParser = require('body-parser');
const UserRoutes = require('./routes/userRoutes');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors())
app.use('/api/users', UserRoutes);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});