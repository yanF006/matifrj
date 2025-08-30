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

    async exibirAvisosAluno(req, res) {
        try {
            const avisosAtivos = await Avisos.findAvisosAtivos();
            console.log('Avisos Ativos:', avisosAtivos);
            res.render('index-aluno', {avisos: avisosAtivos});
        } catch (error) {
            console.error('Erro ao exibir avisos:', error);
            res.status(500).send('Erro ao exibir avisos');
        }
    }

    async criarAviso(req, res) {
        var { titulo, descricao, data_fim } = req.body;
        const user_id = req.session.user.id;

        if (titulo && descricao && data_fim) {
            try {
                await Avisos.new(titulo, descricao, data_fim, user_id);
                res.redirect('/index-admin');
            } catch (error) {
                console.error('Erro ao criar aviso:', error);
                res.status(500).send('Erro ao criar aviso');
            }
        } else {
            res.send('<script>alert("Campo vazio, preencha corretamente!"); window.location.href="/cadastroAvisos";</script>');
        }
    }
}

module.exports = new AvisosController();