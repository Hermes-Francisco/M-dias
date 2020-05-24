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
ALTER TABLE arquivo ADD CONSTRAINT FOREIGN KEY (tipo) REFERENCES tipo(id);

INSERT INTO tipo (id,nome) VALUES 
('1','mp3'),
('2','mp4'),
('3','pdf');
--('4','html');--