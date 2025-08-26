const User = require('./users')
const Turma = require('./Turmas/turmas')
var jwt = require('jsonwebtoken')
var bcrypt = require('bcryptjs')
var secretJWT = 'jdbuefbuhfihhgeieig'

class UserController{


    async edit(req,res){
        var {id} = req.params
        var {name,turma} = req.body
        var result = await User.update(id,name,turma)
        res.redirect('/perfil-alunor/'+id)
        
    }
    async editA(req,res){
        var {id} = req.params
        var {name,turma} = req.body
        var result = await User.update(id,name,turma)
        res.redirect('/perfil-admin/'+id)
        
    }

    async remove(req,res){
        var id = req.params.id

        var result = await User.delete(id)

        if(result.status){
            res.json('tudo certo')
        }else{
            res.json('deu bom nao :[')
        }


    }


    
    async index(req, res){ 
        var users = await User.findAll();
        
        res.json({users})
    }


    
    async findUser(req,res){
        var id = req.params.id;
        var user = await User.findByID(id)
        if (user ==undefined){
            res.json({})
        }else{
            res.status(404)
            res.json(user)
        }
    }


    async findByIDUser(req,res){
        var {id}= req.params
        var usuario = await User.findByID(id)
        var turma = await Turma.findByID(usuario[0].turma)
        var turmas = await Turma.findAll()
        res.render('editar-perfilAluno', { usuario: usuario[0], turma: turma, turmas: turmas})
    }

    async findByIDAdmin(req,res){
        var {id}= req.params
        var usuario = await User.findByID(id)
        var turma = await Turma.findByID(usuario[0].turma)
        res.render('editar-perfilAdmin', { usuario: usuario[0], turma: turma })
    }
    async findByIDUserShow(req,res){
        var {id}= req.params
        var usuario = await User.findByID(id)
        var turma = await Turma.findByID(usuario[0].turma)

        if (usuario && usuario.length > 0) {
            req.session.user = req.session.user || {};
            req.session.user.id = usuario[0].id;
            req.session.user.username = usuario[0].name;
            req.session.user.turma = usuario[0].turma;
            req.session.user.email = usuario[0].email;
            req.session.user.role = usuario[0].role;
            req.session.user.cpf = usuario[0].cpf;
            if(turma) req.session.user.turmaName = turma[0].nome; 

            res.render('perfil-aluno', { usuario: usuario[0], turma: turma });
        } else {
            res.status(404).send('Usuário não encontrado');
        }

    }

    async findByIDAdminShow(req,res){
        var {id}= req.params
        var usuario = await User.findByID(id)
        var turma = await Turma.findByID(usuario[0].turma)
        if (usuario && usuario.length > 0) {
            // Atualiza a sessão com os dados do usuário encontrado
            req.session.user = req.session.user || {};
            req.session.user.id = usuario[0].id;
            req.session.user.username = usuario[0].name;
            req.session.user.turma = usuario[0].turma;
            req.session.user.email = usuario[0].email;
            req.session.user.role = usuario[0].role;
            req.session.user.cpf = usuario[0].cpf;
            if(turma) req.session.user.turmaName = turma[0].nome;
            // Renderiza a página com os dados do usuário
            res.render('perfil-admin', { usuario: usuario[0], turma: turma });
        } else {
            // Usuário não encontrado
            res.status(404).send('Usuário não encontrado');
        }
        

    }







    async create(req,res){

        var {email,password,name,cpf, turma} = req.body

        if(email==undefined){
            res.status(400)
            res.send('<script>alert("Email inválido"); window.location.href="/cadastro";</script>')
            return;
        }

        //Tenta encontrar o email na tabela Users com a função findEmail
        var emailExists = await User.findEmail(email);

        //Verifica se o email já existe na tabela antes de enviar os dados
        if(emailExists){
            res.status(406);
            res.send('<script>alert("Email já está cadastrado"); window.location.href="/cadastro";</script>')
            return;//O return não permite que essa verificação seja ultrapassada, então é sempre importante lembrar
        }

        await User.new(email,password,name,cpf,turma) //"await" garante que a operação realmente foi executada
        
        var user =  await User.findByEmail(email)
        var turmaNome = await Turma.findByID(user.turma)
        req.session.user = {id:user.id, username: user.name, role: user.role, turma: user.turma, turmaName: turmaNome[0].nome};
                req.session.save((err) => { // Garante que a sessão seja salva antes de redirecionar
                    if (err) console.error(err);
                    if (user.role === 1) {
                        res.redirect('/index-admin');
                      } else {
                        res.redirect('/index-aluno');
                      }
                    })
        
        
        
    }


    async login(req,res){
        var {email,password} = req.body

        var user =  await User.findByEmail(email)
        var turma = await Turma.findByID(user.turma)

        if (user!=undefined){
            var result = await bcrypt.compare(password, user.password)

            if(result){

                if(turma) req.session.user = { id: user.id, username: user.name, role: user.role, turma: user.turma, turmaName: turma[0].nome};
                else req.session.user = { id: user.id, username: user.name, role: user.role, turma: user.turma, turmaName: null};
                req.session.save((err) => { // Garante que a sessão seja salva antes de redirecionar
                    if (err) console.error(err);
                    if (user.role === 1) {
                        res.redirect('/index-admin');
                      } else {
                        res.redirect('/index-aluno');
                      }
                });
                
                
                
            }else{
                
                res.status(404)
                res.send('<script>alert("Email e/ou senha incorretos"); window.location.href="/";</script>')
                // res.send('<script> Swal.fire({icon:"warning", text:"Email e/ou senha incorretos", title:"Erro ao fazer login"}).then(()=>); window.location.href="/login";</script>')
            

            }
            
        }else{
            res.send('<script>alert("Usuário não encontrado"); window.location.href="/";</script>')
            
            

        }

        
        
    }

    async findUserByName(req,res){
        const query = req.query.q || "vazio"
        var usuario = await User.findByName(query);
        res.render('cargos', {usuario:usuario})

    }

    async showUsers(req,res){
        var administradores = await User.findByRole(1)
        var usuario = await User.findByRole(0)
        res.render('cargos', {usuario:usuario, admin:administradores})
    }

    async findAllUsers(req,res){
        var{name} =req.params
        console.log(name)
        var usuario = await User.findAll()
        res.render('cargos', {usuario:usuario})
    }

    async mudarCargo(req,res){
        var {id,role} = req.body;
        await User.mudarRole(id,role)
        res.redirect('/cargos')

    }

        

}

module.exports = new UserController();