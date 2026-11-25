const express = require('express');
const mysql = require('mysql2');

const app = express();
const port = 3000;


// Configuração da conexão com o MySQL
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'password',
  database: process.env.DB_NAME || 'mydb',

  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0

});


pool.getConnection((err, connection) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err);
    return;
  }
  console.log('Conexão bem-sucedida ao banco de dados MySQL!');
  connection.release();
});


// Rota de teste
app.get('/tarefas', (req, res) => {
    pool.query('SELECT * FROM tarefas', (err, results) => {
        if (err) {
            console.error('Erro ao buscar tarefas:', err);
            res.status(500).send('Erro ao buscar tarefas');
            return;
        }
        res.json(results);
    });
});

app.get('/', (req, res) => {
  res.send('API funcionando!');
}); 


// Inicia o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});


