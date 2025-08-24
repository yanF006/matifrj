const knex = require('../../database/database');
const turmas = require('./turmas');

class TurmasController {
    async index(req, res) {
        const listaTurmas = await turmas.findAll();
        res.render("cadastro", { turmas: listaTurmas });
    }
}

module.exports = new TurmasController();