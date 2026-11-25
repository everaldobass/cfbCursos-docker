use listatarefas;

CREATE TABLE IF NOT EXISTS tarefas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    descricao TEXT,
    status ENUM('pendente', 'em andamento', 'concluida') DEFAULT 'pendente',
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


INSERT INTO tarefas (titulo, descricao, status) VALUES
('Comprar leite', 'Ir ao supermercado e comprar leite', 'pendente'),
('Estudar SQL', 'Revisar conceitos de SQL e praticar consultas', 'em andamento'),
('Enviar relatório', 'Enviar o relatório semanal para o gerente', 'concluida');