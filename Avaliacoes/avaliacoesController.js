const Avaliacoes = require("./avaliacoes")
const Exercicios = require("../Exercicios/exercicios")
const Categorias = require("../Categorias/categorias")
const Turmas = require("../Users/Turmas/turmas")

class AvisosController
{
    async paginaCadastro(req, res)
    {
        const exercicios = await Exercicios.findAll()
        const categorias = await Categorias.findAll()
        const turmas = await Turmas.findAll()
        res.render("cadastroAvaliacao", {exercicios: exercicios, categorias: categorias, turmas: turmas})
    }

    async criarAvaliacao(req, res)
    {
        const {nome, data_inicio, data_fim, exercicios} = req.body
        const user_id = req.session.user.id

        if(!nome || !data_inicio || !data_fim || !exercicios){
            res.send('<script>alert("Preencha todos os campos!"); window.location.href="/cadastroAvaliacao";</script>')
            return
        }

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
        const exercicios = await Avaliacoes.findExerciciosByAvaliacaoId(id);
        const totalCorretas = req.query.totalCorretas; // <-- ADICIONE ESTA LINHA
        res.render("avaliacao", {avaliacao: avaliacao, exercicios: exercicios, totalCorretas})
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
        const {id} = req.params
        const resultados = await Avaliacoes.resultadosAvaliacao(id)
        const avaliacao = await Avaliacoes.findById(id)
        const exercicios = await await Avaliacoes.findExerciciosByAvaliacaoId(id);
        res.render("resultadosAvaliacao", {resultados: resultados, avaliacao: avaliacao, exercicios: exercicios})
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

    async verificarRespostasAvaliacao(req, res) {
        try {
            const { avaliacaoId, respostas } = req.body;
            const totalCorretas = await Avaliacoes.verificarRespostasAvaliacao(avaliacaoId, respostas, req.session.user.id);
            if (totalCorretas === -1) {
                res.send('<script>alert("Você já realizou esta avaliação."); window.location.href="/avaliacoesAluno";</script>');
                return;
            }
            res.send('<script>alert("Avaliação concluída! Você acertou ' + totalCorretas + ' questões."); window.location.href="/avaliacoesAluno";</script>');
        } catch (err) {
            console.log(err);
            res.status(500).json({ error: 'Erro ao verificar respostas' });
        }
    }

    async gerenciarAvaliacoes(req, res) {
        const avaliacoes = await Avaliacoes.findAll();
        res.render("gerenciarAvaliacoes", { avaliacoes: avaliacoes });
    }
}

module.exports = new AvisosController()