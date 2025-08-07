const Exercicios =  require('./exercicios')
const knex = require('../database/database')

const exibirAvaliacoes = async (req, res) => {
    try {
        var {id} = req.params;
        const avaliacoesAtivas = await Exercicios.findAvaliacoesAtivas();
        res.render('avaliacoes', { avaliacoes: avaliacoesAtivas });
    } catch (error) {
        console.error('Erro ao exibir avaliações:', error);
        res.status(500).send('Erro ao exibir avaliações');
    }
};

module.exports = { exibirAvaliacoes };
