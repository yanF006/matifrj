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
                .select('exercicios.*')
                .orderBy('exercicios.id', 'asc');

            // Para cada exercício, busca suas alternativas
            for (let exercicio of exercicios) {
                exercicio.alternativas = await knex('exercicios_alternativas')
                    .join('alternativas', 'exercicios_alternativas.alternativa_id', 'alternativas.id')
                    .where({ exercicio_id: exercicio.id })
                    .select(
                        'alternativas.id',
                        'alternativas.conteudo',
                        'alternativas.correta'
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
            const feito = await knex('avaliacoes_users')
                .where({ avaliacao_id: avaliacaoId, user_id: user_id })
                .first();

            if (feito) {
                throw new Error("Avaliação já foi realizada por este usuário.");
            }

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

            await knex('avaliacoes_users').insert({
                avaliacao_id: avaliacaoId,
                user_id: user_id,
                feito: 1
            });

            return totalCorretas;
        } catch (err) {
            console.log(err);
            throw err;
        }
    }

    async resultadosAvaliacao(avaliacaoId) {
        try {
            // Busca todos os usuários que responderam a avaliação
            const respostas = await knex('exercicios_avaliacoes_users_alternativas as eaua')
                .join('exercicios_avaliacoes as ea', 'eaua.exercicio_avaliacao_id', 'ea.id')
                .join('avaliacoes as a', 'ea.avaliacao_id', 'a.id')
                .join('exercicios as e', 'ea.exercicio_id', 'e.id')
                .join('users as u', 'eaua.user_id', 'u.id')
                .join('alternativas as alt', 'eaua.alternativa_id', 'alt.id')
                .where('a.id', avaliacaoId)
                .select(
                    'u.id as user_id',
                    'u.name as user_nome',
                    'e.id as exercicio_id',
                    'alt.id as alternativa_id',
                    'alt.conteudo as alternativa_conteudo'
                )
                .orderBy(['u.id', 'e.id']);

            // Agrupa por usuário
            const resultados = [];
            let usuarioAtual = null;
            let usuarioObj = null;

            for (const resposta of respostas) {
                if (!usuarioAtual || usuarioAtual !== resposta.user_id) {
                    if (usuarioObj) resultados.push(usuarioObj);
                    usuarioObj = {
                        user_id: resposta.user_id,
                        user_nome: resposta.user_nome,
                        respostas: []
                    };
                    usuarioAtual = resposta.user_id;
                }
                usuarioObj.respostas.push({
                    exercicio_id: resposta.exercicio_id,
                    alternativa_id: resposta.alternativa_id,
                    alternativa_conteudo: resposta.alternativa_conteudo
                });
            }
            if (usuarioObj) resultados.push(usuarioObj);

            return resultados;
        } catch (err) {
            console.log(err);
            return [];
        }
    }
}

module.exports = new Avaliacoes()