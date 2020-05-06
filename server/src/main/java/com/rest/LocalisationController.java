package com.rest;

import com.model.Localisation;
import com.repository.LocalisationRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static java.util.Arrays.asList;

@RestController
@RequestMapping("/")
public class LocalisationController {

    private final static Logger LOGGER = LoggerFactory.getLogger(LocalisationController.class);
    private final LocalisationRepository localisationRepository;

    public LocalisationController(LocalisationRepository localisationRepository) {
        this.localisationRepository = localisationRepository;
    }

    @PostMapping("localisation")
    @ResponseStatus(HttpStatus.CREATED)
    public Localisation postLocalisation(@RequestBody Localisation localisation) {
        return localisationRepository.save(localisation);
    }

    @PostMapping("localisations")
    @ResponseStatus(HttpStatus.CREATED)
    public List<Localisation> postLocalisations(@RequestBody List<Localisation> localisations) {
        return localisationRepository.saveAll(localisations);
    }

    @GetMapping("localisations")
    public List<Localisation> getLocalisations() {
        return localisationRepository.findAll();
    }

    @GetMapping("localisation/{id}")
    public ResponseEntity<Localisation> getLocalisation(@PathVariable String id) {
        Localisation localisation = localisationRepository.findOne(id);
        if (localisation == null)
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        return ResponseEntity.ok(localisation);
    }

    @GetMapping("localisations/{ids}")
    public List<Localisation> getLocalisations(@PathVariable String ids) {
        List<String> listIds = asList(ids.split(","));
        return localisationRepository.findAll(listIds);
    }

    @GetMapping("localisations/count")
    public Long getCount() {
        return localisationRepository.count();
    }

    @DeleteMapping("localisation/{id}")
    public Long deleteLocalisation(@PathVariable String id) {
        return localisationRepository.delete(id);
    }

    @DeleteMapping("localisations/{ids}")
    public Long deleteLocalisations(@PathVariable String ids) {
        List<String> listIds = asList(ids.split(","));
        return localisationRepository.delete(listIds);
    }

    @DeleteMapping("localisations")
    public Long deleteLocalisations() {
        return localisationRepository.deleteAll();
    }

    @PutMapping("localisation")
    public Localisation putLocalisation(@RequestBody Localisation localisation) {
        return localisationRepository.update(localisation);
    }

    @PutMapping("localisations")
    public Long putLocalisation(@RequestBody List<Localisation> localisations) {
        return localisationRepository.update(localisations);
    }

    @ExceptionHandler(RuntimeException.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    public final Exception handleAllExceptions(RuntimeException e) {
        LOGGER.error("Internal server error.", e);
        return e;
    }
}
