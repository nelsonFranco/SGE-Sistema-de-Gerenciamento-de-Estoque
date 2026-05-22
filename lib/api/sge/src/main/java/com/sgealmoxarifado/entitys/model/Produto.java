package com.sgealmoxarifado.entitys.model;
import java.time.LocalDateTime;

import org.hibernate.annotations.CreationTimestamp;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Table;

@Entity(name = "Produto")
@Table(name = "Produto")
public class Produto {

    @jakarta.persistence.Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private int id;
    
    private String nome;
    private double valorUnit;
    private int quantidade;
    private String fornecedor;
    private String codigoBarras;

    @CreationTimestamp
    private LocalDateTime dataCadastro;
    
    public int getId() {
        return id;
    }
    public void setId(int id) {
        this.id = id;
    }
    public String getNome() {
        return nome;
    }
    public void setNome(String nome) {
        this.nome = nome;
    }
    public double getValorUnit() {
        return valorUnit;
    }
    public void setValorUnit(double valorUnit) {
        this.valorUnit = valorUnit;
    }
    public int getQuantidade() {
        return quantidade;
    }
    public void setQuantidade(int quantidade) {
        this.quantidade = quantidade;
    }
    public String getFornecedor() {
        return fornecedor;
    }
    public void setFornecedor(String fornecedor) {
        this.fornecedor = fornecedor;
    }
    public String getCodigoBarras() {
        return codigoBarras;
    }
    public void setCodigoBarras(String codigoBarras) {
        this.codigoBarras = codigoBarras;
    }
    public LocalDateTime getDataCadastro() {
        return dataCadastro;
    }
    public void setDataCadastro(LocalDateTime dataCadastro) {
        this.dataCadastro = dataCadastro;
    }


}
