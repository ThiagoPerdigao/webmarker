package com.projetowebmarker.webmarkerapi.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.projetowebmarker.webmarkerapi.model.Usuario;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
    Optional<Usuario> findByUsuarioAndSenha(String usuario, String senha);

    Optional<Usuario> findByUsuario(String usuario); // Novo método para verificar se o usuário já existe
}
