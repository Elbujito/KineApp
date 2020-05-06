package com.repository;

import com.model.rest.Mouvement;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MouvementRepository {

    Mouvement save(Mouvement mouvement);

    List<Mouvement> saveAll(List<Mouvement> mouvement);

    List<Mouvement> findAll();

    List<Mouvement> findAll(List<String> ids);

    Mouvement findOne(String id);

    long count();

    long delete(String id);

    long delete(List<String> ids);

    long deleteAll();

    Mouvement update(Mouvement mouvement);

    long update(List<Mouvement> mouvement);
}
