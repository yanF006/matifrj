const Conteudos = require('./conteudos')
const Exercicios = require('../Exercicios/exercicios')
const Categorias = require('../Categorias/categorias')
class conteudosController{
    async create(req,res){
        var{titulo, descricao, serie, bimestre,categoria}= req.body;
        var id = req.session.user.id;
        if (titulo && descricao && serie && bimestre && categoria) {
            try {
                // Executa a função somente se os valores forem válidos
                await Conteudos.new(titulo,descricao,bimestre,serie,categoria, id);
                res.send('<script>alert("Conteúdo cadastrado com sucesso!"); window.location.href="/ConteudosCadastrar";</script>')
                
                
                
            } catch (error) {
                res.send('<script>alert("Erro ao cadastrar conteúdo!"); window.location.href="/ConteudosCadastrar";</script>')
                //res.status(500).send('Erro ao atualizar o conteúdo.');
            }
        } else {
            // Caso algum valor seja inválido, retorna um erro ou redireciona
            res.send('<script>alert("Algum campo está nulo, preencha todos para prosseguir!"); window.location.href="/ConteudosCadastrar";</script>')
        
        }

       
        
    }

    async exibir(req,res){
        var resultado = await Conteudos.findAll()
        var categorias = await Categorias.findAll()
        
        res.render("gerenciar-conteudos",{resultado:resultado, categorias:categorias})
    }

    async exibirTituloCategorias(req,res){
        var categorias = await Categorias.findAll()
        res.render("cadastroConteudos",{categorias: categorias})
    }

    async exibirTituloConteudos(req,res){
        var resultado = await Conteudos.findAll()
        res.render("atividades",{resultado:resultado})
    }

    async exibirBimestres(req,res){
        var {serie} = req.params;

        var bim1 = await Conteudos.findBySerieEBimestre(serie, 1)
        var bim2 = await Conteudos.findBySerieEBimestre(serie,2)
        var bim3 = await Conteudos.findBySerieEBimestre(serie,3)
        var bim4 = await Conteudos.findBySerieEBimestre(serie,4)
         
         res.render("Bimestres", {bim1:bim1, bim2:bim2, bim3:bim3,bim4:bim4} )
        
         

    }

    async exibirBimestresAlunos(req,res){
        var {serie} = req.params;

        var bim1 = await Conteudos.findBySerieEBimestre(serie, 1)
        var bim2 = await Conteudos.findBySerieEBimestre(serie,2)
        var bim3 = await Conteudos.findBySerieEBimestre(serie,3)
        var bim4 = await Conteudos.findBySerieEBimestre(serie,4)
         
         res.render("Bimestres-aluno", {bim1:bim1, bim2:bim2, bim3:bim3,bim4:bim4} )
        
         

    }

    async exibirConteudo(req,res){

        var {id} = req.params;

        if (id) {
            try {
                // Executa a função somente se os valores forem válidos
                var conteudo = await Conteudos.findbyConteudoID(id);
                var exercicios = await Exercicios.joinExerciciosAlternativas(id)
       
                res.render('exerciciosAlunos', {conteudo:conteudo, exercicios:exercicios}) 
                
            } catch (error) {
                res.send('<script>alert("Erro ao encontrar."); window.location.href="/index-admin";</script>')
                res.status(500).send('Erro ao atualizar o conteúdo.');
            }
        } else {
            // Caso algum valor seja inválido, retorna um erro ou redireciona
            res.send('<script>alert("Não foi possível encontrar."); window.location.href="/index-admin";</script>')
        
        }
        

    }  

    async exibirConteudoAluno(req,res){
        var {id} = req.params;

        if (id) {
            try {
                // Executa a função somente se os valores forem válidos
                var conteudo = await Conteudos.findbyConteudoID(id);
                var exercicios = await Exercicios.joinExerciciosAlternativas(id)
       
                res.render('exercicios-aluno', {conteudo:conteudo, exercicios:exercicios}) 
                
            } catch (error) {
                console.error('Erro ao atualizar conteúdo:', error);
                res.status(500).send('Erro ao atualizar o conteúdo.');
            }
        } else {
            // Caso algum valor seja inválido, retorna um erro ou redireciona
            res.send('<script>alert("Não foi possível encontrar."); window.location.href="/index-admin";</script>')
        
        } 

    }

    async editShow(req,res){
        var {id} = req.params;
       
        if (id) {
            try {
                // Executa a função somente se os valores forem válidos
                var conteudo = await Conteudos.findbyConteudoID(id);
                var categorias = await Categorias.findAll();
                res.render('editar-conteudos', {item:conteudo, categorias:categorias});
                
            } catch (error) {
                console.error('Erro ao atualizar conteúdo:', error);
                res.status(500).send('Erro ao atualizar o conteúdo.');
            }
        } else {
            // Caso algum valor seja inválido, retorna um erro ou redireciona
            res.send('<script>alert("Não foi possível encontrar."); window.location.href="/index-admin";</script>')
        
        }
        
    }

    async editarConteudo(req,res){
        const { id, titulo, descricao, serie, bimestre, categoria } = req.body;

        if (id && titulo && descricao && serie && bimestre && categoria) {
            try {
                // Executa a função somente se os valores forem válidos
                await Conteudos.update(id, titulo, descricao, bimestre, serie, categoria);
                res.send('<script>alert("Conteúdo editado com sucesso!"); window.location.href="/GerenciarConteudos";</script>')
                
            
            } catch (error) {
                console.error('Erro ao atualizar conteúdo:', error);
                res.status(500).send('Erro ao atualizar o conteúdo.');
            }
        } else {
            // Caso algum valor seja inválido, retorna um erro ou redireciona
            res.send('<script>alert("Algum campo está nulo, preencha todos para prosseguir!"); window.location.href="/editar-conteudos/ '+id+'";</script>')
        
        }

    }

    async findConteudoByText(req,res){
                const query = req.query.q 
                
                if (query) {
                    try {
                        // Executa a função somente se os valores forem válidos
                        var resultado = await Conteudos.findbyText(query);
                        var categorias= await Categorias.findAll()
                        res.render('gerenciar-conteudos', {resultado:resultado, categorias:categorias})
                    } catch (error) {
                        res.send('<script>alert("Erro ao procurar conteúdo."); window.location.href="/GerenciarConteudos";</script>')
                        res.status(500).send('Erro ao atualizar o conteúdo.');
                    }
                } else {
                    // Caso algum valor seja inválido, retorna um erro ou redireciona
                    res.send('<script>alert("Digite algum valor para pesquisar!"); window.location.href="/GerenciarConteudos";</script>')
                
                }
                
        
            }

            async findConteudosbyCategoria(req,res){
                    var {id_categoria} = req.query
                    if (id_categoria) {
                        try {
                            // Executa a função somente se os valores forem válidos
                            var resultado = await Conteudos.findConteudobyCategoria(id_categoria)
                            var categorias= await Categorias.findAll()
                            res.render('gerenciar-conteudos', {resultado:resultado, categorias:categorias})
                        } catch (error) {
                            res.send('<script>alert("Erro ao procurar conteúdo."); window.location.href="/GerenciarConteudos";</script>')
                            res.status(500).send('Erro ao atualizar o conteúdo.');
                        }
                    } else {
                        // Caso algum valor seja inválido, retorna um erro ou redireciona
                        res.send('<script>alert("Selecione alguma categoria para pesquisar!"); window.location.href="/GerenciarConteudos";</script>')
                    
                    }
                    

                    
                } 

    async deletarConteudo(req,res){
        var {id} = req.params
        await Conteudos.deleteConteudo(id)
        res.redirect('/GerenciarConteudos')
    }
     

    

}
module.exports = new conteudosController();