const knex = require('../database/database')

class Categorias{
    async new(nome){
        await knex.insert({nome}).table('categorias')
    }

    async findAll(){
        var resultado = await knex.select(['id', 'nome']).table('categorias')
        return resultado

    }

    async findbyID(id){
        var resultado = await knex.select(['id', 'nome']).where({id:id}).table('categorias')
        return resultado;

    }

    async delete(id){
        var alternativa = await this.findbyID(id)
        
        await knex('conteudos') // Nome da tabela
        .where({ categoria: id }) // Filtro para encontrar a linha específica
        .update({ categoria: null });
                
                await knex.delete().where({id:id}).table('categorias')
               
        
    }

    async update(id,nome){
        var categoria = await this.findbyID(id)

        if(categoria !=undefined){

            try{
                await knex.update({nome:nome}).where({id:id}).table("categorias")
                return{status: true}

            }catch(err){
                return{status: false, err: err}
            }

        }else{
            return {status:false, err:"Categoria não existe"}
        }
    }
        
        

}

module.exports = new Categorias();