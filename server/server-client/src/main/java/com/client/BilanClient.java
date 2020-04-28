package com.client;

import java.util.List;
import com.model.rest.Bilan;
import feign.Headers;
import feign.RequestLine;

@Headers("Content-type: application/json;charset=UTF-8")
public interface BilanClient {

    @RequestLine("POST /update")
    Boolean updateBilan(Bilan bilan);

    @RequestLine("POST /findAll")
    List<Bilan> findBilansByPatientId(String patientId);

    @RequestLine("POST /find")
    Bilan findBilanById(String bilanId);

    @RequestLine("POST /remove")
    Boolean removeBilan(Bilan bilan);

    @RequestLine("POST /add")
    Boolean addBilan(Bilan bilan);
}
