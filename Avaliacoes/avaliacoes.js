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

    async findExexerciciosByAvaliacaoId(id){
        try{
            const exercicios = await knex.select("exercicios.*")
            .from("exercicios")
            .innerJoin("exercicios_avaliacoes", "exercicios.id", "exercicios_avaliacoes.exercicio_id")
            .leftJoin("alternativas", "exercicios.id", "alternativas.exercicio_id")
            .where("exercicios_avaliacoes.avaliacao_id", id); // <-- CORRIGIDO
            return exercicios
        }catch(err){
            console.log(err)
            return []; // Retorne array vazio em caso de erro
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
}

module.exports = new Avaliacoes()