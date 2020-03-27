const express = require("express");

const OngController = require("./controllers/OngController");
const IncidentsController = require("./controllers/IncidentController");
const ProfileController = require("./controllers/ProfileController");
const SessionController = require("./controllers/SessionController");

const routes = express.Router();

/**
 * Rota / Recursos
 */

/**
 * Metodos HTTP:
 *
 * GET: Buscar/listar uma informação do backend
 * POST: Criar uma informação no backend
 * PUT: Alterar uma informação no backend
 * DELETE: Deletar uma informação no backend
 */

/**
 * Tipos de parametros:
 *
 * Query: Parametros nomeados enviados na rota após "?" (Filtros, paginacao)
 * -- usa-se request.query
 * Route: Parametros utilizados para identificar recursos (Ex: /users/1 ) identificando um usuario
 * -- usa-se request.params
 * Request Body: Corpo da requisicao, utilizado para criar ou alterar recursos
 * -- usa-se request.body
 */

routes.post("/sessions", SessionController.create);

routes.get("/ongs", OngController.index);
routes.post("/ongs", OngController.create);

routes.get("/profile", ProfileController.index);

routes.get("/incidents", IncidentsController.index);
routes.post("/incidents", IncidentsController.create);
routes.delete("/incidents/:id", IncidentsController.delete);
module.exports = routes;
