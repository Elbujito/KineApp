package com.client;

import java.util.List;

import com.model.jwt.Token;
import com.model.login.LoginPassword;
import com.model.rest.Connector;
import com.model.rest.Patient;
import com.model.rest.Bilan;
import feign.Headers;
import feign.Param;
import feign.RequestLine;
import org.springframework.web.bind.annotation.RequestBody;

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
