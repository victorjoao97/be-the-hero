const connection = require("../database/connection");

module.exports = {
  /**
   * implementar não existe casos
   * implementar ong_id vazio
   * @param {*} request
   * @param {*} response
   */
  async index(request, response) {
    const ong_id = request.headers.authorization;

    const incidents = await connection("incidents")
      // .where("ong_id":ong_id) <-- mesma coisa
      .where({ ong_id })
      .select("*");

    return response.json(incidents);
  }
};
