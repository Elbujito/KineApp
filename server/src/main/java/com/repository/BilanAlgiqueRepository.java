package com.repository;

import com.model.rest.BilanAlgique;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BilanAlgiqueRepository {

    BilanAlgique save(BilanAlgique bilanAlgique);

    List<BilanAlgique> saveAll(List<BilanAlgique> bilanAlgique);

    List<BilanAlgique> findAll();

    List<BilanAlgique> findAll(List<String> ids);

    BilanAlgique findOne(String id);

    long count();

    long delete(String id);

    long delete(List<String> ids);

    long deleteAll();

    BilanAlgique update(BilanAlgique bilanAlgique);

    long update(List<BilanAlgique> bilanAlgique);
}
