const knex = require("../database/database")

class Avaliacoes
{
    async new(nome, data_inicio, data_fim, user_id){
        try{
            const [id] = await knex.insert({nome, data_inicio, data_fim, user_id}).table("avaliacoes");
            return id
        }catch(err){
            console.log(err)
        }
    }

    async joinExercicioAvaliacao(exercicio_id, avaliacao_id) {
        try {
            await knex.insert({ avaliacao_id, exercicio_id }).table("exercicios_avaliacoes");
        } catch (err) {
            console.log(err);
        }
    }

    async findAllAtivas(){
        try{
            var dataAtual = new Date();
            const avaliacoes = await knex.select("*").from("avaliacoes")
            .where("data_fim", ">=", dataAtual)
            .orderBy("data_inicio", "asc");

            return avaliacoes
        }catch(err){
            console.log(err)
        }
    }
    
    async findExerciciobyCategoria(id){
        var resultado = await knex.select(['id', 'titulo', 'descricao']).where({categoria:id}).table('exercicios')
        return resultado
    }

    async findExerciciosByAvaliacaoId(id) {
        try {
            // Busca todos os exercícios da avaliação
            const exercicios = await knex('exercicios')
                .innerJoin('exercicios_avaliacoes', 'exercicios.id', 'exercicios_avaliacoes.exercicio_id')
                .where('exercicios_avaliacoes.avaliacao_id', id)
                .select('exercicios.*');

            // Para cada exercício, busca suas alternativas
            for (let exercicio of exercicios) {
                exercicio.alternativas = await knex('exercicios_alternativas')
                    .join('alternativas', 'exercicios_alternativas.alternativa_id', 'alternativas.id')
                    .where({ exercicio_id: exercicio.id })
                    .select(
                        'alternativas.id',
                        'alternativas.conteudo'
                    );
            }

            return exercicios;
        } catch (err) {
            console.log(err);
            return [];
        }
    }

    async findById(id){
        try{
            const avaliacao = await knex.select("*").from("avaliacoes").where({id}).first();
            return avaliacao
        }
        catch(err){
            console.log(err)
        }
    }

    async verificarRespostasAvaliacao(avaliacaoId, respostas, user_id) {
        try {
            // Busca todos os exercícios da avaliação
            const exercicios = await knex('exercicios')
                .innerJoin('exercicios_avaliacoes', 'exercicios.id', 'exercicios_avaliacoes.exercicio_id')
                .where('exercicios_avaliacoes.avaliacao_id', avaliacaoId)
                .select('exercicios.id');

            let totalCorretas = 0;

            for (let exercicio of exercicios) {
                const respostaAluno = respostas[exercicio.id];
                if (!respostaAluno) continue;

                // Busca se a alternativa marcada pelo aluno é a correta
                const alternativa = await knex('alternativas')
                    .where({ id: respostaAluno })
                    .first();

                if (alternativa && alternativa.correta) {
                    totalCorretas += 1;
                }

                const id = await knex.select('id').from('exercicios_avaliacoes').where({avaliacao_id: avaliacaoId, exercicio_id: exercicio.id}).first()

                await knex('exercicios_avaliacoes_users_alternativas')
                .insert({
                    exercicio_avaliacao_id: id.id,
                    user_id: user_id,
                    alternativa_id: respostaAluno
                })

            }

            const feito = await knex('avaliacoes_users').where({avaliacao_id: avaliacaoId, user_id: user_id}).select('feito');

            if(feito != null) return -1;

            await knex('avaliacoes_users')
            .insert({
                avaliacao_id: avaliacaoId,
                user_id: user_id,
                feito: feito != null ? feito + 1 : 1,
            });

            return totalCorretas;
        } catch (err) {
            console.log(err);
            throw err;
        }
    }

    async resultadosAvaliacao(avaliacaoId) {
        try {
            const resultados = await knex('users')
                .innerJoin('exercicios_avaliacoes_users_alternativas', 'users.id', 'exercicios_avaliacoes_users_alternativas.user_id')
                .innerJoin('exercicios_avaliacoes', 'exercicios_avaliacoes_users_alternativas.exercicio_avaliacao_id', 'exercicios_avaliacoes.id')
                .where('exercicios_avaliacoes.avaliacao_id', avaliacaoId)
                .select('users.*')
                .groupBy('users.id');

            for (let res of resultados) {
                res.alternativas = await knex('alternativas')
                    .innerJoin('exercicios_avaliacoes_users_alternativas', 'alternativas.id', 'exercicios_avaliacoes_users_alternativas.alternativa_id')
                    .innerJoin('exercicios_avaliacoes', 'exercicios_avaliacoes_users_alternativas.exercicio_avaliacao_id', 'exercicios_avaliacoes.id')
                    .where('exercicios_avaliacoes_users_alternativas.user_id', res.id)
                    .andWhere('exercicios_avaliacoes.avaliacao_id', avaliacaoId)
                    .select('alternativas.conteudo')
            }

            return resultados;
        } catch (err) {
            console.log(err);
            return [];
        }
    }
}

module.exports = new Avaliacoes()