package com.repository;

import com.model.rest.BilanMusculaire;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BilanMusculaireRepository {

    BilanMusculaire save(BilanMusculaire bilanMusculaire);

    List<BilanMusculaire> saveAll(List<BilanMusculaire> bilanMusculaire);

    List<BilanMusculaire> findAll();

    List<BilanMusculaire> findAll(List<String> ids);

    BilanMusculaire findOne(String id);

    long count();

    long delete(String id);

    long delete(List<String> ids);

    long deleteAll();

    BilanMusculaire update(BilanMusculaire bilanMusculaire);

    long update(List<BilanMusculaire> bilanMusculaire);

}
