package com.sgealmoxarifado.entitys.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.sgealmoxarifado.entitys.model.Produto;

@Repository
public interface ProdutoRepository extends JpaRepository<Produto, Integer> {

}

