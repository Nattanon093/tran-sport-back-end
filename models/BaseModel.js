const { Client } = require('pg');

const client = new Client({
    host: '146.190.92.222',
    user: 'tranSport',
    password: '@tranSport123',
    database: 'tranSport',
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