const knex = require('../database/database');

class Avisos 
{
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