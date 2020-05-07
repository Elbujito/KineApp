package com.rest;

import com.model.BilanAlgique;
import com.repository.BilanAlgiqueRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static java.util.Arrays.asList;

@RestController
@RequestMapping("/")
public class BilanAlgiqueController {

    private final static Logger LOGGER = LoggerFactory.getLogger(BilanAlgiqueController.class);
    private final BilanAlgiqueRepository bilanAlgiqueRepository;

    public BilanAlgiqueController(BilanAlgiqueRepository bilanAlgiqueRepository) {
        this.bilanAlgiqueRepository = bilanAlgiqueRepository;
    }

    @PostMapping("bilanAlgique")
    @ResponseStatus(HttpStatus.CREATED)
    public BilanAlgique postBilanAlgique(@RequestBody BilanAlgique bilanAlgique) {
        return bilanAlgiqueRepository.save(bilanAlgique);
    }

    @PostMapping("bilanAlgiques")
    @ResponseStatus(HttpStatus.CREATED)
    public List<BilanAlgique> postBilanAlgiques(@RequestBody List<BilanAlgique> bilanAlgiques) {
        return bilanAlgiqueRepository.saveAll(bilanAlgiques);
    }

    @GetMapping("bilanAlgiques")
    public List<BilanAlgique> getBilanAlgiques() {
        return bilanAlgiqueRepository.findAll();
    }

    @GetMapping("bilanAlgique/{id}")
    public ResponseEntity<BilanAlgique> getBilanAlgique(@PathVariable String id) {
        BilanAlgique bilanAlgique = bilanAlgiqueRepository.findOne(id);
        if (bilanAlgique == null)
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        return ResponseEntity.ok(bilanAlgique);
    }

    @GetMapping("bilanAlgiques/{ids}")
    public List<BilanAlgique> getBilanAlgiques(@PathVariable String ids) {
        List<String> listIds = asList(ids.split(","));
        return bilanAlgiqueRepository.findAll(listIds);
    }

    @GetMapping("bilanAlgiques/count")
    public Long getCount() {
        return bilanAlgiqueRepository.count();
    }

    @DeleteMapping("bilanAlgique/{id}")
    public Long deleteBilanAlgique(@PathVariable String id) {
        return bilanAlgiqueRepository.delete(id);
    }

    @DeleteMapping("bilanAlgiques/{ids}")
    public Long deleteBilanAlgiques(@PathVariable String ids) {
        List<String> listIds = asList(ids.split(","));
        return bilanAlgiqueRepository.delete(listIds);
    }

    @DeleteMapping("bilanAlgiques")
    public Long deleteBilanAlgiques() {
        return bilanAlgiqueRepository.deleteAll();
    }

    @PutMapping("bilanAlgique")
    public BilanAlgique putBilanAlgique(@RequestBody BilanAlgique bilanAlgique) {
        return bilanAlgiqueRepository.update(bilanAlgique);
    }

    @PutMapping("bilanAlgiques")
    public Long putBilanAlgique(@RequestBody List<BilanAlgique> bilanAlgiques) {
        return bilanAlgiqueRepository.update(bilanAlgiques);
    }

    @ExceptionHandler(RuntimeException.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    public final Exception handleAllExceptions(RuntimeException e) {
        LOGGER.error("Internal server error.", e);
        return e;
    }
}
