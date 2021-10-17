const express = require('express');
require('dotenv').config();
const app = express();
const cors = require('cors');
const pool = require('./db');
const port = process.env.PORT;

// middleware
app.use(cors());
app.use(express.json());

app.listen(port, () => {
	console.log(`server is connected to port ${port}`);
});

// Routes

// create a todo

app.post('/todos', async (req, res) => {
	try {
		const { description } = req.body;
		const newTodo = await pool.query(
			'INSERT INTO todo (description) VALUES($1) RETURNING *',
			[description]
		);
		res.json(newTodo.rows[0]);
	} catch (error) {
		console.error(error.message);
	}
});

// get all todo

app.get('/todos', async (req, res) => {
	try {
		const allTodos = await pool.query('SELECT * FROM todo');
		res.json(allTodos.rows);
	} catch (error) {
		console.error(error.message);
	}
});

// get a todo

app.get('/todos/:id', async (req, res) => {
	try {
		const { id } = req.params;
		const todo = await pool.query('SELECT * FROM todo WHERE todo_id = $1', [
			id,
		]);
		res.json(todo.rows);
	} catch (error) {
		console.error(error.message);
	}
});
// update a todo

app.put('/todos/:id', async (req, res) => {
	try {
		const { id } = req.params;
		const { description } = req.body;
		const updateTodo = await pool.query(
			'UPDATE todo SET description = $1 WHERE todo_id = $2',
			[description, id]
		);
		res.json(`todo_id = ${id} was updated`);
	} catch (error) {
		console.error(error.message);
	}
});

// delete a todo

app.delete('/todos/:id', async (req, res) => {
	try {
		const { id } = req.params;
		const deleteTodo = await pool.query('DELETE FROM todo WHERE todo_id = $1', [
			id,
		]);
		res.json(deleteTodo);
	} catch (error) {
		console.error(error.message);
	}
});
