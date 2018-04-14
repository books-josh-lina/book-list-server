'use strict';

const express = require('express');
const cors = require('cors');
const pg = require('pg');

const app = express();
const PORT = process.env.PORT || 3000;
const CLIENT_URL = `https://books-josh-lina.github.io/book-list-client`;

const DATABASE_URL = 'postgres://hoefkdtgjxbkaz:b8c1c096a186195f6cd7a669d00fd9fab02eb9e787969112e60c492331cd4a0c@ec2-54-83-19-244.compute-1.amazonaws.com:5432/d91jbt4nia47q7'

const client = new pg.Client(DATABASE_URL);
client.connect();
client.on('error', err => console.error(err));

app.use(cors());

app.get('/test', (req, res) => res.send('Testing 1, 2, 3'));


app.get('/', (req, res) => res.send(CLIENT_URL));

app.get('/books', (req, res) => {
  client.query(`SELECT *  FROM books;`)
    .then(results => res.send(results.rows))
    .catch(console.error);
});

// app.get('*', (req, res) => res.redirect(CLIENT_URL));
app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));


