const Exercicios =  require('./exercicios')
const knex = require('../database/database')

const exibirAvaliacoes = async (req, res) => {
    try {
        const avaliacoesAtivas = await Exercicios.findAvaliacoesAtivas();
        avaliacoesAtivas.forEach(avaliacao => {
            console.log(`Avaliação: ${avaliacao.descricao}, Data de Início: ${avaliacao.data_inicio}, Data de Fim: ${avaliacao.data_fim}`);
        });
        res.render('avaliacoes', { avaliacoes: avaliacoesAtivas });
    } catch (error) {
        console.error('Erro ao exibir avaliações:', error);
        res.status(500).send('Erro ao exibir avaliações');
    }
};

const exibirAvaliacoesAluno = async (req, res) => {
    try {
        const avaliacoesAtivas = await Exercicios.findAvaliacoesAtivas();
        res.render('avaliacoes-aluno', { avaliacoes: avaliacoesAtivas });
    } catch (error) {
        console.error('Erro ao exibir avaliações:', error);
        res.status(500).send('Erro ao exibir avaliações');
    }
};

module.exports = { exibirAvaliacoes, exibirAvaliacoesAluno};
