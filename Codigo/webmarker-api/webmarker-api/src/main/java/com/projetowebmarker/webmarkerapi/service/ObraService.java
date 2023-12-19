package com.projetowebmarker.webmarkerapi.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import com.projetowebmarker.webmarkerapi.dto.ObraCreateDTO;
import com.projetowebmarker.webmarkerapi.dto.ObraUpdateDTO;
import com.projetowebmarker.webmarkerapi.model.Obra;
import com.projetowebmarker.webmarkerapi.repository.ObraRepository;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ObraService {

    private final ObraRepository obraRepository;

    public List<Obra> findAll() {
        return obraRepository.findAll();
    }

    public Obra findById(Long id) throws Exception {
        Obra obra = obraRepository.findById(id).orElse(null);
        if (obra != null) {
            return obra;
        }
        throw new Exception("Obra não encontrada");
    }

    public Obra create(ObraCreateDTO obraCreateDTO) {
    Obra novaObra = new Obra();
    novaObra.setTitulo(obraCreateDTO.getTitulo());
    novaObra.setTipo(obraCreateDTO.getTipo());
    novaObra.setLink(obraCreateDTO.getLink());
    novaObra.setNota(obraCreateDTO.getNota());
    novaObra.setQtdCapitulos(obraCreateDTO.getQtdCapitulos());
    novaObra.setStatus(obraCreateDTO.getStatus());
    novaObra.setLidos(obraCreateDTO.getLidos());
    novaObra.setNomeUsuario(obraCreateDTO.getNomeUsuario());

    return obraRepository.save(novaObra);
}


    public Obra update(Long id, ObraUpdateDTO obraUpdateDTO) throws Exception {
    Obra obraExistente = obraRepository.findById(id).orElse(null);
    if (obraExistente != null) {
        // Atualize os atributos conforme necessário usando o DTO
        obraExistente.setTitulo(obraUpdateDTO.getTitulo());
        obraExistente.setTipo(obraUpdateDTO.getTipo());
        obraExistente.setLink(obraUpdateDTO.getLink());
        obraExistente.setNota(obraUpdateDTO.getNota());
        obraExistente.setQtdCapitulos(obraUpdateDTO.getQtdCapitulos());
        obraExistente.setStatus(obraUpdateDTO.getStatus());
        obraExistente.setLidos(obraUpdateDTO.getLidos());

        return obraRepository.save(obraExistente);
    }
    throw new Exception("Obra não encontrada");
}


    public void delete(Long id) throws Exception {
        obraRepository.deleteById(id);
    }
}
