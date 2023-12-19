package com.projetowebmarker.webmarkerapi.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.projetowebmarker.webmarkerapi.dto.UsuarioCreateDTO;
import com.projetowebmarker.webmarkerapi.exception.UsuarioExistenteException;
import com.projetowebmarker.webmarkerapi.model.Usuario;
import com.projetowebmarker.webmarkerapi.repository.UsuarioRepository;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    public Usuario save(UsuarioCreateDTO usuarioDto) {
        // Verifique se já existe um usuário com o mesmo nome
        if (usuarioRepository.findByUsuario(usuarioDto.getUsuario()).isPresent()) {
            throw new UsuarioExistenteException("Usuário já cadastrado");
        }

        // Se não existir, crie o novo usuário
        Usuario usuario = new Usuario();
        usuario.setUsuario(usuarioDto.getUsuario());
        usuario.setSenha(usuarioDto.getSenha());
        usuario.setTipo(usuarioDto.getTipo());
        return usuarioRepository.save(usuario);
    }

    public Optional<Usuario> findByUsuarioAndSenha(String usuario, String senha) {
        return usuarioRepository.findByUsuarioAndSenha(usuario, senha);
    }
}
