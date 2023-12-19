package com.projetowebmarker.webmarkerapi.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ObraCreateDTO {

    private String titulo;
    private String tipo;
    private String link;
    private int nota;
    private int qtdCapitulos;
    private String status;
    private int lidos;
}
