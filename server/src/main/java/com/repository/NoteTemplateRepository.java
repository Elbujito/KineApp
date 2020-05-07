package com.repository;

import com.model.NoteTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NoteTemplateRepository {

    NoteTemplate save(NoteTemplate noteTemplate);

    List<NoteTemplate> saveAll(List<NoteTemplate> noteTemplate);

    List<NoteTemplate> findAll();

    List<NoteTemplate> findAll(List<String> ids);

    NoteTemplate findOne(String id);

    long count();

    long delete(String id);

    long delete(List<String> ids);

    long deleteAll();

    NoteTemplate update(NoteTemplate noteTemplate);

    long update(List<NoteTemplate> noteTemplate);
}
