CREATE TABLE Produto (
    id INT NOT NULL AUTO_INCREMENT,
    nome VARCHAR(255) NOT NULL,
    valorUnit DECIMAL(10,2) NOT NULL,
    quantidade INT NOT NULL,
    fornecedor VARCHAR(255),
    codigoBarras VARCHAR(100),
    dataCadastro DATETIME,
    
    PRIMARY KEY (id)
);