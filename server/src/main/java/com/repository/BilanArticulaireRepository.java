package com.repository;

import com.model.BilanArticulaire;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BilanArticulaireRepository {

    BilanArticulaire save(BilanArticulaire bilanArticulaire);

    List<BilanArticulaire> saveAll(List<BilanArticulaire> bilanArticulaire);

    List<BilanArticulaire> findAll();

    List<BilanArticulaire> findAll(List<String> ids);

    BilanArticulaire findOne(String id);

    long count();

    long delete(String id);

    long delete(List<String> ids);

    long deleteAll();

    BilanArticulaire update(BilanArticulaire bilanArticulaire);

    long update(List<BilanArticulaire> bilanArticulaire);
}
