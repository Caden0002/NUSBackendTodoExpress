const { MongoClient, ObjectId } = require("mongodb");

let client = null;
let collectionTodos = null;
let collectionUsers = null;

async function initDBIfNecessary() {
    if (!client) {
        client = await MongoClient.connect("mongodb://localhost:27018");
        const db = client.db("todo");
        collectionTodos = db.collection("todos");
        collectionUsers = db.collection("users");
    }
}

async function getUserByUsername(username) {
    await initDBIfNecessary();
    return collectionUsers.findOne({ username });
}

async function insertTodo(todo, userId) {
    await initDBIfNecessary();
    todo.created = new Date();
    todo.userId = userId;
    await collectionTodos.insertOne(todo);
}

async function getCompletedTodo(userId) {
    await initDBIfNecessary();
    return collectionTodos.find({ completed: true, userId }).toArray();
}

async function getUncompletedTodo(userId) {
    await initDBIfNecessary();
    return collectionTodos.find({ completed: false, userId }).toArray();
}

async function deleteTodo(todoId, userId) {
    await initDBIfNecessary();
    await collectionTodos.deleteOne({ _id: ObjectId.createFromHexString(todoId), userId });
}

async function setTodoCompleteStatus(todoId, completeStatus, userId) {
    await initDBIfNecessary();
    await collectionTodos.updateOne(
        { _id: ObjectId.createFromHexString(todoId), userId },
        { $set: { completed: completeStatus } }
    );
}

module.exports = {
    insertTodo,
    getCompletedTodo,
    getUncompletedTodo,
    deleteTodo,
    setTodoCompleteStatus,
    getUserByUsername
};