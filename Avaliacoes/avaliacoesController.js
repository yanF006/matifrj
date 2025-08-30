const Avaliacoes = require("./avaliacoes")
const Exercicios = require("../Exercicios/exercicios")

class AvisosController
{
    async paginaCadastro(req, res)
    {
        const exercicios = await Exercicios.findAll()
        res.render("cadastroAvaliacao", {exercicios: exercicios})
    }

    async criarAvaliacao(req, res)
    {
        const {nome, data_inicio, data_fim} = req.body
        const user_id = req.session.user.id

        await Avaliacoes.new(nome, data_inicio, data_fim, user_id)

        res.redirect("/index-admin")
    }
}

module.exports = new AvisosController()