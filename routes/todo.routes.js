const express = require("express");
const router = express.Router();
const { insertTodo, getCompletedTodo, getUncompletedTodo, deleteTodo, setTodoCompleteStatus } = require("../lib/database");

router.get("/", async (req, res) => {
    try {
        const uncompletedTodos = await getUncompletedTodo();
        const completedTodos = await getCompletedTodo();
        res.render("main", { uncompletedTodos, completedTodos });
    } catch (error) {
        res.status(500).send("Error fetching todos");
    }
});

router.post("/addtodo", async (req, res) => {
    try {
        const newTodo = { text: req.body.text, completed: false };
        await insertTodo(newTodo);
        res.redirect("/");
    } catch (error) {
        res.status(500).send("Error adding todo");
    }
});

router.post("/markcompleted/:id", async (req, res) => {
    try {
        await setTodoCompleteStatus(req.params.id, true);
        res.redirect("/");
    } catch (error) {
        res.status(500).send("Error marking as completed");
    }
});

router.post("/markuncompleted/:id", async (req, res) => {
    try {
        await setTodoCompleteStatus(req.params.id, false);
        res.redirect("/");
    } catch (error) {
        res.status(500).send("Error marking as uncompleted");
    }
});

router.post("/removetodo/:id", async (req, res) => {
    try {
        await deleteTodo(req.params.id);
        res.redirect("/");
    } catch (error) {
        res.status(500).send("Error deleting todo");
    }
});

module.exports = router;