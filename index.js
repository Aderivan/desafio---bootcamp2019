const express = require("express");

const server = express();

server.use(express.json());

const projects = [];

function checkProjectsExist(req, res, next) {
  const { id } = req.params;
  const projectsId = projects.find(p => p.id == id);

  if (!projectsId) {
    return res.status(400).json({ error: `Project does not exist` });
  }

  return next();
}

function projectLog(req, res, next) {
  console.count("Números de requisições");

  return next();
}

server.use(projectLog);

server.get("/projects", (req, res) => {
  return res.json(projects);
});

server.get("/projects/:id", (req, res) => {
  const { id } = req.params;

  project = projects.find(p => p.id == id);

  return res.json(project);
});

server.post("/projects/", (req, res) => {
  const { id, title } = req.body;

  const project = {
    id,
    title,
    tasks: []
  };

  projects.push(project);

  return res.json(projects);
});

server.put("/projects/:id", checkProjectsExist, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const project = projects.find(p => p.id == id);

  project.title = title;

  return res.json(projects);
});

server.delete("/projects/:id", (req, res) => {
  const { id } = req.params;

  const projectIndex = projects.find(p => p.id == id);

  projects.splice(projectIndex, 1);

  return res.send();
});

server.post("/projects/:id/task", (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const project = projects.find(p => p.id == id);

  project.tasks.push(title);

  return res.json(project);
});

server.listen(3000);
