CREATE DATABASE midias;
USE midias;
CREATE TABLE if NOT EXISTS tipo(
	id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
	nome VARCHAR(10) NOT NULL UNIQUE
);
CREATE TABLE if NOT EXISTS arquivo(
	id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
	nome VARCHAR(300) NOT NULL,
	local VARCHAR(500) NOT NULL UNIQUE,
	tipo INT
);
CREATE TABLE if NOT EXISTS fisica(
	id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
	nome VARCHAR(300) NOT NULL,
	local VARCHAR(1000) NOT NULL,
	tipo INT
);
CREATE TABLE if NOT EXISTS tipo_fisica(
	id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
	nome VARCHAR(10) NOT NULL UNIQUE
);

ALTER TABLE arquivo ADD CONSTRAINT FOREIGN KEY (tipo) REFERENCES tipo(id);
ALTER TABLE fisica ADD CONSTRAINT FOREIGN KEY (tipo) REFERENCES tipo_fisica(id);

INSERT INTO tipo (id,nome) VALUES 
('1','mp3'),
('2','mp4'),
('3','pdf');
--('4','html');--
INSERT INTO tipo_fisica (id,nome) VALUES 
('1','vinil'),
('2','cd'),
('3','vhs'),
('4','dvd'),
('5','bluray'),
('6','livro');