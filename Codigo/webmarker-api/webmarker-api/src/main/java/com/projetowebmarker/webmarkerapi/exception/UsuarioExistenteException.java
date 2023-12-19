package com.projetowebmarker.webmarkerapi.exception;

public class UsuarioExistenteException extends RuntimeException {

    public UsuarioExistenteException(String message) {
        super(message);
    }
}
