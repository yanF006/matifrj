const knex = require('../database/database')


class Exercicios {

    async new(descricao, data_inicio, data_fim, user_id){
        var exercicioID;

        if(data_inicio && data_inicio)
        {
            exercicioID = await knex.insert({descricao, data_inicio, data_fim, user_id}).table("exercicios")
        }
        else
        {
            exercicioID = await knex.insert({descricao, user_id}).table("exercicios")
        }
       
       this.showID(exercicioID)
       return exercicioID;

    }

    async showID(id){
        return id

    }

    async newAlt(id,conteudo,correta){
        correta=0
        const [alternativaID]= await knex.insert({conteudo,correta}).table("alternativas")
        await knex.insert({exercicio_id: id, alternativa_id: alternativaID }).table('exercicios_alternativas')

    }

    async findbyID(id){
        var result = await knex.select(['id', 'descricao']).where({id:id}).table('exercicios');
        
        return result
        
        
    }

    async findExercicioEConteudoByID (id){
        var result = await knex
        .select(['exercicios.id', 'exercicios.descricao', 'exercicios_conteudos.id_conteudo'])
        .from('exercicios')
        .leftJoin(
            'exercicios_conteudos',
            'exercicios.id',
            'exercicios_conteudos.id_exercicio'
        )
        .where('exercicios.id', id); // Filtro pelo ID do exercício

    console.log("Resultado da consulta no banco:", result);
    return result;
    }
    async findAlternativabyID(id){
        var result = await knex.select(['id','conteudo', 'correta']).where({id:id}).table('alternativas');
        
        return result
        
        
    }


    async findAll(){
    var descricao = await knex
        .select([
            'exercicios.id',
            'exercicios.descricao',
            'exercicios.user_id',
            'exercicios.categoria_id',
            'categorias.nome as categoria_nome'
        ])
        .from('exercicios')
        .leftJoin('categorias', 'categorias.id', 'exercicios.categoria_id');
    return descricao
    }


    async joinExerciciosAlternativas(id) {
        const data = await knex
            .select([
                'exercicios.id',
                'descricao',
                'alternativa_id',
                'conteudo',
                'correta',
                'id_conteudo'
            ])
            .table('exercicios')
            .rightJoin('exercicios_alternativas', 'exercicios_alternativas.exercicio_id', 'exercicios.id')
            .rightJoin('alternativas', 'alternativas.id', 'exercicios_alternativas.alternativa_id')
            .rightJoin('exercicios_conteudos', 'exercicios_conteudos.id_exercicio', 'exercicios.id')
            .where({ id_conteudo: id })
            .whereNull('exercicios.data_inicio') // <-- só exercícios sem data
            .whereNull('exercicios.data_fim');   // <-- só exercícios sem data

        const exercises = {};

        data.forEach(row => {
            if (!exercises[row.id]) {
                exercises[row.id] = {
                    id: row.id,
                    descricao: row.descricao,
                    alternativas: []
                };
            }
            exercises[row.id].alternativas.push({
                id: row.alternativa_id,
                conteudo: row.conteudo,
                correta: row.correta
            });
        });

        return Object.values(exercises);
    }

    async findAlternativaByID(id_alternativa, id_exercicio){
    var data = await knex.select(['exercicios_alternativas.exercicio_id', 'exercicios_alternativas.alternativa_id', 'correta']).table('alternativas').rightJoin('exercicios_alternativas','exercicios_alternativas.alternativa_id', 'alternativas.id').where({alternativa_id: id_alternativa}).andWhere({exercicio_id:id_exercicio})
    return data
}

    async findAlternativasCorretas( id_exercicio){
    const correta =1
    var data = await knex.select(['exercicios_alternativas.exercicio_id', 'exercicios_alternativas.alternativa_id', 'correta']).table('alternativas').rightJoin('exercicios_alternativas','exercicios_alternativas.alternativa_id', 'alternativas.id').where({exercicio_id:id_exercicio}).andWhere({correta: correta})
    return data
}

    async verificarCorretas(id_exercicio){
     
const correta = 1; // Filtro para alternativas corretas
console.log(id_exercicio)

    var result = await knex.select(['exercicios_alternativas.exercicio_id'])
    .count('alternativas.id as total_corretas')
    .from('exercicios_alternativas')
    .rightJoin('alternativas', 'alternativas.id', 'exercicios_alternativas.alternativa_id')
    .where('exercicios_alternativas.exercicio_id', id_exercicio) // Agora exercicio_id tem um valor
    .andWhere('alternativas.correta',correta ) // Adicionar mais condições
    .groupBy('exercicios_alternativas.exercicio_id');
    return result;
}



    async exibirAlternativas(id){
   
    var data = await knex.select(['exercicios_alternativas.exercicio_id', 'conteudo', 'alternativa_id', 'correta']).table('alternativas').leftJoin('exercicios_alternativas', 'alternativas.id', 'exercicios_alternativas.alternativa_id').where({exercicio_id: id})
    return data;
}

//não to usando essa por enquanto....
    async joinConteudosExerciciosAlternativas(conteudo){
    conteudo='soma'
    var data = await knex.select(['exercicios.id', 'descricao', 'conteudos.nome', 'alternativa_id', 'conteudo', 'correta']).table('exercicios').leftJoin('exercicios_conteudos', 'exercicios_conteudos.id_exercicio', 'exercicios.id').leftJoin('conteudos', 'conteudos.id', 'exercicios_conteudos.id_conteudo').where({nome: conteudo})
.rightJoin('exercicios_alternativas','exercicios_alternativas.exercicio_id', 'exercicios.id').rightJoin('alternativas', 'alternativas.id','exercicios_alternativas.alternativa_id')

const exercises = {};    

data.forEach(exercicio =>{
if(!exercises[exercicio.id]){
    exercises[exercicio.id]={
        id: exercicio.id,
        descricao: exercicio.descricao,
        alternativas: []
    }
}
    exercises[exercicio.id].alternativas.push({
        id: exercicio.alternativa_id,
        conteudo: exercicio.conteudo,
        correta: exercicio.correta
    })

    })

    return Object.values(exercises)
}

    async insertContentExercicio(descricao, data_inicio, data_fim, id_conteudo, user_id){
    var id_exercicio = await this.new(descricao, data_inicio, data_fim, user_id)
    await knex.insert({id_exercicio,id_conteudo}).table('exercicios_conteudos')
    return id_exercicio;
}

    async updateAlternativas(id_alternativa,correta){
    await knex.update({correta:correta}).where({id:id_alternativa}).table('alternativas')


}

async updateAlternativasT(id_alternativa,conteudo){
    await knex.update({conteudo:conteudo}).where({id:id_alternativa}).table('alternativas')
}

    async todasErradas(id){
    var data = await knex.select(['exercicios_alternativas.exercicio_id', 'conteudo', 'alternativa_id', 'correta']).table('alternativas').leftJoin('exercicios_alternativas', 'alternativas.id', 'exercicios_alternativas.alternativa_id').where({exercicio_id: id})
     // Agora exercicio_id tem um valor
     console.log("Resultados da Consulta:", data);
    
    await knex('alternativas')
    .whereIn('id', data.map(r => r.alternativa_id)) // Extrai apenas os IDs das alternativas
    .update({ correta: 0 });

}

async deleteExercicio(id){
    var exercicio = await this.findbyID(id)
    var alternativas = await knex.select(['exercicios_alternativas.exercicio_id', 'exercicios_alternativas.alternativa_id', 'correta']).table('alternativas').rightJoin('exercicios_alternativas','exercicios_alternativas.alternativa_id', 'alternativas.id').where({exercicio_id:id})
    await knex.delete().where({id_exercicio:id}).table('exercicios_conteudos')
    await knex.delete().where({id:id}).table('exercicios')
       
    await knex.delete().where({exercicio_id:id}).table('exercicios_alternativas')
     await Promise.all(
        alternativas.map(async (alternativa) => {
            await knex('alternativas').delete().where({ id: alternativa.alternativa_id });
        })
      );
    
}



    async delete(id){
    var alternativa = await this.findAlternativabyID(id)
           
            await knex.delete().where({alternativa_id:id}).table('exercicios_alternativas')
            await knex.delete().where({id:id}).table('alternativas')
           
    
}

async edit(id, descricao, conteudo){
    var exercicio = await this.findbyID(id)
    if(exercicio !=undefined){
        
        try{
            if(descricao!=undefined){    
                await knex.update({descricao:descricao}).where({id:id}).table("exercicios")     
                
            }

            var cont = await this.countExerciciosConteudos(id)
            
            if (conteudo != null) { // Garante que o valor não seja null ou undefined
                if (cont >= 1) {
                    await knex
                        .update({ id_conteudo: conteudo })
                        .where({ id_exercicio: id })
                        .table("exercicios_conteudos");
                } else {
                    await knex
                        .insert({ id_exercicio: id, id_conteudo: conteudo })
                        .table("exercicios_conteudos");
                }
            }
               
            
            return{status: true}

        }catch(err){
            console.log("deu errado")
            return{status: false, err: err}
        }

    }else{
        return {status:false, err:"Conteudo não existe"}
    }
}

async findbyText(query){
    var resultado = await knex('exercicios')
    .select('descricao', 'id')
    .where('descricao', 'like', `%${query}%`);
    return resultado;
}

async countExerciciosConteudos(id){
   var total = await knex('exercicios_conteudos').count('* as total').where('id_exercicio', id);
   return total[0].total
}

async findbyConteudo(id){
    var result = await knex.select(['exercicios.id', 'descricao', 'exercicios_conteudos.id_conteudo']).table('exercicios').rightJoin('exercicios_conteudos', 'exercicios_conteudos.id_exercicio', 'exercicios.id').where({id_conteudo:id})
        return result

}

async findByCategoria(id){
    var result = await knex.select(['exercicios.id', 'descricao', 'exercicios.categoria_id']).table('exercicios').where({categoria_id:id})
    return result
}
    
async findAvaliacoesAtivas() {
    const now = new Date();
        const data = await knex
            .select([
                'exercicios.id',
                'descricao',
                'data_inicio',
                'data_fim',
                'alternativa_id',
                'conteudo',
                'correta',
                'id_conteudo'
            ])
            .table('exercicios')
            .rightJoin('exercicios_alternativas', 'exercicios_alternativas.exercicio_id', 'exercicios.id')
            .rightJoin('alternativas', 'alternativas.id', 'exercicios_alternativas.alternativa_id')
            .rightJoin('exercicios_conteudos', 'exercicios_conteudos.id_exercicio', 'exercicios.id')
            .whereNotNull('exercicios.data_inicio') // <-- só exercícios sem data
            .whereNotNull('exercicios.data_fim')   // <-- só exercícios sem data
            .where('exercicios.data_inicio', '<=', now) // Data de início no passado ou presente
            .where('exercicios.data_fim', '>=', now); // Data de fim no futuro ou presente

        const exercises = {};

        data.forEach(row => {
            if (!exercises[row.id]) {
                exercises[row.id] = {
                    id: row.id,
                    descricao: row.descricao,
                    data_inicio: row.data_inicio,
                    data_fim: row.data_fim,
                    alternativas: []
                };
            }
            exercises[row.id].alternativas.push({
                id: row.alternativa_id,
                conteudo: row.conteudo,
                correta: row.correta
            });
        });

        return Object.values(exercises);
}


}
module.exports = new Exercicios();