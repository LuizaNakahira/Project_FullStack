const express = require('express');
const Country = require('../models/Country');
const jwt = require('jsonwebtoken');
const router = express.Router();
const authenticate = require('../middleware/authenticate'); // Importando o middleware

// Rota para buscar todos os países
router.get('/api/countries', authenticate, async (req, res) => {
  try {
    const countries = await Country.find(); // Buscar todos os países no banco de dados
    res.status(200).json(countries);
  } catch (error) {
    res.status(500).json({ message: "Erro ao obter países", error });
  }
});

// Middleware para verificar o token
const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(403).send('Acesso negado');
  jwt.verify(token, 'secret', (err, decoded) => {
    if (err) return res.status(403).send('Token inválido');
    req.userId = decoded.userId;
    next();
  });
};

// Rota para buscar países
router.get('/', async (req, res) => {
  const countries = await Country.find();
  res.json(countries);
});

// Rota para inserir países
router.post('/', authMiddleware, async (req, res) => {
  const { name, region, languages } = req.body;
  const country = new Country({ name, region, languages });
  await country.save();
  res.status(201).send('País inserido com sucesso');
});

module.exports = router;
