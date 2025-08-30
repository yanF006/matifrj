const knex = require("../database/database")

class Avaliacoes
{
    async new(nome, data_inicio, data_fim, user_id){
        try{
            await knex.insert({nome, data_inicio, data_fim, user_id}).table("avaliacoes")
        }catch(err){
            console.log(err)
        }
    }
}

module.exports = new Avaliacoes()