package com.projetowebmarker.webmarkerapi.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.projetowebmarker.webmarkerapi.model.Obra;
import com.projetowebmarker.webmarkerapi.service.ObraService;
import com.projetowebmarker.webmarkerapi.dto.ObraCreateDTO;
import com.projetowebmarker.webmarkerapi.dto.ObraUpdateDTO;

import java.util.List;
@RestController
@RequestMapping("/obras")
@RequiredArgsConstructor
public class ObraController {

    private final ObraService obraService;

    @GetMapping
    public ResponseEntity<List<Obra>> findAll() {
        List<Obra> obras = obraService.findAll();
        return ResponseEntity.ok(obras);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Obra> findById(@PathVariable Long id) {
        try {
            Obra obra = obraService.findById(id);
            return ResponseEntity.ok(obra);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @PostMapping
    public ResponseEntity<Obra> create(@RequestBody ObraCreateDTO obraCreateDTO) {
        Obra novaObra = obraService.create(obraCreateDTO);
        return ResponseEntity.ok(novaObra);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Obra> update(@PathVariable Long id, @RequestBody ObraUpdateDTO obraUpdateDTO) {
        try {
            Obra obraAtualizada = obraService.update(id, obraUpdateDTO);
            return ResponseEntity.ok(obraAtualizada);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        try {
            obraService.delete(id);
        } catch (Exception e) {
            System.out.println("Erro: " + e.getMessage());
        }
    }
}
