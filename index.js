const express = require("express");
const uuid = require("uuid");
const port = 3000;
const app = express();
app.use(express.json());

/*
-Query params => meusite.com/users?nome-vera&age=45 //Filtros
-Route params => /users/2     //BUSCAR DELETAR OU ATUALIZAR ALGO ESPECIFICO
-Request Body => {"name":"vera", "age":}
*/
/*
-Get      => buscar informação no back-end
-POST     => Criar informação no back-end
-Put / PATCH     => Alterar/Atualizar informação no back-end
-DELETE   => Deletar informação no back-end

-Middleware => INTERCEPTADOR => TEM O PODER DE PARAR OU ALTERAR DADOS Da requisiçao

*/
const users = [];
const chekUserId = (request, response, next) => {
  const { id } = request.params;
  const index = users.findIndex((user) => user.id === id);
  if (index < 0) {
    return response.status(404).json({ message: "User not found " });
  }
  request.userIndex = index;
  request.userId - id;
  next();
};

app.get("/users", (request, response) => {
  console.log("A rota foi chamada");
  return response.json(users);
});

app.post("/users", (request, response) => {
  const { name, age } = request.body;

  const user = { id: uuid.v4(), name, age };

  users.push(user);
  return response.status(201).json(user);
});
app.put("/users/:id", chekUserId, (request, response) => {
  const { name, age } = request.body;
  const index = request.userIndex;
  const id = request.userIndex;
  const updatedUser = { id, name, age };

  users[index] = updatedUser;

  return response.json(updatedUser);
});

app.delete("/users/:id", chekUserId, (request, response) => {
  const index = request.userIndex;

  if (index < 0) {
    return response.status(404).json({ message: "User not found" });
  }

  users.splice(index, 1);
  return response.status(204).json();
});

app.listen(port, () => {
  console.log("🚀 Server started on port ${3000}");
});
