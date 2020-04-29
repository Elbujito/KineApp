package com.repository;

import com.model.rest.Muscle;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MuscleRepository {

    Muscle save(Muscle muscle);

    List<Muscle> saveAll(List<Muscle> muscle);

    List<Muscle> findAll();

    List<Muscle> findAll(List<String> ids);

    Muscle findOne(String id);

    long count();

    long delete(String id);

    long delete(List<String> ids);

    long deleteAll();

    Muscle update(Muscle muscle);

    long update(List<Muscle> muscle);
}
