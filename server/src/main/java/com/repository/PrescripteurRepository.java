package com.repository;

import com.model.Prescripteur;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PrescripteurRepository {

    Prescripteur save(Prescripteur prescripteur);

    List<Prescripteur> saveAll(List<Prescripteur> prescripteur);

    List<Prescripteur> findAll();

    List<Prescripteur> findAll(List<String> ids);

    Prescripteur findOne(String id);

    long count();

    long delete(String id);

    long delete(List<String> ids);

    long deleteAll();

    Prescripteur update(Prescripteur prescripteur);

    long update(List<Prescripteur> prescripteur);
}
