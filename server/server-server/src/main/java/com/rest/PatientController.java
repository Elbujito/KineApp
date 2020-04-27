package com.rest;

import java.util.stream.Collectors;
import java.util.List;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.slf4j.Marker;
import org.slf4j.MarkerFactory;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestBody;
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
            LOG.info(" getPatients ");
            this.repo.displayList();
            return this.repo.getPatients().stream().collect(Collectors.toList());
        }
        catch (Exception e) {
            throw e;
        }
    }

    @Override
    @PostMapping("/add")
    public Boolean addPatient(@RequestBody final Patient patient)
    {
        LOG.info(" addPatient " + patient);
        try {
            this.repo.displayList();
            Boolean result = this.repo.addPatient(patient);
            this.repo.displayList();
            return result;
        }
        catch (Exception e) {
            throw e;
        }
    }

    @Override
    @PostMapping("/update")
    public Boolean updatePatient(@RequestBody final Patient patient)
    {
        LOG.info(" updatePatient " + patient);
        try {
                this.repo.displayList();
                Patient currentPatient = this.repo.findPatientById(patient.getId());
                if(currentPatient != null) {
                    Boolean result = this.repo.updatePatient(patient);
                    this.repo.displayList();
                    return result;
                }
                return false;
        }
        catch (Exception e) {
            throw e;
        }
    }

    @Override
    @PostMapping("/find")
    public Patient findPatientById(@RequestBody final String patientId)
    {
        LOG.info(" findPatientById " + patientId);
        try {
            return this.repo.findPatientById(Long.parseLong(patientId));
        }
        catch (Exception e) {
            throw e;
        }
    }

    @Override
    @PostMapping("/delete")
    public Boolean removePatient(@RequestBody final Patient patient)
    {
        LOG.info(" removePatient " + patient);
        try {
            this.repo.displayList();
            Boolean result = this.repo.removePatient(patient);
            this.repo.displayList();
            return result;
        }
        catch (Exception e) {
            throw e;
        }
    }
}
