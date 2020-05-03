package com.rest;

import com.model.rest.BilanMusculaire;
import com.repository.BilanMusculaireRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static java.util.Arrays.asList;

@RestController
@RequestMapping("/")
public class BilanMusculaireController {

    private final static Logger LOGGER = LoggerFactory.getLogger(BilanMusculaireController.class);
    private final BilanMusculaireRepository bilanMusculaireRepository;

    public BilanMusculaireController(BilanMusculaireRepository bilanMusculaireRepository) {
        this.bilanMusculaireRepository = bilanMusculaireRepository;
    }

    @PostMapping("bilanMusculaire")
    @ResponseStatus(HttpStatus.CREATED)
    public BilanMusculaire postBilanMusculaire(@RequestBody BilanMusculaire bilanMusculaire) {
        return bilanMusculaireRepository.save(bilanMusculaire);
    }

    @PostMapping("bilanMusculaires")
    @ResponseStatus(HttpStatus.CREATED)
    public List<BilanMusculaire> postBilanMusculaires(@RequestBody List<BilanMusculaire> bilanMusculaires) {
        return bilanMusculaireRepository.saveAll(bilanMusculaires);
    }

    @GetMapping("bilanMusculaires")
    public List<BilanMusculaire> getBilanMusculaires() {
        return bilanMusculaireRepository.findAll();
    }

    @GetMapping("bilanMusculaire/{id}")
    public ResponseEntity<BilanMusculaire> getBilanMusculaire(@PathVariable String id) {
        BilanMusculaire bilanMusculaire = bilanMusculaireRepository.findOne(id);
        if (bilanMusculaire == null)
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        return ResponseEntity.ok(bilanMusculaire);
    }

    @GetMapping("bilanMusculaires/{ids}")
    public List<BilanMusculaire> getBilanMusculaires(@PathVariable String ids) {
        List<String> listIds = asList(ids.split(","));
        return bilanMusculaireRepository.findAll(listIds);
    }

    @GetMapping("bilanMusculaires/count")
    public Long getCount() {
        return bilanMusculaireRepository.count();
    }

    @DeleteMapping("bilanMusculaire/{id}")
    public Long deleteBilanMusculaire(@PathVariable String id) {
        return bilanMusculaireRepository.delete(id);
    }

    @DeleteMapping("bilanMusculaires/{ids}")
    public Long deleteBilanMusculaires(@PathVariable String ids) {
        List<String> listIds = asList(ids.split(","));
        return bilanMusculaireRepository.delete(listIds);
    }

    @DeleteMapping("bilanMusculaires")
    public Long deleteBilanMusculaires() {
        return bilanMusculaireRepository.deleteAll();
    }

    @PutMapping("bilanMusculaire")
    public BilanMusculaire putBilanMusculaire(@RequestBody BilanMusculaire bilanMusculaire) {
        return bilanMusculaireRepository.update(bilanMusculaire);
    }

    @PutMapping("bilanMusculaires")
    public Long putBilanMusculaire(@RequestBody List<BilanMusculaire> bilanMusculaires) {
        return bilanMusculaireRepository.update(bilanMusculaires);
    }

    @ExceptionHandler(RuntimeException.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    public final Exception handleAllExceptions(RuntimeException e) {
        LOGGER.error("Internal server error.", e);
        return e;
    }
}
