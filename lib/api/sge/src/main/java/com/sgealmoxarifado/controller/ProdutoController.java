package com.sgealmoxarifado.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sgealmoxarifado.dtos.ProdutoDto;
import com.sgealmoxarifado.entitys.model.Produto;
import com.sgealmoxarifado.entitys.repository.ProdutoRepository;

@RestController
@RequestMapping("/produtos")
public class ProdutoController {
    
    @Autowired
    ProdutoRepository repository;

    @GetMapping
    public ResponseEntity<?> getAll() {
            List<Produto> listProdutos = repository.findAll();
        if(listProdutos.isEmpty()) {
            String messageList = "Nenhuma lista encontrada no estoque";
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(messageList);
        }
        return ResponseEntity.status(HttpStatus.OK).body(listProdutos);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getById(@PathVariable(value = "id") int id) {
        Optional<Produto> produto = repository.findById(id);
        if(produto.isEmpty()) {
            String messageNull = "Produto não encontrado";
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(messageNull);
        }
        return ResponseEntity.status(HttpStatus.FOUND).body(produto.get());
    }

    //Adicionar função de se existir não criar
    @PostMapping
    public ResponseEntity<Produto> save(@RequestBody ProdutoDto dto) {
        var produto = new Produto();
        BeanUtils.copyProperties(dto, produto);
        
        return ResponseEntity.status(HttpStatus.CREATED).body(repository.save(produto));
    }

    //adicionar função de mostrar as mudanças
    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable(value = "id") int id) {
        Optional<Produto> produto = repository.findById(id);

        if(produto.isEmpty()) {
            String messageNull = "Produto não encontrado";
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(messageNull);
        }
        String messageDelete = "Produto Deletado";
        repository.delete(produto.get());
        return ResponseEntity.status(HttpStatus.FOUND).body(messageDelete);
    }


    //adicionar função de mostrar as mudanças
    @PutMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable(value = "id") int id, @RequestBody ProdutoDto dto) {
        Optional<Produto> produto = repository.findById(id);

        if(produto.isEmpty()) {
            String messageNull = "Produto não encontrado";
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(messageNull);
        }

        var produtoModel = produto.get();
        BeanUtils.copyProperties(dto, produtoModel);
        return ResponseEntity.status(HttpStatus.OK).body(repository.save(produtoModel));
    }

}


