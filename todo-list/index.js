import express from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;
let taskListPersonal = [];
let taskListWork = [];

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render(__dirname + "/index.ejs", {
    tasksPersonal: taskListPersonal,
    tasksWork: taskListWork,
  });
});

app.post("/submit-personal", (req, res) => {
  const taskName = req.body["taskName"];
  if (taskName !== "") {
    taskListPersonal.push(taskName);
  }
  res.redirect("/");
});

app.post("/submit-work", (req, res) => {
  const taskName = req.body["taskName"];
  if (taskName !== "") {
    taskListWork.push(taskName);
  }
  res.redirect("/");
});

app.post("/removetask", (req, res) => {
  console.log("hi");
  res.redirect("/");
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
