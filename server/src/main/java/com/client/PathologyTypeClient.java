package com.client;

import com.model.rest.PathologyType;

import feign.Headers;
import feign.RequestLine;

@Headers("Content-type: application/json;charset=UTF-8")
public interface PathologyTypeClient {

    @RequestLine("POST /update")
    Boolean udpatePathologyType(PathologyType pathologyType);

    @RequestLine("POST /find")
    PathologyType findPathologyTypeById(String pathologyTypeId);

    @RequestLine("POST /remove")
    Boolean removePathologyType(PathologyType pathologyType);

    @RequestLine("POST /add")
    Boolean addPathologyType(PathologyType pathologyType);
}
