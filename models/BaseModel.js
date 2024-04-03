const { Client } = require('pg');

const client = new Client({
    host: '139.59.109.60',
    user: 'postgres',
    password: '@suriya1234',
    database: 'postgres',
    port: 5432,
});

client.connect(err => {
    if (err) {
        console.error('Connection error', err.stack);
    } else {
        console.log('Connected');
    }
});

client.on('error', (err) => {
    console.error('Unexpected error on idle client', err);
    process.exit(-1);
});

module.exports = client;