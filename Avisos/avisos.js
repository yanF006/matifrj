const knex = require('../database/database');

class Avisos 
{
    async new(titulo, descricao, data_fim, user_id) {
        try {
            await knex.insert({titulo, descricao, data_fim, user_id}).table('avisos');
        }
        catch (error) {
            console.error('Erro ao inserir aviso:', error);
            throw error;
        }
    }

    async findAvisosAtivos() 
    {
        try {
            const now = new Date();
            const avisosAtivos = await knex('avisos').where('data_fim', '>=', now);
            return avisosAtivos;
        } catch (error) {
            console.error('Erro ao buscar avisos ativos:', error);
            throw error;
        }
    }
}

module.exports = new Avisos();