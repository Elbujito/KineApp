package com.client;

import com.model.rest.NoteTemplate;

import feign.Headers;
import feign.RequestLine;

import java.util.List;

@Headers("Content-type: application/json;charset=UTF-8")
public interface NoteTemplateClient {

    @RequestLine("GET /all")
    List<NoteTemplate> getNoteTemplates();
}
