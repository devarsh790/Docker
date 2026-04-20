CREATE DATABASE IF NOT EXISTS testdb;
USE testdb;

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(50),
  password VARCHAR(255)
);

INSERT INTO users (name, password) VALUES
('Devarsh', 'test'),
('Admin', 'test');
