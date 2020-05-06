package com.repository;

import com.model.Localisation;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LocalisationRepository {

    Localisation save(Localisation localisation);

    List<Localisation> saveAll(List<Localisation> localisation);

    List<Localisation> findAll();

    List<Localisation> findAll(List<String> ids);

    Localisation findOne(String id);

    long count();

    long delete(String id);

    long delete(List<String> ids);

    long deleteAll();

    Localisation update(Localisation localisation);

    long update(List<Localisation> localisation);
}
