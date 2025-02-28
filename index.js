const express = require("express");
const path = require("path");
const session = require("express-session");
const app = express();
const port = 3000;

const todoRoutes = require("./routes/todo.routes");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));

app.use(
    session({
        secret: "supersecretkey",
        resave: false,
        saveUninitialized: true,
        cookie: { secure: false }
    })
);

app.use("/", todoRoutes);

app.listen(port, () => {
    console.log(`🚀 Server running on http://localhost:${port}`);
});