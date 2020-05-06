package com.rest;

import com.model.Pathology;
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

    @PostMapping("pathologies")
    @ResponseStatus(HttpStatus.CREATED)
    public List<Pathology> postPathologies(@RequestBody List<Pathology> pathologies) {
        return pathologyRepository.saveAll(pathologies);
    }

    @GetMapping("pathologies")
    public List<Pathology> getPathologies() {
        return pathologyRepository.findAll();
    }

    @GetMapping("pathology/{id}")
    public ResponseEntity<Pathology> getPathology(@PathVariable String id) {
        Pathology pathology = pathologyRepository.findOne(id);
        if (pathology == null)
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        return ResponseEntity.ok(pathology);
    }

    @GetMapping("pathologies/{ids}")
    public List<Pathology> getPathologies(@PathVariable String ids) {
        List<String> listIds = asList(ids.split(","));
        return pathologyRepository.findAll(listIds);
    }

    @GetMapping("pathologies/count")
    public Long getCount() {
        return pathologyRepository.count();
    }

    @DeleteMapping("pathology/{id}")
    public Long deletePathology(@PathVariable String id) {
        return pathologyRepository.delete(id);
    }

    @DeleteMapping("pathologies/{ids}")
    public Long deletePathologies(@PathVariable String ids) {
        List<String> listIds = asList(ids.split(","));
        return pathologyRepository.delete(listIds);
    }

    @DeleteMapping("pathologies")
    public Long deletePathologies() {
        return pathologyRepository.deleteAll();
    }

    @PutMapping("pathology")
    public Pathology putPathology(@RequestBody Pathology pathology) {
        return pathologyRepository.update(pathology);
    }

    @PutMapping("pathologies")
    public Long putPathology(@RequestBody List<Pathology> pathologies) {
        return pathologyRepository.update(pathologies);
    }

    @ExceptionHandler(RuntimeException.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    public final Exception handleAllExceptions(RuntimeException e) {
        LOGGER.error("Internal server error.", e);
        return e;
    }
}
