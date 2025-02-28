# 📚 NUS Foundation in Backend Development (26-02-25 - 28-02-25) - CHEN QIXUAN

# 📝 Todo App (Express & EJS)

A simple Todo App built using **Node.js**, **Express**, **EJS**, and **MongoDB**.

---

## 🚀 Features

- Add new todos
- Mark todos as **completed/uncompleted**
- Delete todos
- Uses **MongoDB** for data storage
- Simple and responsive **Bootstrap** UI
- **User Authentication** (Optional)

---

## ⚙️ **Setup MongoDB in Docker**

To isolate our database environment, we will set up MongoDB using Docker.

### **Start MongoDB in a Docker Container**

```sh
docker run -d --name todo-mongodb -p 27018:27017 mongo
```

This runs MongoDB on port **27018** instead of the default **27017**.

### **Access the MongoDB Shell**

```sh
docker exec -it todo-mongodb mongosh
```

### **Switch to the Todo Database and Check Collections**

```sh
use todo
show collections
db.todos.find().pretty()
```

---

## 🛠️ **Setup Express & EJS**

We will use **Express.js** as the backend framework and **EJS** as the templating engine.

### **Install Required Dependencies**

```sh
npm install express ejs mongodb express-session path
```

### **Install nodemon for Development**

```sh
npm install -g nodemon
```

### **Setup Express**

- **Create `index.js`** to configure Express, sessions, and routes.
- **Use `views/main.ejs`** as the single-page UI.

---

## 🚃️ **Database Schema & Functions**

The database consists of a **todos** collection with the following fields:

```json
{
  "_id": ObjectId("1234567890"),
  "text": "Sample Todo",
  "completed": false,
  "created": ISODate("2025-02-28T06:01:54.311Z")
}
```

### **Database Functions (`database.js`)**

- **`insertTodo(todo)`** → Add a new todo to MongoDB.
- **`getCompletedTodo()`** → Retrieve completed todos.
- **`getUncompletedTodo()`** → Retrieve uncompleted todos.
- **`deleteTodo(todoId)`** → Delete a todo by ID.
- **`setTodoCompleteStatus(todoId, status)`** → Update completion status.

---

## 🔄 **Routes & API Design**

We define routes using **Express Router** (`routes/todo.routes.js`).

| Method | Route                  | Description                |
| ------ | ---------------------- | -------------------------- |
| `GET`  | `/`                    | Show all todos             |
| `POST` | `/addtodo`             | Add a new todo             |
| `POST` | `/markcompleted/:id`   | Mark a todo as completed   |
| `POST` | `/markuncompleted/:id` | Mark a todo as uncompleted |
| `POST` | `/removetodo/:id`      | Delete a todo              |

---

## 🎨 **UI Implementation with EJS & Bootstrap**

The UI is built using **Bootstrap 5.3**.

### **UI Structure (`views/main.ejs`)**

- **Title on the left**, "Add Todo" on the right.
- **Form**: Full-width text area with a button below it.
- **Tables**:
  - **Completed Todos (Above)**
  - **Uncompleted Todos (Below)**
- **Bootstrap Styling**:
  - **Gray-striped tables**
  - **Buttons**:
    - "Mark Completed" → `btn-primary`
    - "Mark Uncompleted" → `btn-warning`
    - "Delete" → `btn-danger`

---

## 🔒 **Optional: User Authentication**

To allow multiple users to maintain their own todo list:

### **Create a `users` Collection in MongoDB**

```sh
use todo
db.users.insertOne({ username: "user1", password: "pass1" })
db.users.insertOne({ username: "user2", password: "pass2" })
```

### **Modify `database.js` to Include:**

- **`getUserByUsername(username)`** → Retrieve user details.

### **Update `index.js` to Include Authentication Middleware**

```js
app.use(
  session({
    secret: "supersecretkey",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);
```

### **Create `views/login.ejs` and Update Routes:**

- `/login` → Show login form.
- `/dologin` → Handle login.
- `/logout` → Destroy session.

---

## 🛋️ **Installation Guide**

### **1️⃣ Clone the Repository**

```sh
git clone https://github.com/yourusername/todo-app.git
cd todo-app
```

### **2️⃣ Install Dependencies**

```sh
npm install
```

### **3️⃣ Start MongoDB**

Ensure MongoDB is running on **port 27018**.

```sh
docker start todo-mongodb
```

### **4️⃣ Start the App**

```sh
npm start
```

For development with **nodemon**:

```sh
npm run dev
```

---

## 📂 **Project Structure**

```
📆 todo-app
👉📚 public
👉📚 routes
   👉 todo.routes.js
👉📚 views
   👉 main.ejs
   👉 login.ejs (Optional)
👉 database.js
👉 index.js
👉 package.json
👉 README.md
```

---

## 📝 **License**

This project is licensed under the **MIT License**.

---

## 👨‍💻 **Contributors**

- **Chen Qixuan**
- **NUS Foundation in Backend Development (Feb 2025)**
