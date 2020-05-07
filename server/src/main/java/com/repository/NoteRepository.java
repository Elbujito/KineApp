package com.repository;

import com.model.Note;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NoteRepository {

    Note save(Note note);

    List<Note> saveAll(List<Note> note);

    List<Note> findAll();

    List<Note> findAll(List<String> ids);

    Note findOne(String id);

    long count();

    long delete(String id);

    long delete(List<String> ids);

    long deleteAll();

    Note update(Note note);

    long update(List<Note> note);
}
