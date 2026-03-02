const express = require('express');
const router = express.Router();
const pool = require('../db');

// GET all
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM regions ORDER BY region_id');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET by ID
router.get('/:id', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM regions WHERE region_id = $1',
      [req.params.id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// CREATE
router.post('/', async (req, res) => {
  try {
    const { region_name } = req.body;
    const result = await pool.query(
      'INSERT INTO regions (region_name) VALUES ($1) RETURNING *',
      [region_name]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE
router.put('/:id', async (req, res) => {
  try {
    const { region_name } = req.body;
    const result = await pool.query(
      'UPDATE regions SET region_name=$1 WHERE region_id=$2 RETURNING *',
      [region_name, req.params.id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE
router.delete('/:id', async (req, res) => {
  try {
    await pool.query(
      'DELETE FROM regions WHERE region_id=$1',
      [req.params.id]
    );
    res.json({ message: 'Region deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;