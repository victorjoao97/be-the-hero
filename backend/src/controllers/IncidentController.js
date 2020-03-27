const connection = require("../database/connection");

/**
 * request.header = dados do contexto da requisicao
 */

module.exports = {
  /**
   * implementar 404 quando não existir mais registros
   * implementar na feature de contador do registros, retornar mais detalhes sobre paginação
   * @param {*} request
   * @param {*} response
   */
  async index(request, response) {
    const { page = 1 } = request.query;

    const [count] = await connection("incidents").count();

    /**
     * .offset = usado para pular registro no banco
     * porque page - 1 = porque quando for a primeira pagina, que seria page = 1, page - 1 daria 0, então 0 * 5 da 0
     * sendo assim ele não pularia ninguem na primeira pagina
     */
    const incidents = await connection("incidents")
      .join("ongs", "ongs.id", "=", "incidents.ong_id")
      .limit(5)
      .offset((page - 1) * 5)
      .select([
        "incidents.*",
        "ongs.name",
        "ongs.email",
        "ongs.whatsapp",
        "ongs.city",
        "ongs.uf"
      ]);

    response.header("X-Total-Count", count["count(*)"]);

    return response.json(incidents);
  },
  /**
   * implementar verificador de campos vazios
   * @param {*} request
   * @param {*} response
   */
  async create(request, response) {
    const { title, description, value } = request.body;
    const ong_id = request.headers.authorization;

    const [id] = await connection("incidents").insert({
      title,
      description,
      value,
      ong_id
    });

    return response.json({ id });
  },
  /**
   * implementar se não existir incident
   * @param {*} request
   * @param {*} response
   */
  async delete(request, response) {
    const { id } = request.params;
    const ong_id = request.headers.authorization;

    const incident = await connection("incidents")
      // .where("id", id) <-- mesma coisa
      .where({ id })
      .select("ong_id")
      .first();

    if (incident.ong_id !== ong_id) {
      return response.status(401).json({ error: "Operation not permitted." });
    }

    await connection("incidents")
      // where("id", id) <-- mesma coisa
      .where({ id })
      .delete();

    return response.status(204).send();
  }
};
