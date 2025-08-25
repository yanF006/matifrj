const knex = require('../../database/database');
const turmas = require('./turmas');

class TurmasController {
    async index(req, res) {
        const listaTurmas = await turmas.findAll();
        res.render("cadastro", { turmas: listaTurmas });
    }

    async index2(req, res) {
        const listaTurmas = await turmas.findAll();
        res.render("turmas", { turmas: listaTurmas });
    }

    async criar(req, res){
        var {nome, serie} = req.body;
        if(nome && serie) {
            await turmas.new(nome, serie);
            res.redirect('/turmas');
        }
        else {
            res.send('<script>alert("Campo vazio, preencha corretamente!"); window.location.href="/categorias";</script>')
        }
    }

    async deletar(req, res) {
        var {id} = req.params
        await turmas.delete(id)
        res.redirect('/turmas')
    }
}

module.exports = new TurmasController();