package com.repository;

import com.model.rest.Patient;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PatientRepository {

    Patient save(Patient patient);

    List<Patient> saveAll(List<Patient> patient);

    List<Patient> findAll();

    List<Patient> findAll(List<String> ids);

    Patient findOne(String id);

    long count();

    long delete(String id);

    long delete(List<String> ids);

    long deleteAll();

    Patient update(Patient patient);

    long update(List<Patient> patient);

    double getAverageAge();

}
