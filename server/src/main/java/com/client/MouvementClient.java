package com.client;

import com.model.rest.Mouvement;

import feign.Headers;
import feign.RequestLine;

@Headers("Content-type: application/json;charset=UTF-8")
public interface MouvementClient {

    @RequestLine("POST /update")
    Boolean udpateMouvement(Mouvement mouvement);

    @RequestLine("POST /find")
    Mouvement findMouvementById(String mouvementId);

    @RequestLine("POST /remove")
    Boolean removeMouvement(Mouvement mouvement);

    @RequestLine("POST /add")
    Boolean addMouvement(Mouvement mouvement);
}
