const express = require("express");
const app = express();

const Usuario = require("./models/Usuario");
const Pagamento = require("./models/Pagamento");
const path = require('path');
const router = express.Router();
const moment = require('moment');
const handlebars = require("express-handlebars");

// Configuração do Handlebars
app.engine('handlebars', handlebars({
    defaultLayout: 'main',
    runtimeOptions: {
        allowProtoPropertiesByDefault: true,
        allowProtoMethodsByDefault: true,
    },
    helpers: {
        formatDate: (date) => {
            return moment(date).format('DD/MM/YYYY');
        }
    }
}));
app.set('view engine', 'handlebars');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Rotas de Usuário
router.get('/usuario', function(req, res) {
    res.render('cad_usuario'); // Renderiza a view 'cad_usuario.handlebars'
});

router.post('/usuario', function(req, res) {
    Usuario.create({
        nome: req.body.nome,
        email: req.body.email,
        senha: req.body.senha
    }).then(function() {
        res.redirect('/usuario'); // Redireciona para a lista de usuários
    }).catch(function(erro) {
        res.send("Erro: Usuário não foi cadastrado com sucesso!" + erro);
    });
});

router.get('/usuario/lista', function(req, res) {
    Usuario.findAll().then(function(usuarios) {
        res.render('lista_usuarios', { usuarios: usuarios }); // Renderiza a view 'lista_usuarios.handlebars'
    });
});

router.get('/del-usuario/:id', function(req, res) {
    Usuario.destroy({
        where: { 'id': req.params.id }
    }).then(function() {
        res.redirect('/usuario/lista'); // Redireciona para a lista de usuários
    }).catch(function(erro) {
        res.send("Erro: Usuário não foi apagado com sucesso!" + erro);
    });
});

router.get('/edit-usuario/:id', function(req, res) {
    Usuario.findByPk(req.params.id).then(function(usuario) {
        res.render('editarUsuario', { usuario: usuario }); // Renderiza a view 'editarUsuario.handlebars'
    });
});

router.post('/edit-usuario/:id', function(req, res) {
    Usuario.update({
        nome: req.body.nome,
        email: req.body.email,
        senha: req.body.senha
    }, {
        where: { id: req.params.id }
    }).then(function() {
        res.redirect('/usuario/lista'); // Redireciona para a lista de usuários
    }).catch(function(erro) {
        res.send("Erro: Usuário não foi atualizado com sucesso!" + erro);
    });
});


// Rotas de Pagamento
router.get('/pagamento', function(req, res) {
    res.render('pagamento'); // Renderiza a view 'pagamento.handlebars'
});

router.get('/', function(req, res) {
    res.render('index'); // Renderiza a view 'index.handlebars'
});

router.post('/pagamento', function(req, res) {
    Pagamento.create({
        nome: req.body.nome,
        valor: req.body.valor
    }).then(function() {
        res.redirect('/pagamento');
    }).catch(function(erro) {
        res.send("Erro: Pagamento não foi cadastrado com sucesso!" + erro);
    });
});

router.get('/lista', function(req, res) {
    Pagamento.findAll().then(function(pagamentos) {
        res.render('pagamento', { pagamentos: pagamentos }); // Renderiza a view 'pagamento.handlebars'
    });
});

router.get('/del-pagamento/:id', function(req, res) {
    Pagamento.destroy({
        where: { 'id': req.params.id }
    }).then(function() {
        res.redirect('/pagamento');
    }).catch(function(erro) {
        res.send("Erro: Pagamento não foi apagado com sucesso!" + erro);
    });
});

router.get('/edit-pagamento/:id', function(req, res) {
    Pagamento.findByPk(req.params.id).then(function(pagamentos) {
        res.render('editar', { pagamentos: pagamentos }); // Renderiza a view 'editar.handlebars'
    });
});

router.post('/edit-pagamento/:id', function(req, res) {
    Pagamento.update({
        nome: req.body.nome,
        valor: req.body.valor
    }, {
        where: { 'id': req.params.id }
    }).then(function() {
        res.redirect('/lista');
    }).catch(function(erro) {
        res.send("Erro: Pagamento não foi atualizado com sucesso!" + erro);
    });
});

// Usar o router configurado
app.use('/', router);

// Iniciar o servidor
app.listen(8080, function() {
    console.log("Servidor rodando na porta 8080");
});
