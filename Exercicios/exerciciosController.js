const Exercicios =  require('./exercicios')
const Conteudos = require('../Conteudos/conteudos')
const knex = require('../database/database')
const googleSheetsService = require('../servicos/googleSheetsService')

class exerciciosController {

    async create(req,res){
       var {descricao, id_conteudo} = req.body
       if (descricao){
           var exercicioID = await Exercicios.insertContentExercicio(descricao, id_conteudo)
           res.redirect('/alternativas/' + exercicioID)
       }else{
        res.send('<script>alert("Campo vazio, preencha corretamente!"); window.location.href="/atividades";</script>')
       }
       
        
       
        

    }


    async verificaçãoESalvarAlternativas(req, res) {
        const { id_ex, alternativas } = req.body;
        console.log("Dados recebidos no backend:", req.body);
    
        if (!id_ex || !alternativas || alternativas.length === 0) {
            return res.status(400).json({ success: false, message: "Dados inválidos." });
        }
    
        try {
            // Verifica se há mais de uma alternativa marcada como correta
            const corretasMarcadas = alternativas.filter(alt => alt.correta === 1);
    
            if (corretasMarcadas.length > 1) {
                return res.status(400).json({
                    success: false,
                    message: "Apenas uma alternativa pode ser marcada como correta.",
                });
            }
    
            if (corretasMarcadas.length === 0) {
                return res.status(400).json({
                    success: false,
                    message: "Pelo menos uma alternativa deve ser marcada como correta.",
                });
            }
    
            // Atualiza ou insere cada alternativa
            for (const alternativa of alternativas) {
                const { id_alternativa, conteudo, correta } = alternativa;
    
                // Atualiza ou insere na tabela alternativa
                await knex("alternativas")
                    .where({ id: id_alternativa })
                    .update({ conteudo, correta })
                    .onConflict("id")
                    .merge();
    
                // Atualiza ou insere na tabela exercicios_alternativas
                const exists = await knex("exercicios_alternativas")
                    .where({ exercicio_id: id_ex, alternativa_id: id_alternativa })
                    .first();
    
                if (!exists) {
                    await knex("exercicios_alternativas").insert({
                        exercicio_id: id_ex,
                        alternativa_id: id_alternativa,
                    });
                }
            }
    
            res.json({ success: true, message: "Alternativas atualizadas com sucesso." });
        } catch (error) {
            console.error("Erro ao salvar alternativas:", error);
            res.status(500).json({ success: false, message: "Erro no servidor." });
        }
    }


    async removeEdit(req, res) {
        const { id } = req.params; // ID da alternativa
        const { id_ex } = req.query; // ID do exercício via query param
        
        try {
            await knex("alternativas").where("id", id).del(); // Deleta da tabela 'alternativas'
    
            // Opcional: também remover da tabela 'exercicios_alternativas'
            await knex("exercicios_alternativas")
                .where({ exercicio_id: id_ex, alternativa_id: id })
                .del();
    
            res.redirect(`/editar/${id_ex}`); // Redireciona de volta para a página de edição
        } catch (error) {
            console.error("Erro ao deletar alternativa:", error);
            res.status(500).json({ success: false, message: "Erro ao deletar alternativa." });
        }
    }



    async createALternativa (req,res){
        const { id_ex, alternativas } = req.body;
console.log("Dados recebidos no backend:", req.body);

if (!id_ex || !alternativas || alternativas.length === 0) {
    return res.status(400).json({ success: false, message: "Dados inválidos." });
}

try {
    // Verifica se há mais de uma alternativa marcada como correta
    const corretasMarcadas = alternativas.filter(alt => alt.correta === 1);

    if (corretasMarcadas.length > 1) {
        return res.status(400).json({
            success: false,
            message: "Apenas uma alternativa pode ser marcada como correta.",
        });
    }

    if (corretasMarcadas.length === 0) {
        return res.status(400).json({
            success: false,
            message: "Pelo menos uma alternativa deve ser marcada como correta.",
        });
    }

    // Itera sobre cada alternativa e insere na tabela "alternativas" e "exercicios_alternativas"
    for (const alternativa of alternativas) {
        const { conteudo, correta } = alternativa;

        // Insere a alternativa na tabela "alternativas"
        const [id] = await knex("alternativas")
            .insert({ conteudo, correta })
             // Retorna o ID gerado da alternativa

        // Insere a relação na tabela "exercicios_alternativas"
        await knex("exercicios_alternativas").insert({
            exercicio_id: id_ex,
            alternativa_id: id,
        });
    }

    res.json({ success: true, message: "Alternativas criadas com sucesso." });
} catch (error) {
    console.error("Erro ao salvar alternativas:", error);
    res.status(500).json({ success: false, message: "Erro no servidor." });
}

    }



    async createALternativaADD (req,res){
        const { id_ex, alternativas } = req.body;
console.log("Dados recebidos no backend:", req.body);

if (!id_ex || !alternativas || alternativas.length === 0) {
    return res.status(400).json({ success: false, message: "Dados inválidos." });
}

try {

    // Itera sobre cada alternativa e insere na tabela "alternativas" e "exercicios_alternativas"
    for (const alternativa of alternativas) {
        const { conteudo, correta } = alternativa;

        // Insere a alternativa na tabela "alternativas"
        const [id] = await knex("alternativas")
            .insert({ conteudo, correta:0 })
             // Retorna o ID gerado da alternativa

        // Insere a relação na tabela "exercicios_alternativas"
        await knex("exercicios_alternativas").insert({
            exercicio_id: id_ex,
            alternativa_id: id,
        });
    }

    res.json({ success: true, message: "Alternativas criadas com sucesso." });
} catch (error) {
    console.error("Erro ao salvar alternativas:", error);
    res.status(500).json({ success: false, message: "Erro no servidor." });
}

    }



    async exibirAlternativas(req,res){
        var {id} = req.params
        
        var result = await Exercicios.exibirAlternativas(id)
       // res.json(result)
       res.render("alternativasCreate",{result:result, id:id})

    }

    async exibirAlternativasADD(req,res){
        var {id} = req.params
        
        var result = await Exercicios.exibirAlternativas(id)
       // res.json(result)
       res.render("adicionarAlternativas",{result:result, id:id})

    }
    async exibirAlternativasEdit(req,res){
        var {id} = req.params
        var result = await Exercicios.exibirAlternativas(id)
       // res.json(result)
       res.render("editar-alternativas",{result:result, id:id})

    }

    async showID(req,res){
        req.body
        var id = await Exercicios.showID()
    }

    async createAlt(req,res){
        //mudar o id pra req.params quando desenvolver o front disso 
        var {id_ex,conteudo,correta} = req.body

        if (conteudo){
            await Exercicios.newAlt(id_ex,conteudo,correta)
            res.redirect("/alternativas/"+ id_ex)

        }else{res.send('<script>alert("Campo vazio, preencha corretamente!"); window.location.href="/alternativas/' + id_ex + '";</script>')
        }
    }

    async showAll(req,res){
        var mostrar = await Exercicios.joinExerciciosAlternativas()
        res.json({mostrar})
        
        // var exercicios = Exercicios.findAll()
        // res.json({exercicios})
    }
    async showAllWContent(req,res){
        var {conteudo} = req.body
        var show = await Exercicios.joinConteudosExerciciosAlternativas(conteudo)
        res.json({show})
    }

    async remove(req,res){
        var {id} = req.params
        var{id_ex} = req.query
        await Exercicios.delete(id)
        res.redirect('/alternativas/'+ id_ex)

    }
    async removeEdit(req,res){
        var {id} = req.params
        var{id_ex} = req.query
        await Exercicios.delete(id)
        res.redirect('/editar-alternativas/'+ id_ex)

    }

    async updateAlternativasCorreta(req,res){
        const {id_alternativa, correta} = req.body;
        await Exercicios.updateAlternativas(id_alternativa, correta)

    }

    async updateAlternativasText(req,res){
        var {id_alternativa, conteudo} = req.body
        var{id_ex} = req.query
        await Exercicios.updateAlternativasT(id_alternativa,conteudo)
        res.send('<script>alert("Alterações salvas com sucesso!"); window.location.href="/editar-alternativas/' + id_ex + '";</script>')
    }

    

    async verificarAlternativas(req,res){
        const {id} = req.params
        var resultado = await Exercicios.verificarCorretas(id)
        const totalCorretas = resultado[0]?.total_corretas;
        if(totalCorretas>1){
            res.send('<script>alert("Há mais de uma alternativa marcada como correta!"); window.location.href="/alternativas/' + id + '";</script>')
            await Exercicios.todasErradas(id)

            // res.redirect('/alternativas/' + id)
        }else if(totalCorretas==undefined){
            res.send('<script>alert("Não há nenhuma alternativa marcada como correta!"); window.location.href="/alternativas/' + id + '";</script>')
            
        }else{
            res.send('<script>alert("Exercício cadastrado com sucesso!"); window.location.href="/atividades";</script>')
        
        }

        
    }
    async verificarAlternativasEdit(req,res){
        const {id} = req.params
        var resultado = await Exercicios.verificarCorretas(id)
        const totalCorretas = resultado[0]?.total_corretas;
        if(totalCorretas>1){
            res.send('<script>alert("Há mais de uma alternativa marcada como correta!"); window.location.href="/editar-alternativas/' + id + '";</script>')
            await Exercicios.todasErradas(id)

            // res.redirect('/alternativas/' + id)
        }else if(totalCorretas==undefined){
            res.send('<script>alert("Não há nenhuma alternativa marcada como correta!"); window.location.href="/editar-alternativas/' + id + '";</script>')
            
        }else{
            res.send('<script>alert("Exercício cadastrado com sucesso!"); window.location.href="/showAllExercicios";</script>')
        
        }

        
    }

    async verificarRespostas(req, res) {
        const { respostas } = req.body;
        const respostasCorretas = [];

        // Pegue o nome do usuário da sessão (ajuste conforme sua estrutura)
        const nome = req.session.user ? req.session.user.username : 'Desconhecido';
        const data = new Date().toLocaleString('pt-BR', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
        });
        const hora = new Date().toLocaleTimeString('pt-BR', {
            hour: '2-digit',
            minute: '2-digit',
        });

        // Array que vai para a planilha: [nome, data, certo1, certo2, ...]
        const linhaParaSheet = [];

        var counter = 0;
        var counterCorretas = 0;
        for (const resposta of respostas) {
            const id = resposta.resposta;
            const exerc_id = resposta.perguntaId;
            counter++;
            try {
                const result = await Exercicios.findAlternativaByID(id, exerc_id);
                const reference = await Exercicios.findAlternativasCorretas(exerc_id);

                const correta = result[0].alternativa_id === reference[0].alternativa_id ? 1 : 0;
                counterCorretas += correta;
                respostasCorretas.push({
                    perguntaId: exerc_id,
                    correta: !!correta,
                    mensagem: `${counter}) Resposta ${correta ? 'correta' : 'errada'}`,
                });

                // Adiciona o resultado (0 ou 1) na linha
                linhaParaSheet.push(correta);
            } catch (error) {
                console.error(`Erro ao buscar alternativa com ID ${id}:`, error);
                // Se quiser, pode adicionar um valor padrão em caso de erro:
                linhaParaSheet.push('erro');
            }
        }

        linhaParaSheet.unshift(nome, data, hora, counterCorretas); // Adiciona o número de respostas corretas no início da linha

        // Adiciona apenas UMA linha na planilha
        await googleSheetsService.addRow(
            '1jxXjHn_YbrNJQsbziOtM6cBY5aifymppaP_R1CVX2Ec',
            'Exercicios1!A:Z', // Ajuste o range conforme o máximo de colunas
            linhaParaSheet, // Note o array dentro de array!
        );

        res.json({
            sucesso: true,
            respostas: respostasCorretas,
        });
    }

    async mostrarTodosExercicios(req,res){
        var exercicios = await Exercicios.findAll()
        var conteudos = await Conteudos.findAll()
        res.render('gerenciar-atividades', {exercicios:exercicios, conteudos:conteudos})
    }

    async deleteExercic(req,res){
        var {id} = req.params
        await Exercicios.deleteExercicio(id)
        res.redirect('/gerenciar-exercicios')

    }
    
    async editarExerciciosShow(req,res){
        var {id} = req.params 
        var exercicio = await Exercicios.findExercicioEConteudoByID(id)
        var resultado = await Conteudos.findAll()
        console.log(exercicio)
        
        res.render('editar-exercicios', { resultado: resultado,
            exercicio: exercicio.length > 0 ? exercicio : [{ descricao: null, id_conteudo: null }]})

    }

    async editarExercicios(req,res){
        var {id,id_conteudo,descricao} = req.body

         if (id && descricao) {
                    try {
                        // Executa a função somente se os valores forem válidos
                        await Exercicios.edit(id,descricao,id_conteudo)
                        res.send('<script>alert("Exercício editado com sucesso!"); window.location.href="/gerenciar-exercicios";</script>')
                     
                    } catch (error) {
                        console.error('Erro ao atualizar conteúdo:', error);
                        res.status(500).send('Erro ao atualizar o conteúdo.');
                    }
                } else {
                    // Caso algum valor seja inválido, retorna um erro ou redireciona
                    res.send('<script>alert("Algum campo está nulo, preencha todos para prosseguir!"); window.location.href="/editar-exercicios/ '+id+'";</script>')
                
                }
       
    }
    

     async findExercicioByText(req,res){
            const query = req.query.q || "vazio"
            var exercicios = await Exercicios.findbyText(query);
            var conteudos = await Conteudos.findAll()
            res.render('gerenciar-atividades', {exercicios:exercicios, conteudos:conteudos})
    
        }

    async findExerciciosbyConteudo(req,res){
        var {id_conteudo}= req.query
        var exercicios = await Exercicios.findbyConteudo(id_conteudo)
        var conteudos = await Conteudos.findAll()
         res.render('gerenciar-atividades', {exercicios:exercicios, conteudos:conteudos})
    }    
}
    

module.exports = new exerciciosController();