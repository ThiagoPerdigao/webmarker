package com.projetowebmarker.webmarkerapi.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.projetowebmarker.webmarkerapi.dto.UsuarioCreateDTO;
import com.projetowebmarker.webmarkerapi.model.Usuario;
import com.projetowebmarker.webmarkerapi.repository.UsuarioRepository;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    public Usuario save(UsuarioCreateDTO usuarioDto) {
        Usuario usuario = new Usuario();
        usuario.setUsuario(usuarioDto.getUsuario());
        usuario.setSenha(usuarioDto.getSenha());
        return usuarioRepository.save(usuario);
    }

    public Optional<Usuario> findByUsuarioAndSenha(String usuario, String senha) {
        return usuarioRepository.findByUsuarioAndSenha(usuario, senha);
    }
}
