const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));


const articleRoutes = require('./Routes/article');

app.use('/api/article', articleRoutes);

app.listen(5000, () => console.log('Server started on port 5000'));