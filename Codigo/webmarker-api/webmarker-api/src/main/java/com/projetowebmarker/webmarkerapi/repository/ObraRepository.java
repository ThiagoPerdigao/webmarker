package com.projetowebmarker.webmarkerapi.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.projetowebmarker.webmarkerapi.model.Obra;

public interface ObraRepository extends JpaRepository<Obra, Long> {
}
