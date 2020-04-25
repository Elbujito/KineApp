package com.client;

import java.util.List;
import com.model.rest.Connector;
import com.model.rest.Patient;
import com.model.rest.Bilan;
import feign.Headers;
import feign.Param;
import feign.RequestLine;

@Headers("Content-type: application/json;charset=UTF-8")
public interface PatientClient {

    @RequestLine("GET /patients")
    List<Patient> getPatients();
}
