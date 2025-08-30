const express = require("express")
const app = express()
const flash = require('connect-flash');
const bodyParser = require('body-parser')
// const cors = require('cors')
const ExerciciosController = require('./Exercicios/exerciciosController')
const UserController = require('./Users/usersController')
const ConteudosController = require('./Conteudos/conteudosController')
const CategoriaController = require('./Categorias/categoriasController')
const jwt = require("jsonwebtoken")
const bcrypt = require('bcrypt')
var secretJWT =  "aaaajdhdhfnpm "
const AvisosController = require('./Avisos/avisosController');

const session = require('express-session');
const conteudosController = require("./Conteudos/conteudosController");

const turmas = require("./Users/Turmas/turmas");
const turmasController = require("./Users/Turmas/turmasController");

const mysql = require('mysql2/promise');
const dayjs = require('dayjs');

const avaliacoesController = require('./Avaliacoes/avaliacoesController');

app.use(session({
    secret: 'Quincas1234',   // Substitua por uma chave secreta segura
    resave: false,             // Não resalvar a sessão se não houver alterações
    saveUninitialized: false,  // Não salvar sessões vazias
    cookie: {
        maxAge: 7 * 24 * 60 * 60 * 1000  // 7 dias para expiração do cookie
    }
}));

app.use(express.json()); 
app.set("view engine", "ejs")
app.use(express.static('public'));

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(bodyParser.json())

// app.use(cors({
    //     exposedHeaders: ['Authorization'] // Aqui está a configuração para expor o cabeçalho Authorization
    // }))
    
    
    app.use(flash());
    app.use((req, res, next) => {
        res.locals.user = req.session.user || null;
        res.locals.flash = req.flash();
        next();
    });

    function isAuthenticated(role) {
        return (req, res, next) => {
            if (req.session.user && req.session.user.role === role) {
                next();
            } else {
                res.send('<script>alert("Acesso não autorizado! Apenas administradores podem acessar essa página."); window.location.href="/index-aluno";</script>')
                // Redireciona para a página de login
            }
        };
    }

    function isLoggedIn() {
        return (req, res, next) => {
            if (req.session && req.session.user) {
                next(); // Usuário está logado, prossegue para a próxima função middleware
            } else {
                res.send('<script>alert("Você precisa estar logado para acessar essa página!"); window.location.href="/";</script>')
                // Redireciona para a página de login
            }
        };
    }


app.get("/naoAutorizado",(req,res) => {
    res.render("nao-autorizado");
});

//Categorias
app.get("/categorias", isAuthenticated(1),CategoriaController.exibir); 
app.post("/categoriasCriar",isAuthenticated(1), CategoriaController.create);
app.delete("/categoriasDeletar/:id",isAuthenticated(1), CategoriaController.apagar);
app.get('/editar-categoria/:id',isAuthenticated(1), CategoriaController.editShow)
app.post("/categoriasEditar/:id",isAuthenticated(1), CategoriaController.editarCategoria);



//PAGINA INICIAL
//admin
app.get("/index-admin",isAuthenticated(1), AvisosController.exibirAvisos);
//aluno
app.get("/index-aluno", isLoggedIn(), AvisosController.exibirAvisosAluno);



//LOGIN E CADASTRO
app.get("/",(req,res) => {
    res.render("login");
});
app.get("/cadastro", turmasController.index);

app.get("/Autenticar",(req,res) => {
    res.render("Autenticar");
});

app.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.send('Erro ao encerrar a sessão');
        }
        res.redirect('/');
    });
});

app.get('/editar-perfilAluno/:id', isLoggedIn(),UserController.findByIDUser)

app.get('/editar-perfilAdmin/:id', isAuthenticated(1),UserController.findByIDAdmin)

app.post('/editarAluno/:id',isLoggedIn(), UserController.edit)

app.post('/editarAdmin/:id',isAuthenticated(1), UserController.editA)

app.get("/buscar",isAuthenticated(1), UserController.findUserByName)

app.post("/cadastro", UserController.create)
app.post("/login", UserController.login )
app.get("/cargos", isAuthenticated(1), UserController.findAllUsers);

app.post('/update-role',isAuthenticated(1), UserController.mudarCargo)

app.get('/perfil-alunor/:id', isLoggedIn(),UserController.findByIDUserShow)
app.get('/perfil-admin/:id', isAuthenticated(1),UserController.findByIDAdminShow)


app.get('/perfil-aluno', (req,res) => {
    res.render("perfil-aluno");})



//  BIMESTRES
    //admin
app.get("/Bimestres-admin/:serie",isAuthenticated(1), ConteudosController.exibirBimestres);

    //aluno
app.get("/Bimestres-aluno/:serie",isLoggedIn(), ConteudosController.exibirBimestresAlunos);



//EXERCICIOS 
    //admin
 app.get("/atividades",isAuthenticated(1), ConteudosController.exibirTituloConteudos
 );


app.get("/alternativas/:id",isAuthenticated(1), ExerciciosController.exibirAlternativas);
app.get('/adicionar-alternativas/:id',isAuthenticated(1), ExerciciosController.exibirAlternativasADD)
app.put('/updateCorreta',isAuthenticated(1), ExerciciosController.updateAlternativasCorreta)
app.get('/editar-alternativas/:id',isAuthenticated(1), ExerciciosController.exibirAlternativasEdit)
app.delete('/deleteAlternativa/:id', isAuthenticated(1), ExerciciosController.remove)
app.delete('/deleteAlternativaEdit/:id',isAuthenticated(1),  ExerciciosController.removeEdit)
app.post('/editarAlternativa/:id',isAuthenticated(1), ExerciciosController.updateAlternativasText)

app.post('/alternativasCreate',isAuthenticated(1), ExerciciosController.createALternativa)

app.get('/verificarCorretas/:id', isAuthenticated(1),ExerciciosController.verificarAlternativas)
app.get('/verificarCorretasEdit/:id',isAuthenticated(1), ExerciciosController.verificarAlternativasEdit)
app.post('/saveAlternativas',isAuthenticated(1), ExerciciosController.verificaçãoESalvarAlternativas)
app.post('/adicionarAlternativa',isAuthenticated(1), ExerciciosController.createALternativaADD)


app.get("/exerciciosAlunos/:id",isAuthenticated(1), ConteudosController.exibirConteudo);
app.post('/exerciciosCreate', isAuthenticated(1),ExerciciosController.create)
app.get('/concluido', (req,res) => {
    res.render("concluido"); })
app.post('/verificarRespostasADM', isAuthenticated(1), ExerciciosController.verificarRespostas)
app.get('/gerenciar-exercicios', isAuthenticated(1), ExerciciosController.mostrarTodosExercicios)
app.delete('/delete-exercicio/:id',isAuthenticated(1), ExerciciosController.deleteExercic)

//  
app.get('/editar-exercicios/:id', isAuthenticated(1), ExerciciosController.editarExerciciosShow)
app.post('/editarExercicios', isAuthenticated(1), ExerciciosController.editarExercicios)

app.get('/buscarExerciciosTexto', isAuthenticated(1), ExerciciosController.findExercicioByText)
app.get('/buscarExerciciosPorConteudo', isAuthenticated(1), ExerciciosController.findExerciciosbyConteudo)

    // aluno
app.get("/exercicios-aluno/:id",isLoggedIn(), ConteudosController.exibirConteudoAluno);
//app.get("/avaliacoes", isAuthenticated(1), AvaliacoesController.exibirAvaliacoes);
//app.get("/avaliacoes-aluno", isLoggedIn(), AvaliacoesController.exibirAvaliacoesAluno);
app.post('/verificarRespostas',isLoggedIn(), ExerciciosController.verificarRespostas);

//CONTEUDOS
    //admin
app.get("/ConteudosCadastrar",isAuthenticated(1), conteudosController.exibirTituloCategorias
);
app.get('/GerenciarConteudos', isAuthenticated(1), ConteudosController.exibir)
app.get('/editar-conteudos/:id', isAuthenticated(1), ConteudosController.editShow)
app.delete('/delete-conteudo/:id', isAuthenticated(1), ConteudosController.deletarConteudo)
app.get('/buscarConteudoTexto', isAuthenticated(1), ConteudosController.findConteudoByText)
app.get('/buscarConteudosPorCategoria', isAuthenticated(1), ConteudosController.findConteudosbyCategoria)

app.post("/ConteudosCadastrar", isAuthenticated(1),ConteudosController.create)
app.post('/editarConteudos', isAuthenticated(1), ConteudosController.editarConteudo)

//Turmas
app.get('/turmas', isAuthenticated(1), turmasController.index2)
app.post('/turmasCriar', isAuthenticated(1), turmasController.criar)
app.delete('/turmasDeletar/:id', isAuthenticated(1), turmasController.deletar)

//Avisos
app.get('/cadastro-avisos', isAuthenticated(1), (req, res) => {
    res.render('cadastroAvisos');
});
app.post('/AvisosCadastrar', isAuthenticated(1), AvisosController.criarAviso);

//Avaliacoes
app.get('/cadastroAvaliacao', isAuthenticated(1), avaliacoesController.paginaCadastro);
app.post('/avaliacaoCriar', isAuthenticated(1), avaliacoesController.criarAvaliacao);

//app.get('/exibirConteudo', isAuthenticated(1), ConteudosController.exibir)

//app.get('/desempenho', isAuthenticated(1), ExerciciosController.tabelaDesempenho);

app.listen(8070,()=>{
    console.log("Servidor Rodando")
})
