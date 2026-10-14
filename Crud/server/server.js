const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Setup DB
const db = new sqlite3.Database('./bank.db');
db.run(`CREATE TABLE IF NOT EXISTS accounts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT,
  balance REAL
)`);

db.run(`CREATE TABLE IF NOT EXISTS employees (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  ename TEXT NOT NULL,
  job TEXT NOT NULL,
  salary REAL NOT NULL CHECK (salary >= 0)
)`);

function validateEmployee(body) {
  const ename = typeof body.ename === 'string' ? body.ename.trim() : '';
  const job = typeof body.job === 'string' ? body.job.trim() : '';
  const salary = Number(body.salary);

  if (!ename || !job || !Number.isFinite(salary) || salary < 0) {
    return null;
  }

  return { ename, job, salary };
}

// CREATE employee
app.post('/employees', (req, res) => {
  const employee = validateEmployee(req.body);
  if (!employee) {
    return res.status(400).json({ error: 'Name, job, and a non-negative salary are required.' });
  }

  const { ename, job, salary } = employee;
  db.run(
    'INSERT INTO employees (ename, job, salary) VALUES (?, ?, ?)',
    [ename, job, salary],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ id: this.lastID, ename, job, salary });
    }
  );
});

// READ employees
app.get('/employees', (req, res) => {
  db.all('SELECT id, ename, job, salary FROM employees ORDER BY id', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// UPDATE employee
app.put('/employees/:id', (req, res) => {
  const id = Number(req.params.id);
  const employee = validateEmployee(req.body);
  if (!Number.isInteger(id) || id < 1 || !employee) {
    return res.status(400).json({ error: 'Provide a valid employee ID, name, job, and non-negative salary.' });
  }

  const { ename, job, salary } = employee;
  db.run(
    'UPDATE employees SET ename = ?, job = ?, salary = ? WHERE id = ?',
    [ename, job, salary, id],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      if (this.changes === 0) return res.status(404).json({ error: 'Employee not found.' });
      res.json({ id, ename, job, salary });
    }
  );
});

// DELETE employee
app.delete('/employees/:id', (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id) || id < 1) {
    return res.status(400).json({ error: 'Provide a valid employee ID.' });
  }

  db.run('DELETE FROM employees WHERE id = ?', [id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    if (this.changes === 0) return res.status(404).json({ error: 'Employee not found.' });
    res.json({ deleted: id });
  });
});

// CREATE
app.post('/accounts', (req, res) => {
  const { name, balance } = req.body;
  db.run('INSERT INTO accounts (name, balance) VALUES (?, ?)', [name, balance], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ id: this.lastID, name, balance });
  });
});

// READ (all)
app.get('/accounts', (req, res) => {
  db.all('SELECT * FROM accounts', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// UPDATE
app.put('/accounts/:id', (req, res) => {
  const { name, balance } = req.body;
  db.run('UPDATE accounts SET name = ?, balance = ? WHERE id = ?', [name, balance, req.params.id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ updated: this.changes });
  });
});

// DELETE
app.delete('/accounts/:id', (req, res) => {
  db.run('DELETE FROM accounts WHERE id = ?', [req.params.id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ deleted: this.changes });
  });
});

app.listen(5000, () => console.log('Server running on port 5000'));
