package com.client;

import com.model.rest.Muscle;

import feign.Headers;
import feign.RequestLine;

@Headers("Content-type: application/json;charset=UTF-8")
public interface MuscleClient {

    @RequestLine("POST /update")
    Boolean udpateMuscle(Muscle muscle);

    @RequestLine("POST /find")
    Muscle findMuscleById(String muscleId);

    @RequestLine("POST /remove")
    Boolean removeMuscle(Muscle muscle);

    @RequestLine("POST /add")
    Boolean addMuscle(Muscle muscle);
}
