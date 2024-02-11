const express = require('express');
const { Pool } = require ('pg');

const app = express ();
app.use(express.json());

//in-mem storage for counters
//app.get('/counters', (req,res) => {
  //  res.json(counters);
//});

//link to databse 
const pool = new Pool({
    //database credentials
    user: 'postgres',
    host: 'localhost',
    database: 'counters_db',
    password: 'Tomoya',
    port: 5432,
})

//GET /counters/ - List of counters in a map/dictionary format ({ “abc”: 5, “xyz”: 3 })
app.get('/counters', async (req, res) => {
    const result = await pool.query('SELECT * FROM counters');
    const counters = result.rows.reduce((acc, cur) => ({ ...acc, [cur.name]: cur.value }), {});
    res.json(counters);
});

// POST /counters - Create a new counter with an initial value { “counter”: initialValue }
app.post('/counters', async (req, res) => {
    const { counter, initialValue } = req.body;
    await pool.query('INSERT INTO counters (name, value) VALUES ($1, $2)', [counter, initialValue]);
    res.status(201).send('New counter created');
});

// PUT /counters/:counter - Increment a counter value by one (no body required). Fails if counter does not exist (404 Not found)
app.put('/counters/:counter', async (req, res) => {
    const counter = req.params.counter;
    const result = await pool.query('UPDATE counters SET value = value + 1 WHERE name = $1 RETURNING *', [counter]);
    if (result.rowCount === 0) {
        return res.status(404).send('Counter not found');
    }
    res.send('Counter incremented');
});

// DEL /counters/:counter -  Decreases a counter value by one, if value <= 0 the counter disappears. Does fail if the counter does not exist.
app.delete('/counters/:counter', async (req, res) => {
    const counter = req.params.counter;
    await pool.query('UPDATE counters SET value = value - 1 WHERE name = $1 AND value > 1', [counter]);
    res.send('Counter decreased');
});

// GET /counters/:counter - Returns value of counter {“counter1”: 5}. Fails if the counter does not exist (404 Not found)
app.get('/counters/:counter', async (req, res) => {
    const counter = req.params.counter;
    const result = await pool.query('SELECT value FROM counters WHERE name = $1', [counter]);
    if (result.rows.length === 0) {
        return res.status(404).send('Counter not found');
    }
    res.json({ [counter]: result.rows[0].value });
});