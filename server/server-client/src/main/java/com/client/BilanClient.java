package com.client;

import java.util.List;
import com.model.rest.Bilan;
import feign.Headers;
import feign.RequestLine;

@Headers("Content-type: application/json;charset=UTF-8")
public interface BilanClient {

    @RequestLine("GET /all")
    List<Bilan> getBilans();
}
