const knex = require('../../database/database');

class Turmas {
    async findAll(){
        try{
            var result = await knex.select(['id','nome']).table('turmas')
            return result

        }catch(err){
            console.log(err)
            return []
        }
    }

    async findByID(id){
        try{
            var result = await knex.select(['id','nome']).where({id:id}).table('turmas')
            if(result.length > 0){
                return result
            }else{
                return undefined
            }
        }catch(err){
            console.log(err)
            return []
        }
    }
}

module.exports = new Turmas();