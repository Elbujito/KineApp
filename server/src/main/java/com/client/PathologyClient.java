package com.client;

import com.model.rest.Pathology;

import feign.Headers;
import feign.RequestLine;

@Headers("Content-type: application/json;charset=UTF-8")
public interface PathologyClient {

    @RequestLine("POST /update")
    Boolean udpatePathology(Pathology pathology);

    @RequestLine("POST /find")
    Pathology findPathologyById(String pathologyId);

    @RequestLine("POST /remove")
    Boolean removePathology(Pathology pathology);

    @RequestLine("POST /add")
    Boolean addPathology(Pathology pathology);
}
