package com.sgealmoxarifado.entitys.model;
import java.time.LocalDateTime;

import org.hibernate.annotations.CreationTimestamp;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity(name="Estoque")
@Table(name="Estoque")

public class Estoque {

    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private int estId;
    
    private String estNome;
    private int quantMax;
    private String local;
    private String responsavel;

    @CreationTimestamp
    private LocalDateTime ultiAtua;

    

    public int getEstId() {
        return estId;
    }
    public void setEstId(int estId) {
        this.estId = estId;
    }
    public String getEstNome() {
        return estNome;
    }
    public void setEstNome(String estNome) {
        this.estNome = estNome;
    }
    public int getQuantMax() {
        return quantMax;
    }
    public void setQuantMax(int quantMax) {
        this.quantMax = quantMax;
    }
    public String getLocal() {
        return local;
    }
    public void setLocal(String local) {
        this.local = local;
    }
    public LocalDateTime getUltiAtua() {
        return ultiAtua;
    }
    public void setUltiAtua(LocalDateTime ultiAtua) {
        this.ultiAtua = ultiAtua;
    }
    public String getResponsavel() {
        return responsavel;
    }
    public void setResponsavel(String responsavel) {
        this.responsavel = responsavel;
    }
}
