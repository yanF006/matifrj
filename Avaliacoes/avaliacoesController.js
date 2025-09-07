const Avaliacoes = require("./avaliacoes")
const Exercicios = require("../Exercicios/exercicios")
const Categorias = require("../Categorias/categorias")

class AvisosController
{
    async paginaCadastro(req, res)
    {
        const exercicios = await Exercicios.findAll()
        const categorias = await Categorias.findAll()
        res.render("cadastroAvaliacao", {exercicios: exercicios, categorias: categorias})
    }

    async criarAvaliacao(req, res)
    {
        const {nome, data_inicio, data_fim, exercicios} = req.body
        const user_id = req.session.user.id

        const id = await Avaliacoes.new(nome, data_inicio, data_fim, user_id)

        exercicios.forEach(exercicio => {
            Avaliacoes.joinExercicioAvaliacao(exercicio, id)
        });

        res.redirect("/index-admin")
    }

    async exibirAvaliacoesAluno(req, res)
    {
        const avaliacoes = await Avaliacoes.findAllAtivas()
        res.render("avaliacoes-aluno", {avaliacoes: avaliacoes})
    }

    async exibirAvaliacoes(req, res)
    {
        /*const avaliacoes = await Avaliacoes.findAll()
        res.render("avaliacoes", {avaliacoes: avaliacoes})*/
    }

    async exibirAvaliacao(req, res)
    {
        const {id} = req.params
        const avaliacao = await Avaliacoes.findById(id)
        const exercicios = await Avaliacoes.findExexerciciosByAvaliacaoId(id) || [];
        res.render("avaliacao", {avaliacao: avaliacao, exercicios: exercicios})
    }

    async exibirAvaliacaoAdmin(req, res)
    {
        /*const {id} = req.params
        const avaliacao = await Avaliacoes.findById(id)
        const exercicios = await Avaliacoes.findExerciciosByAvaliacaoId(id)
        res.render("avaliacaoAdmin", {avaliacao: avaliacao, exercicios: exercicios})*/
    }  

    async exibirResultadosAvaliacao(req, res)
    {
        /*const {id} = req.params
        const resultados = await Avaliacoes.resultadosAvaliacao(id)
        res.render("resultadosAvaliacao", {resultados: resultados})*/
    }

    async findExerciciosByAvaliacaoId(req, res)
    {
        var {id_exercicio} = req.query
        if(id_exercicio){
            try {
                var resultado = await Exercicios.findExerciciosByAvaliacaoId(id_exercicio)
                var categoria = await Categorias.findAll()
                res.render('cadastroAvaliacao', {resultado:resultado, categorias:categoria})
            }
            catch (error) {
                res.send('<script>alert("Erro ao procurar pelo exercício."); window.location.href="/GerenciarConteudos";</script>')
                res.status(500).send('Erro ao atualizar o conteúdo.');
            }
            }
        else {
            // Caso algum valor seja inválido, retorna um erro ou redireciona
            res.send('<script>alert("Selecione alguma categoria para pesquisar!"); window.location.href="/GerenciarConteudos";</script>')            
        }
    } 
}

module.exports = new AvisosController()