const express = require("express");
const routes = require("./routes");
const cors = require("cors");

const app = express();

/**
 * Necessário usar express.json() para entender o corpo em JSON
 */

/**
 * implementar origin baseado no ambiente
 */
app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(3333);
