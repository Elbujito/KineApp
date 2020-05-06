package com.rest;

import com.model.PathologyType;
import com.repository.PathologyTypeRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static java.util.Arrays.asList;

@RestController
@RequestMapping("/")
public class PathologyTypeController {

    private final static Logger LOGGER = LoggerFactory.getLogger(PathologyTypeController.class);
    private final PathologyTypeRepository pathologyTypeRepository;

    public PathologyTypeController(PathologyTypeRepository pathologyTypeRepository) {
        this.pathologyTypeRepository = pathologyTypeRepository;
    }

    @PostMapping("pathologyType")
    @ResponseStatus(HttpStatus.CREATED)
    public PathologyType postPathologyType(@RequestBody PathologyType pathologyType) {
        return pathologyTypeRepository.save(pathologyType);
    }

    @PostMapping("pathologyTypes")
    @ResponseStatus(HttpStatus.CREATED)
    public List<PathologyType> postPathologyTypes(@RequestBody List<PathologyType> pathologyTypes) {
        return pathologyTypeRepository.saveAll(pathologyTypes);
    }

    @GetMapping("pathologyTypes")
    public List<PathologyType> getPathologyTypes() {
        return pathologyTypeRepository.findAll();
    }

    @GetMapping("pathologyType/{id}")
    public ResponseEntity<PathologyType> getPathologyType(@PathVariable String id) {
        PathologyType pathologyType = pathologyTypeRepository.findOne(id);
        if (pathologyType == null)
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        return ResponseEntity.ok(pathologyType);
    }

    @GetMapping("pathologyTypes/{ids}")
    public List<PathologyType> getPathologyTypes(@PathVariable String ids) {
        List<String> listIds = asList(ids.split(","));
        return pathologyTypeRepository.findAll(listIds);
    }

    @GetMapping("pathologyTypes/count")
    public Long getCount() {
        return pathologyTypeRepository.count();
    }

    @DeleteMapping("pathologyType/{id}")
    public Long deletePathologyType(@PathVariable String id) {
        return pathologyTypeRepository.delete(id);
    }

    @DeleteMapping("pathologyTypes/{ids}")
    public Long deletePathologyTypes(@PathVariable String ids) {
        List<String> listIds = asList(ids.split(","));
        return pathologyTypeRepository.delete(listIds);
    }

    @DeleteMapping("pathologyTypes")
    public Long deletePathologyTypes() {
        return pathologyTypeRepository.deleteAll();
    }

    @PutMapping("pathologyType")
    public PathologyType putPathologyType(@RequestBody PathologyType pathologyType) {
        return pathologyTypeRepository.update(pathologyType);
    }

    @PutMapping("pathologyTypes")
    public Long putPathologyType(@RequestBody List<PathologyType> pathologyTypes) {
        return pathologyTypeRepository.update(pathologyTypes);
    }

    @ExceptionHandler(RuntimeException.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    public final Exception handleAllExceptions(RuntimeException e) {
        LOGGER.error("Internal server error.", e);
        return e;
    }
}
