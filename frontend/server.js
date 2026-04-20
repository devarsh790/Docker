CREATE DATABASE IF NOT EXISTS testdb;
USE testdb;

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(50)
);

INSERT INTO users (name) VALUES
('Devarsh'),
('Docker User'),
('3-Tier App');
