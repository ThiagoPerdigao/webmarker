package com.projetowebmarker.webmarkerapi.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.projetowebmarker.webmarkerapi.dto.UsuarioCreateDTO;
import com.projetowebmarker.webmarkerapi.dto.UsuarioLoginResponseDTO;
import com.projetowebmarker.webmarkerapi.exception.UsuarioExistenteException;
import com.projetowebmarker.webmarkerapi.model.Usuario;
import com.projetowebmarker.webmarkerapi.service.UsuarioService;

import lombok.RequiredArgsConstructor;


@RestController
@RequestMapping("/usuario")
@RequiredArgsConstructor
public class UsuarioController {
    @Autowired
    private UsuarioService usuarioService;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody UsuarioCreateDTO usuarioDto) {
        try {
            usuarioService.save(usuarioDto);
            return ResponseEntity.ok().build();
        } catch (UsuarioExistenteException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Usuário já existe");
        }
    }

    @PostMapping("/login")
    public ResponseEntity<UsuarioLoginResponseDTO> login(@RequestBody UsuarioCreateDTO usuarioDto) {
        Optional<Usuario> optionalUsuario = usuarioService.findByUsuarioAndSenha(usuarioDto.getUsuario(), usuarioDto.getSenha());

        if (optionalUsuario.isPresent()) {
            UsuarioLoginResponseDTO response = new UsuarioLoginResponseDTO(true, optionalUsuario.get().getTipo());
            return ResponseEntity.ok(response); 
        }

        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }
}
