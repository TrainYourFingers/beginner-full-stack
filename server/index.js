const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");
const { corsOptions } = require("./config/corsOptions");
const credentials = require("./middleware/credentials");

// middleware
app.use(credentials);
// app.use(cors(corsOptions));
console.log(corsOptions.origin);
app.use(cors(corsOptions));
app.use(express.json()); // for req.body

// ROUTES

// create a todo
app.post("/todos", async (req, res) => {
  try {
    const { description, completion } = req.body;
    const newTodo = await pool.query(
      "INSERT INTO todo ( description, completion ) VALUES ($1, $2) RETURNING *",
      [description, completion]
    );
    res.json(newTodo.rows[0]);
  } catch (error) {
    console.error(error.message);
  }
});

// get all todos
app.get("/todos", async (req, res) => {
  const completion = req.query.completion;
  if (completion) {
    try {
      const allTodos = await pool.query(
        "SELECT * FROM todo WHERE completion = $1 ORDER BY todo_id DESC",
        [completion]
      );
      res.json(allTodos.rows);
    } catch (error) {
      return error.message;
    }
  } else {
    try {
      const allTodos = await pool.query(
        "SELECT * FROM todo ORDER BY todo_id DESC"
      );

      res.json(allTodos.rows);
    } catch (error) {
      console.error(error.message);
    }
  }
});

// get a todo
app.get("/todos/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const oneTodo = await pool.query("SELECT * FROM todo WHERE todo_id = $1", [
      id,
    ]);
    res.json(oneTodo.rows[0]);
  } catch (error) {
    console.error(error.message);
  }
});
// update a todo
app.put("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { description, completion } = req.body;
    const updateTodo = await pool.query(
      "UPDATE todo SET description = $1, completion = $2 WHERE todo_id =$3",
      [description, completion, id]
    );
    res.json("Todo was updated");
  } catch (error) {
    console.error(error.message);
  }
});

// delete a todo
app.delete("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteTodo = await pool.query("DELETE FROM todo WHERE todo_id = $1", [
      id,
    ]);
    res.json("Todo was deleted");
  } catch (error) {
    console.error(error.message);
  }
});

app.listen(5000, () => {
  console.log("Server has started on port 5000");
});
