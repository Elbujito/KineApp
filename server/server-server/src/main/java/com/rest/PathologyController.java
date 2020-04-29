package com.rest;

import com.model.rest.Pathology;
import com.repository.PathologyRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static java.util.Arrays.asList;

@RestController
@RequestMapping("/")
public class PathologyController {

    private final static Logger LOGGER = LoggerFactory.getLogger(PathologyController.class);
    private final PathologyRepository pathologyRepository;

    public PathologyController(PathologyRepository pathologyRepository) {
        this.pathologyRepository = pathologyRepository;
    }

    @PostMapping("pathology")
    @ResponseStatus(HttpStatus.CREATED)
    public Pathology postPathology(@RequestBody Pathology pathology) {
        return pathologyRepository.save(pathology);
    }

    @PostMapping("pathologys")
    @ResponseStatus(HttpStatus.CREATED)
    public List<Pathology> postPathologys(@RequestBody List<Pathology> pathologys) {
        return pathologyRepository.saveAll(pathologys);
    }

    @GetMapping("pathologys")
    public List<Pathology> getPathologys() {
        return pathologyRepository.findAll();
    }

    @GetMapping("pathology/{id}")
    public ResponseEntity<Pathology> getPathology(@PathVariable String id) {
        Pathology pathology = pathologyRepository.findOne(id);
        if (pathology == null)
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        return ResponseEntity.ok(pathology);
    }

    @GetMapping("pathologys/{ids}")
    public List<Pathology> getPathologys(@PathVariable String ids) {
        List<String> listIds = asList(ids.split(","));
        return pathologyRepository.findAll(listIds);
    }

    @GetMapping("pathologys/count")
    public Long getCount() {
        return pathologyRepository.count();
    }

    @DeleteMapping("pathology/{id}")
    public Long deletePathology(@PathVariable String id) {
        return pathologyRepository.delete(id);
    }

    @DeleteMapping("pathologys/{ids}")
    public Long deletePathologys(@PathVariable String ids) {
        List<String> listIds = asList(ids.split(","));
        return pathologyRepository.delete(listIds);
    }

    @DeleteMapping("pathologys")
    public Long deletePathologys() {
        return pathologyRepository.deleteAll();
    }

    @PutMapping("pathology")
    public Pathology putPathology(@RequestBody Pathology pathology) {
        return pathologyRepository.update(pathology);
    }

    @PutMapping("pathologys")
    public Long putPathology(@RequestBody List<Pathology> pathologys) {
        return pathologyRepository.update(pathologys);
    }

    @ExceptionHandler(RuntimeException.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    public final Exception handleAllExceptions(RuntimeException e) {
        LOGGER.error("Internal server error.", e);
        return e;
    }
}
