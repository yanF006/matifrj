const knex = require('../database/database');
const Users = require('../Users/users');

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
            const avisosAtivos = await knex('avisos')
                .where('data_fim', '>=', now)
                .join('users', 'avisos.user_id', '=', 'users.id')
                .select(
                    'avisos.*',
                    'users.name as criador_nome'
                );
            return avisosAtivos;
        } catch (error) {
            console.error('Erro ao buscar avisos ativos:', error);
            throw error;
        }
    }
}

module.exports = new Avisos();