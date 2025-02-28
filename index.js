const express = require("express");
const path = require("path");
const session = require("express-session");
const app = express();
const port = 3000;
const { getUserByUsername } = require("./lib/database");
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

// ✅ Login Page
app.get("/login", (req, res) => {
    res.render("login", { errorMessage: null });
});

// ✅ Handle Login
app.post("/dologin", async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await getUserByUsername(username);

        if (user && user.password === password) {
            req.session.userId = user._id.toString();
            res.redirect("/");
        } else {
            res.render("login", { errorMessage: "Invalid credentials" });
        }
    } catch (error) {
        res.status(500).send("Error logging in");
    }
});

// ✅ Logout
app.get("/logout", (req, res) => {
    req.session.destroy(() => {
        res.redirect("/login");
    });
});

// ✅ Middleware to Require Login
function requireAuth(req, res, next) {
    if (!req.session.userId) {
        return res.redirect("/login");
    }
    next();
}

// ✅ Apply Authentication Middleware for Todo Routes
app.use("/", requireAuth, todoRoutes);

app.listen(port, () => {
    console.log(`🚀 Server running on http://localhost:${port}`);
});