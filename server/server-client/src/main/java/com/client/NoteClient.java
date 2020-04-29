package com.client;

import java.util.List;
import com.model.rest.Note;

import feign.Headers;
import feign.RequestLine;

@Headers("Content-type: application/json;charset=UTF-8")
public interface NoteClient {

    @RequestLine("POST /update")
    Boolean updateNote(Note note);

    @RequestLine("POST /findAll")
    List<Note> findNotesByPatientId(String patientId);

    @RequestLine("POST /find")
    Note findNoteById(String noteId);

    @RequestLine("POST /remove")
    Boolean removeNote(Note note);

    @RequestLine("POST /add")
    Boolean addNote(Note note);
}
