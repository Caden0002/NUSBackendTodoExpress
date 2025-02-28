const { MongoClient, ObjectId } = require("mongodb");

let client = null;
let collectionTodos = null;

async function initDBIfNecessary() {
    if (!client) {
        client = await MongoClient.connect("mongodb://localhost:27018");
        const db = client.db("todo");
        collectionTodos = db.collection("todos");
    }
}

async function insertTodo(todo) {
    await initDBIfNecessary();
    todo.created = new Date();
    await collectionTodos.insertOne(todo);
}

async function getCompletedTodo() {
    await initDBIfNecessary();
    return collectionTodos.find({ completed: true }).toArray();
}

async function getUncompletedTodo() {
    await initDBIfNecessary();
    return collectionTodos.find({ completed: false }).toArray();
}

async function deleteTodo(todoId) {
    await initDBIfNecessary();
    await collectionTodos.deleteOne({ _id: ObjectId.createFromHexString(todoId) });
}

async function setTodoCompleteStatus(todoId, completeStatus) {
    await initDBIfNecessary();
    await collectionTodos.updateOne(
        { _id: ObjectId.createFromHexString(todoId) },
        { $set: { completed: completeStatus } }
    );
}

module.exports = {
    insertTodo,
    getCompletedTodo,
    getUncompletedTodo,
    deleteTodo,
    setTodoCompleteStatus
};