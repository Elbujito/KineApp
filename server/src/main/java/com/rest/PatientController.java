package com.rest;

import com.model.rest.Patient;
import com.repository.PatientRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static java.util.Arrays.asList;

@RestController
@RequestMapping("/")
public class PatientController {

    private final static Logger LOGGER = LoggerFactory.getLogger(PatientController.class);
    private final PatientRepository patientRepository;

    public PatientController(PatientRepository patientRepository) {
        this.patientRepository = patientRepository;
    }

    @PostMapping("patient")
    @ResponseStatus(HttpStatus.CREATED)
    public Patient postPatient(@RequestBody Patient patient) {
        return patientRepository.save(patient);
    }

    @PostMapping("patients")
    @ResponseStatus(HttpStatus.CREATED)
    public List<Patient> postPatients(@RequestBody List<Patient> patients) {
        return patientRepository.saveAll(patients);
    }

    @GetMapping("patients")
    public List<Patient> getPatients() {
        return patientRepository.findAll();
    }

    @GetMapping("patient/{id}")
    public ResponseEntity<Patient> getPatient(@PathVariable String id) {
        Patient patient = patientRepository.findOne(id);
        if (patient == null)
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        return ResponseEntity.ok(patient);
    }

    @GetMapping("patients/{ids}")
    public List<Patient> getPatients(@PathVariable String ids) {
        List<String> listIds = asList(ids.split(","));
        return patientRepository.findAll(listIds);
    }

    @GetMapping("patients/count")
    public Long getCount() {
        return patientRepository.count();
    }

    @DeleteMapping("patient/{id}")
    public Long deletePatient(@PathVariable String id) {
        return patientRepository.delete(id);
    }

    @DeleteMapping("patients/{ids}")
    public Long deletePatients(@PathVariable String ids) {
        List<String> listIds = asList(ids.split(","));
        return patientRepository.delete(listIds);
    }

    @DeleteMapping("patients")
    public Long deletePatients() {
        return patientRepository.deleteAll();
    }

    @PutMapping("patient")
    public Patient putPatient(@RequestBody Patient patient) {
        return patientRepository.update(patient);
    }

    @PutMapping("patients")
    public Long putPatient(@RequestBody List<Patient> patients) {
        return patientRepository.update(patients);
    }

    @ExceptionHandler(RuntimeException.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    public final Exception handleAllExceptions(RuntimeException e) {
        LOGGER.error("Internal server error.", e);
        return e;
    }
}
