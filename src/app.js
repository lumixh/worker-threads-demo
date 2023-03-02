const express = require('express');
const app = express();

const { ping, blocking, nonBlocking } = require('./handlers');

const prefix = `/api/v1`;

app.get(`${prefix}/ping`, ping);
app.get(`${prefix}/blocking`, blocking);
app.get(`${prefix}/non-blocking`, nonBlocking);

module.exports = app;
