package com.client;

import java.util.List;
import com.model.rest.Patient;

import feign.Headers;
import feign.RequestLine;

@Headers("Content-type: application/json;charset=UTF-8")
public interface PatientClient {

    @RequestLine("GET /all")
    List<Patient> getPatients();

    @RequestLine("POST /update")
    Boolean updatePatient(Patient patient);

    @RequestLine("POST /find")
    Patient findPatientById(String patientId);

    @RequestLine("POST /remove")
    Boolean removePatient(Patient patient);

    @RequestLine("POST /add")
    Boolean addPatient(Patient patient);
}
