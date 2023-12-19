package com.projetowebmarker.webmarkerapi.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UsuarioCreateDTO {

    private String usuario;

    private String senha;

    private String tipo;
}
