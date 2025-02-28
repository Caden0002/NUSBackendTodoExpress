const express = require("express");
const router = express.Router();
const { insertTodo, getCompletedTodo, getUncompletedTodo, deleteTodo, setTodoCompleteStatus } = require("../lib/database");

router.get("/", async (req, res) => {
    try {
        const userId = req.session.userId;
        const uncompletedTodos = await getUncompletedTodo(userId);
        const completedTodos = await getCompletedTodo(userId);
        res.render("main", { uncompletedTodos, completedTodos });
    } catch (error) {
        res.status(500).send("Error fetching todos");
    }
});

router.post("/addtodo", async (req, res) => {
    try {
        const newTodo = { text: req.body.text, completed: false };
        await insertTodo(newTodo, req.session.userId);
        res.redirect("/");
    } catch (error) {
        res.status(500).send("Error adding todo");
    }
});

router.post("/markcompleted/:id", async (req, res) => {
    try {
        await setTodoCompleteStatus(req.params.id, true, req.session.userId);
        res.redirect("/");
    } catch (error) {
        res.status(500).send("Error marking as completed");
    }
});

router.post("/markuncompleted/:id", async (req, res) => {
    try {
        await setTodoCompleteStatus(req.params.id, false, req.session.userId);
        res.redirect("/");
    } catch (error) {
        res.status(500).send("Error marking as uncompleted");
    }
});

router.post("/removetodo/:id", async (req, res) => {
    try {
        await deleteTodo(req.params.id, req.session.userId);
        res.redirect("/");
    } catch (error) {
        res.status(500).send("Error deleting todo");
    }
});

module.exports = router;