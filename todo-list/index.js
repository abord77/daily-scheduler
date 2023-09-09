import express from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";
import { getDate } from "./date.js";
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;

app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

const taskListPersonal = [];
const taskListWork = [];

app.get("/", (req, res) => {
  const day = getDate();

  res.render(__dirname + "/views/login.ejs", {
    listTitle: day,
    tasksPersonal: taskListPersonal,
  });
});

app.get("/personal", (req, res) => {
  const day = getDate();

  res.render(__dirname + "/views/list-personal.ejs", {
    listTitle: day,
    tasksPersonal: taskListPersonal,
  });
});

app.get("/work", function(req, res){
  res.render(__dirname + "/views/list-work.ejs", {
    listTitle: "Work List", 
    tasksWork: taskListWork
  });
});

app.post("/", (req, res) => {
  const usr = req.body["uname"];
  const pwd = req.body["psw"];
  res.redirect("/personal");
});

app.post("/personal", (req, res) => {
  const taskName = req.body["taskName"];
  if (taskName !== "") {
    taskListPersonal.push(taskName);
  }
  res.redirect("/personal");
});

app.post("/work", (req, res) => {
  const taskName = req.body["taskName"];
  if (taskName !== "") {
    taskListWork.push(taskName);
  }
  res.redirect("/work");
});

/*
app.post("/removetask", (req, res) => {
  console.log("hi");
  res.redirect("/");
});*/

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
