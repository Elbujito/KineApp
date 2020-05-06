package com.rest;

import com.model.BilanArticulaire;
import com.repository.BilanArticulaireRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static java.util.Arrays.asList;

@RestController
@RequestMapping("/")
public class BilanArticulaireController {

    private final static Logger LOGGER = LoggerFactory.getLogger(BilanArticulaireController.class);
    private final BilanArticulaireRepository bilanArticulaireRepository;

    public BilanArticulaireController(BilanArticulaireRepository bilanArticulaireRepository) {
        this.bilanArticulaireRepository = bilanArticulaireRepository;
    }

    @PostMapping("bilanArticulaire")
    @ResponseStatus(HttpStatus.CREATED)
    public BilanArticulaire postBilanArticulaire(@RequestBody BilanArticulaire bilanArticulaire) {
        return bilanArticulaireRepository.save(bilanArticulaire);
    }

    @PostMapping("bilanArticulaires")
    @ResponseStatus(HttpStatus.CREATED)
    public List<BilanArticulaire> postBilanArticulaires(@RequestBody List<BilanArticulaire> bilanArticulaires) {
        return bilanArticulaireRepository.saveAll(bilanArticulaires);
    }

    @GetMapping("bilanArticulaires")
    public List<BilanArticulaire> getBilanArticulaires() {
        return bilanArticulaireRepository.findAll();
    }

    @GetMapping("bilanArticulaire/{id}")
    public ResponseEntity<BilanArticulaire> getBilanArticulaire(@PathVariable String id) {
        BilanArticulaire bilanArticulaire = bilanArticulaireRepository.findOne(id);
        if (bilanArticulaire == null)
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        return ResponseEntity.ok(bilanArticulaire);
    }

    @GetMapping("bilanArticulaires/{ids}")
    public List<BilanArticulaire> getBilanArticulaires(@PathVariable String ids) {
        List<String> listIds = asList(ids.split(","));
        return bilanArticulaireRepository.findAll(listIds);
    }

    @GetMapping("bilanArticulaires/count")
    public Long getCount() {
        return bilanArticulaireRepository.count();
    }

    @DeleteMapping("bilanArticulaire/{id}")
    public Long deleteBilanArticulaire(@PathVariable String id) {
        return bilanArticulaireRepository.delete(id);
    }

    @DeleteMapping("bilanArticulaires/{ids}")
    public Long deleteBilanArticulaires(@PathVariable String ids) {
        List<String> listIds = asList(ids.split(","));
        return bilanArticulaireRepository.delete(listIds);
    }

    @DeleteMapping("bilanArticulaires")
    public Long deleteBilanArticulaires() {
        return bilanArticulaireRepository.deleteAll();
    }

    @PutMapping("bilanArticulaire")
    public BilanArticulaire putBilanArticulaire(@RequestBody BilanArticulaire bilanArticulaire) {
        return bilanArticulaireRepository.update(bilanArticulaire);
    }

    @PutMapping("bilanArticulaires")
    public Long putBilanArticulaire(@RequestBody List<BilanArticulaire> bilanArticulaires) {
        return bilanArticulaireRepository.update(bilanArticulaires);
    }

    @ExceptionHandler(RuntimeException.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    public final Exception handleAllExceptions(RuntimeException e) {
        LOGGER.error("Internal server error.", e);
        return e;
    }
}
