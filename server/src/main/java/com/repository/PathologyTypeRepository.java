package com.repository;

import com.model.rest.PathologyType;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PathologyTypeRepository {

    PathologyType save(PathologyType pathologyType);

    List<PathologyType> saveAll(List<PathologyType> pathologyType);

    List<PathologyType> findAll();

    List<PathologyType> findAll(List<String> ids);

    PathologyType findOne(String id);

    long count();

    long delete(String id);

    long delete(List<String> ids);

    long deleteAll();

    PathologyType update(PathologyType pathologyType);

    long update(List<PathologyType> pathologyType);
}
