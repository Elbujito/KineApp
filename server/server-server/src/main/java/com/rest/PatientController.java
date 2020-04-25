package com.rest;

import java.util.stream.Collectors;
import java.util.List;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.slf4j.Marker;
import org.slf4j.MarkerFactory;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.client.PatientClient;
import com.model.rest.Patient;
import com.repository.PatientRepository;

@RestController
@RequestMapping("/patient")
@SuppressWarnings("PMD.ExcessiveImports")
public final class PatientController implements PatientClient {

    private static final Marker PUBLIC = MarkerFactory.getMarker("PUBLIC");

    private static final Logger LOG = LoggerFactory.getLogger(PatientController.class);

    private static PatientRepository.DbPatientRepository repo = new PatientRepository.DbPatientRepository();

    @SuppressWarnings("checkstyle:parameternumber")
    public PatientController() {
    }

    @Override
    @GetMapping("/all")
    public List<Patient> getPatients() {
        try {
            return this.repo.getPatients().stream().collect(Collectors.toList());
        }
        catch (Exception e) {
            throw e;
        }
    }
}
