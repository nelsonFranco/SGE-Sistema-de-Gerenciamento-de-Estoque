package com.sgealmoxarifado.dtos;

public record ProdutoDto( 
     String nome,
     double valorUnit,
     int quantidade,
     String fornecedor,
     String codigoBarras) {

}
