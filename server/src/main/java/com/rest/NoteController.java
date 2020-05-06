package com.rest;

import com.model.rest.Note;
import com.repository.NoteRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static java.util.Arrays.asList;

@RestController
@RequestMapping("/")
public class NoteController {

    private final static Logger LOGGER = LoggerFactory.getLogger(NoteController.class);
    private final NoteRepository noteRepository;

    public NoteController(NoteRepository noteRepository) {
        this.noteRepository = noteRepository;
    }

    @PostMapping("note")
    @ResponseStatus(HttpStatus.CREATED)
    public Note postNote(@RequestBody Note note) {
        return noteRepository.save(note);
    }

    @PostMapping("notes")
    @ResponseStatus(HttpStatus.CREATED)
    public List<Note> postNotes(@RequestBody List<Note> notes) {
        return noteRepository.saveAll(notes);
    }

    @GetMapping("notes")
    public List<Note> getNotes() {
        return noteRepository.findAll();
    }

    @GetMapping("note/{id}")
    public ResponseEntity<Note> getNote(@PathVariable String id) {
        Note note = noteRepository.findOne(id);
        if (note == null)
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        return ResponseEntity.ok(note);
    }

    @GetMapping("notes/{ids}")
    public List<Note> getNotes(@PathVariable String ids) {
        List<String> listIds = asList(ids.split(","));
        return noteRepository.findAll(listIds);
    }

    @GetMapping("notes/count")
    public Long getCount() {
        return noteRepository.count();
    }

    @DeleteMapping("note/{id}")
    public Long deleteNote(@PathVariable String id) {
        return noteRepository.delete(id);
    }

    @DeleteMapping("notes/{ids}")
    public Long deleteNotes(@PathVariable String ids) {
        List<String> listIds = asList(ids.split(","));
        return noteRepository.delete(listIds);
    }

    @DeleteMapping("notes")
    public Long deleteNotes() {
        return noteRepository.deleteAll();
    }

    @PutMapping("note")
    public Note putNote(@RequestBody Note note) {
        return noteRepository.update(note);
    }

    @PutMapping("notes")
    public Long putNote(@RequestBody List<Note> notes) {
        return noteRepository.update(notes);
    }

    @ExceptionHandler(RuntimeException.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    public final Exception handleAllExceptions(RuntimeException e) {
        LOGGER.error("Internal server error.", e);
        return e;
    }
}
