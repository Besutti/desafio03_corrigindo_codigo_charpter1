const express = require("express");

const { v4: uuid } = require("uuid");

const app = express();

app.use(express.json());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body

  const repository = {
    id: uuid(),
    title: title,
    url: url,
    techs: techs,
    likes: 0
  };

  repositories.push(repository);

  return response.status(201).json(repository);
});

app.put("/repositories/:id", (request, response) => {
  // obs aqui eu modifiquei bastante o esquema

  const { id } = request.params;
  //const updatedRepository = request.body;
  const { title, url, techs } = request.body;
  
  const repository = repositories.find(repository => repository.id === id);

  if (!repository) {
    return response.status(404).json({ error: "Mensagem de erro" });
  }

  if (repository.title !== title) {
    repository.title = title;
  }

  if (repository.url !== url) {
    repository.url = url;
  }
  
  if (repository.techs !== techs) {
    repository.techs = techs;
  }
 
  
  return response.json(repository);
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;

  repositoryIndex = repositories.findIndex(repository => repository.id === id);

  if (repositoryIndex < 0) {
  
    return response.status(404).json({ error: "Mensagem de erro" });
  }


  repositories.splice(repositoryIndex, 1);

  return response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;

  repositoryIndex = repositories.findIndex(repository => repository.id === id);

  if (repositoryIndex < 0) {
    return response.status(404).json({ error: "Mensagem de erro" });
  }

  const likes = (repositories[repositoryIndex].likes + 1)
  repositories[repositoryIndex].likes = likes;  

  return response.json({likes : likes});
});

module.exports = app;
