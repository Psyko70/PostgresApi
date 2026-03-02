const express = require('express');
const router = express.Router();
const pool = require('../db');

router.get('/', async (req, res) => {
  const result = await pool.query(`
    SELECT c.*, r.region_name
    FROM countries c
    JOIN regions r ON c.region_id = r.region_id
  `);
  res.json(result.rows);
});

router.get('/:id', async (req, res) => {
  const result = await pool.query(
    'SELECT * FROM countries WHERE country_id=$1',
    [req.params.id]
  );
  res.json(result.rows[0]);
});

router.post('/', async (req, res) => {
  const { country_id, country_name, region_id } = req.body;
  const result = await pool.query(
    'INSERT INTO countries VALUES ($1,$2,$3) RETURNING *',
    [country_id, country_name, region_id]
  );
  res.status(201).json(result.rows[0]);
});

router.put('/:id', async (req, res) => {
  const { country_name, region_id } = req.body;
  const result = await pool.query(
    'UPDATE countries SET country_name=$1, region_id=$2 WHERE country_id=$3 RETURNING *',
    [country_name, region_id, req.params.id]
  );
  res.json(result.rows[0]);
});

router.delete('/:id', async (req, res) => {
  await pool.query('DELETE FROM countries WHERE country_id=$1', [req.params.id]);
  res.json({ message: 'Country deleted' });
});

module.exports = router;