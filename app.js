const express = require("express");
const app = express();

const Animais = require("./models/animais");
const Veterinarios = require("./models/veterinarios");
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

// Configuração de arquivos estáticos (CSS, JS, etc.)
app.use(express.static(path.join(__dirname, 'public')));

// Rotas de Animais
router.get('/animais/cadastro', (req, res) => {
    res.render('cadastro_animais');
});

router.post('/animais/cadastro', (req, res) => {
    Animais.create({
        nome: req.body.nome,
        especie: req.body.especie,
        raca: req.body.raca,
        idade: req.body.idade
    }).then(() => {
        res.redirect('/animais/listagem');
    }).catch((erro) => {
        res.send("Erro: Animal não foi cadastrado com sucesso! " + erro);
    });
});

router.get('/animais/listagem', (req, res) => {
    Animais.findAll().then((animais) => {
        res.render('listagem_animais', { animais: animais });
    });
});

router.get('/animais/edicao/:id', (req, res) => {
    Animais.findByPk(req.params.id).then((animal) => {
        res.render('edicao_animais', { animal: animal });
    });
});

router.post('/animais/edicao/:id', (req, res) => {
    Animais.update({
        nome: req.body.nome,
        especie: req.body.especie,
        raca: req.body.raca,
        idade: req.body.idade
    }, {
        where: { id: req.params.id }
    }).then(() => {
        res.redirect('/animais/listagem');
    }).catch((erro) => {
        res.send("Erro: Animal não foi atualizado com sucesso! " + erro);
    });
});

router.post('/animais/exclusao/:id', (req, res) => {
    Animais.destroy({
        where: { id: req.params.id }
    }).then(() => {
        res.redirect('/animais/listagem');
    }).catch((erro) => {
        res.send("Erro: Animal não foi excluído com sucesso! " + erro);
    });
});

// Rotas de Veterinários
router.get('/veterinarios/cadastro', (req, res) => {
    res.render('cadastro_veterinarios');
});

router.post('/veterinarios/cadastro', (req, res) => {
    Veterinarios.create({
        nome: req.body.nome,
        especialidade: req.body.especialidade,
        telefone: req.body.telefone,
        email: req.body.email,
        data_contratacao: req.body.data_contratacao
    }).then(() => {
        res.redirect('/veterinarios/listagem');
    }).catch((erro) => {
        if (erro.name === 'SequelizeUniqueConstraintError') {
            res.send("Erro: O email informado já está cadastrado!"); // Mensagem clara para o usuário
        } else {
            res.send("Erro: Veterinário não foi cadastrado com sucesso! " + erro);
        }
    });
});


router.get('/veterinarios/listagem', (req, res) => {
    Veterinarios.findAll().then((veterinarios) => {
        res.render('listagem_veterinarios', { veterinarios: veterinarios });
    });
});

// Home e outras rotas
router.get('/', (req, res) => {
    res.render('home');
});

router.get('/about', (req, res) => {
    res.render('about'); // Renderiza o arquivo 'sobre.handlebars'
});


// Usar o router configurado
app.use('/', router);

// Iniciar o servidor
app.listen(8080, function() {
    console.log("Servidor rodando na porta 8080");
});
