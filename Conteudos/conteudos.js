const knex = require('../database/database')


class Conteudos{
    async new(titulo, descricao, bimestre, serie,categoria, user_id){
        await knex.insert({titulo, descricao,bimestre,serie,categoria, user_id}).table('conteudos')
    }

    async findAll(){
        var resultado = await knex.select(['id', 'titulo', 'descricao']).table('conteudos')
        return resultado

        
    }

    async findBySerieEBimestre(serie,bimestre){
        
        var resultado = await knex.select(['titulo', 'id']).where({serie:serie, bimestre:bimestre}).table('conteudos');
        return resultado;
    }

    async findbyConteudoID(id){
        var resultado = await knex.select(['id','titulo', 'descricao', 'bimestre', 'serie', 'categoria']).where({id:id}).table('conteudos')
        return resultado;

    }

    async update(id,titulo,descricao,bimestre,serie,categoria){
        var conteudo = await this.findbyConteudoID(id)

        if(conteudo !=undefined){
            var editConteudo ={}
            

            if(titulo!=undefined){    
                 editConteudo.titulo = titulo;      
                
            }

            if(descricao!=undefined){
                editConteudo.descricao =descricao;
            }

            if(bimestre!=undefined){
                editConteudo.bimestre = bimestre;
            }
            
            if(serie!=undefined){
                editConteudo.serie = serie;
            }

            if(categoria!=undefined){
                editConteudo.categoria = categoria;
            }

            try{
                await knex.update(editConteudo).where({id:id}).table("conteudos")
                return{status: true}

            }catch(err){
                return{status: false, err: err}
            }

        }else{
            return {status:false, err:"Conteudo não existe"}
        }
    }

    async findConteudobyCategoria(id){
        var resultado = await knex.select(['id', 'titulo', 'descricao']).where({categoria:id}).table('conteudos')
        return resultado
    }

    async deleteConteudo(id){
            await knex.delete().where({id_conteudo:id}).table('exercicios_conteudos')
            await knex.delete().where({id:id}).table('conteudos')
    }

    async findbyText(query){
        var resultado = await knex('conteudos')
        .select('titulo', 'descricao', 'id')
        .where('titulo', 'like', `%${query}%`);
        return resultado;
    }

        

}

module.exports = new Conteudos();