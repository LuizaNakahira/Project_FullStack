const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');
const app = express();
const sanitize = require('mongo-sanitize');
const redis = require('redis');
const client = redis.createClient();

const authenticate = require('./src/middleware/authenticate');
const User = require('./src/models/User');
const Country = require('./src/models/Country');

// Middleware para permitir requisições CORS e analisar corpo de requisições
app.use(bodyParser.json());
app.use(cors({
    origin: 'http://localhost:5001', 
    methods: 'GET,POST',
    credentials: true 
}));

// Conectar ao banco de dados MongoDB
mongoose.connect('mongodb://localhost:27017/mydatabase', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Conectado ao banco de dados');
}).catch((err) => {
  console.error('Erro ao conectar ao banco de dados', err);
});

app.get('/', (req, res) => {
  res.send('Servidor está funcionando!');
});

// Rota para registro de usuários
app.post('/api/register', async (req, res) => {
    const { username, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return res.status(400).json({ message: 'Usuário já existe' });
    }

    const newUser = new User({
        username,
        email,
        password, 
    });

    try {
        await newUser.save();
        res.status(201).json({ message: 'Usuário registrado com sucesso' });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao registrar usuário', error });
    }
});

// Rota para login de usuários
app.post('/api/auth/login', async (req, res) => {
    const { username, password } = req.body;
    console.log('Dados recebidos para login:', { username, password }); // Logando os dados

    const user = await User.findOne({ username });
    if (!user) {
        return res.status(400).json({ message: 'Usuário não encontrado' });
    }

    if (user.password === password) {
        const token = jwt.sign({ userId: user._id }, 'secrectKey', { expiresIn: '1h' });
        res.json({ message: 'Login bem-sucedido', token });
    } else {
        return res.status(400).json({ message: 'Senha incorreta' });
    }
    
});

// Rota para buscar todos os países 
app.get('/api/countries', authenticate, async (req, res) => {
    try {
        const countries = await Country.find(); 
        res.status(200).json(countries);
    } catch (error) {
        res.status(500).json({ message: "Erro ao obter países", error });
    }
});

// Rota para inserir um novo país 
app.post('/api/countries', [
    check('name').notEmpty().withMessage('O nome é obrigatório'),
    check('capital').notEmpty().withMessage('A capital é obrigatória'),
    check('region').notEmpty().withMessage('A região é obrigatória'),
    check('population').isNumeric().withMessage('A população deve ser um número')
], authenticate, async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const sanitizedData = sanitize(req.body);
    try {
        const newCountry = new Country(sanitizedData);
        await newCountry.save();
        res.status(201).json(newCountry);
    } catch (error) {
        res.status(500).json({ message: "Erro ao inserir país", error });
    }
});

// Rota para buscar um país específico 
app.get('/api/countries/:name', async (req, res) => {
    const { name } = req.params;

    client.get(name, async (err, cachedData) => {
        if (cachedData) {
            return res.json(JSON.parse(cachedData)); 
        }

        const country = await Country.findOne({ name });
        if (country) {
            client.setex(name, 3600, JSON.stringify(country));
            return res.json(country);
        }

        res.status(404).json({ message: 'País não encontrado' });
    });
});

// Rota para logout de usuários (invalidar o token)
let invalidTokens = [];
app.post('/api/logout', (req, res) => {
    const token = req.headers['authorization']?.split(' ')[1]; 

    if (!token) {
        return res.status(400).json({ message: 'Token inválido' });
    }

    invalidTokens.push(token); 

    res.json({ message: 'Logout realizado com sucesso' });
});

// Middleware para verificar se o token foi invalidado
app.use((req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];
    if (invalidTokens.includes(token)) {
        return res.status(401).json({ message: 'Token expirado' });
    }
    next();
});

// Iniciar o servidor na porta 5000
const port = 5000;
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
