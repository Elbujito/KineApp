package com.repository;

import com.model.Pathology;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PathologyRepository {

    Pathology save(Pathology pathology);

    List<Pathology> saveAll(List<Pathology> pathology);

    List<Pathology> findAll();

    List<Pathology> findAll(List<String> ids);

    Pathology findOne(String id);

    long count();

    long delete(String id);

    long delete(List<String> ids);

    long deleteAll();

    Pathology update(Pathology pathology);

    long update(List<Pathology> pathology);
}
