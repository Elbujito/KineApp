package com.client;

import com.model.rest.Prescripteur;

import feign.Headers;
import feign.RequestLine;

@Headers("Content-type: application/json;charset=UTF-8")
public interface PrescripteurClient {

    @RequestLine("POST /update")
    Boolean udpatePrescripteur(Prescripteur prescripteur);

    @RequestLine("POST /find")
    Prescripteur findPrescripteurById(String prescripteurId);

    @RequestLine("POST /remove")
    Boolean removePrescripteur(Prescripteur prescripteur);

    @RequestLine("POST /add")
    Boolean addPrescripteur(Prescripteur prescripteur);
}
