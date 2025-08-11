const Avisos = require('./avisos');

class AvisosController
{
    async exibirAvisos(req, res) {
        try {
            const avisosAtivos = await Avisos.findAvisosAtivos();
            console.log('Avisos Ativos:', avisosAtivos);
            res.render('index', {avisos: avisosAtivos});
        } catch (error) {
            console.error('Erro ao exibir avisos:', error);
            res.status(500).send('Erro ao exibir avisos');
        }
    }
}

module.exports = new AvisosController();