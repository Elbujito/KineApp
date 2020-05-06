package com.client;

import com.model.rest.Localisation;

import feign.Headers;
import feign.RequestLine;

@Headers("Content-type: application/json;charset=UTF-8")
public interface LocalisationClient {

    @RequestLine("POST /update")
    Boolean udpateLocalisation(Localisation localisation);

    @RequestLine("POST /find")
    Localisation findLocalisationById(String localisationId);

    @RequestLine("POST /remove")
    Boolean removeLocalisation(Localisation localisation);

    @RequestLine("POST /add")
    Boolean addLocalisation(Localisation localisation);
}
