package com.projetowebmarker.webmarkerapi.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UsuarioLoginResponseDTO {

    private boolean isLoginSuccessful;

    private String tipo;

    public UsuarioLoginResponseDTO(boolean isLoginSuccessful, String tipo){
        this.isLoginSuccessful = isLoginSuccessful;
        this.tipo = tipo;
    }
}
