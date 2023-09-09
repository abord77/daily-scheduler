import express from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";
import { getDate } from "./date.js";
import axios from "axios";
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;

app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

const taskListPersonal = [];
const taskListWork = [];
const weatherLocation = "waterloo";

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
    listTitle: "Personal List",
    date: day,
    tasksPersonal: taskListPersonal,
  });
});

app.get("/work", (req, res) => {
  const day = getDate();

  res.render(__dirname + "/views/list-work.ejs", {
    listTitle: "Work List", 
    date: day,
    tasksWork: taskListWork
  });
});

app.get("/weather", (req, res) => {
  const day = getDate();
  
  const apiCall = "http://api.weatherapi.com/v1/forecast.json?q=" + weatherLocation + "&aqi=yes&key=b387413b61dc4cc4b53155226233108";
  res.render(__dirname + "/views/weather.ejs", {
    listTitle: "Current weather",
    date: day,
    location: weatherLocation,
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
