const express = require('express');
const app = express();

app.use(express.json());

// Lista para armazenar os usuários
const usuarios = [];

// Rota GET /usuarios — retorna todos os usuários criados
app.get('/usuarios', (req, res) => {
  console.log('Rota: /usuarios');
  res.json(usuarios);
});

// Rota GET /usuario/:id — retorna um usuário específico
app.get('/usuario/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const usuario = usuarios.find(u => u.id === id);

  if (!usuario) {
    return res.status(404).send('Usuário não encontrado');
  }

  console.log(`Rota: /usuario/${id}`);
  res.json(usuario);
});

// Rota POST /usuario/criar — cria um novo usuário
app.post('/usuario/criar', (req, res) => {
  const username = req.body.username;

  if (!username) {
    console.log('Erro: username não enviado');
    return res.status(400).send('Campo "username" é obrigatório');
  }

  const novoUsuario = {
    id: usuarios.length + 1,
    username
  };

  usuarios.push(novoUsuario);

  console.log('Usuário criado:', novoUsuario);
  res.status(201).json(novoUsuario);
});

// Inicia o servidor
app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});
