package com.rest;

import com.model.rest.NoteTemplate;
import com.repository.NoteTemplateRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static java.util.Arrays.asList;

@RestController
@RequestMapping("/")
public class NoteTemplateController {

    private final static Logger LOGGER = LoggerFactory.getLogger(NoteTemplateController.class);
    private final NoteTemplateRepository noteTemplateRepository;

    public NoteTemplateController(NoteTemplateRepository noteTemplateRepository) {
        this.noteTemplateRepository = noteTemplateRepository;
    }

    @PostMapping("noteTemplate")
    @ResponseStatus(HttpStatus.CREATED)
    public NoteTemplate postNoteTemplate(@RequestBody NoteTemplate noteTemplate) {
        return noteTemplateRepository.save(noteTemplate);
    }

    @PostMapping("noteTemplates")
    @ResponseStatus(HttpStatus.CREATED)
    public List<NoteTemplate> postNoteTemplates(@RequestBody List<NoteTemplate> noteTemplates) {
        return noteTemplateRepository.saveAll(noteTemplates);
    }

    @GetMapping("noteTemplates")
    public List<NoteTemplate> getNoteTemplates() {
        return noteTemplateRepository.findAll();
    }

    @GetMapping("noteTemplate/{id}")
    public ResponseEntity<NoteTemplate> getNoteTemplate(@PathVariable String id) {
        NoteTemplate noteTemplate = noteTemplateRepository.findOne(id);
        if (noteTemplate == null)
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        return ResponseEntity.ok(noteTemplate);
    }

    @GetMapping("noteTemplates/{ids}")
    public List<NoteTemplate> getNoteTemplates(@PathVariable String ids) {
        List<String> listIds = asList(ids.split(","));
        return noteTemplateRepository.findAll(listIds);
    }

    @GetMapping("noteTemplates/count")
    public Long getCount() {
        return noteTemplateRepository.count();
    }

    @DeleteMapping("noteTemplate/{id}")
    public Long deleteNoteTemplate(@PathVariable String id) {
        return noteTemplateRepository.delete(id);
    }

    @DeleteMapping("noteTemplates/{ids}")
    public Long deleteNoteTemplates(@PathVariable String ids) {
        List<String> listIds = asList(ids.split(","));
        return noteTemplateRepository.delete(listIds);
    }

    @DeleteMapping("noteTemplates")
    public Long deleteNoteTemplates() {
        return noteTemplateRepository.deleteAll();
    }

    @PutMapping("noteTemplate")
    public NoteTemplate putNoteTemplate(@RequestBody NoteTemplate noteTemplate) {
        return noteTemplateRepository.update(noteTemplate);
    }

    @PutMapping("noteTemplates")
    public Long putNoteTemplate(@RequestBody List<NoteTemplate> noteTemplates) {
        return noteTemplateRepository.update(noteTemplates);
    }

    @ExceptionHandler(RuntimeException.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    public final Exception handleAllExceptions(RuntimeException e) {
        LOGGER.error("Internal server error.", e);
        return e;
    }
}
