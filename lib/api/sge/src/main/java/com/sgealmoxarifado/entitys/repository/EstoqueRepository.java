package com.sgealmoxarifado.entitys.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.sgealmoxarifado.entitys.model.Estoque;

@Repository
public interface EstoqueRepository extends JpaRepository<Estoque, Integer>{

}
