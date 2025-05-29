 const Categorias = require('./categorias')

 class categoriasController{
    async create(req,res){
        var {nome}= req.body

        if(nome){
            await Categorias.new(nome)
            res.redirect('/categorias')

        }else{
             res.send('<script>alert("Campo vazio, preencha corretamente!"); window.location.href="/categorias";</script>')
    }

    }


    async exibir(req,res){  
        const resultado = await Categorias.findAll()
        res.render('categorias',{categorias:resultado})
    }

    async apagar(req,res){
        var {id} = req.params
        await Categorias.delete(id)
        res.redirect('/categorias')
    }

    async editShow(req,res){
            var {id} = req.params;
           
            if (id) {
                try {
                    // Executa a função somente se os valores forem válidos
                    
                    var categorias = await Categorias.findbyID(id);
                    res.render('editar-categorias', {categorias:categorias});
                    
                } catch (error) {
                    console.error('Erro ao atualizar conteúdo:', error);
                    res.status(500).send('Erro ao atualizar o conteúdo.');
                }
            } else {
                // Caso algum valor seja inválido, retorna um erro ou redireciona
                res.send('<script>alert("Não foi possível encontrar."); window.location.href="/index-admin";</script>')
            
            }
            
        }

        async editarCategoria(req,res){
                const { id, nome } = req.body;
        
                if (id && nome) {
                    try {
                        // Executa a função somente se os valores forem válidos
                        await Categorias.update(id, nome);
                        res.send('<script>alert("Categoria editada com sucesso!"); window.location.href="/categorias";</script>')
                
                        
                    } catch (error) {
                        console.error('Erro ao atualizar conteúdo:', error);
                        res.status(500).send('Erro ao atualizar o conteúdo.');
                    }
                } else {
                    // Caso algum valor seja inválido, retorna um erro ou redireciona
                    res.send('<script>alert("Algum campo está nulo, preencha todos para prosseguir!"); window.location.href="/editar-categoria/'+id+'";</script>')
                
                }
        
            }
        

    

 }
 module.exports = new categoriasController();