package com.rest;

import com.model.rest.Prescripteur;
import com.repository.PrescripteurRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static java.util.Arrays.asList;

@RestController
@RequestMapping("/")
public class PrescripteurController {

    private final static Logger LOGGER = LoggerFactory.getLogger(PrescripteurController.class);
    private final PrescripteurRepository prescripteurRepository;

    public PrescripteurController(PrescripteurRepository prescripteurRepository) {
        this.prescripteurRepository = prescripteurRepository;
    }

    @PostMapping("prescripteur")
    @ResponseStatus(HttpStatus.CREATED)
    public Prescripteur postPrescripteur(@RequestBody Prescripteur prescripteur) {
        return prescripteurRepository.save(prescripteur);
    }

    @PostMapping("prescripteurs")
    @ResponseStatus(HttpStatus.CREATED)
    public List<Prescripteur> postPrescripteurs(@RequestBody List<Prescripteur> prescripteurs) {
        return prescripteurRepository.saveAll(prescripteurs);
    }

    @GetMapping("prescripteurs")
    public List<Prescripteur> getPrescripteurs() {
        return prescripteurRepository.findAll();
    }

    @GetMapping("prescripteur/{id}")
    public ResponseEntity<Prescripteur> getPrescripteur(@PathVariable String id) {
        Prescripteur prescripteur = prescripteurRepository.findOne(id);
        if (prescripteur == null)
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        return ResponseEntity.ok(prescripteur);
    }

    @GetMapping("prescripteurs/{ids}")
    public List<Prescripteur> getPrescripteurs(@PathVariable String ids) {
        List<String> listIds = asList(ids.split(","));
        return prescripteurRepository.findAll(listIds);
    }

    @GetMapping("prescripteurs/count")
    public Long getCount() {
        return prescripteurRepository.count();
    }

    @DeleteMapping("prescripteur/{id}")
    public Long deletePrescripteur(@PathVariable String id) {
        return prescripteurRepository.delete(id);
    }

    @DeleteMapping("prescripteurs/{ids}")
    public Long deletePrescripteurs(@PathVariable String ids) {
        List<String> listIds = asList(ids.split(","));
        return prescripteurRepository.delete(listIds);
    }

    @DeleteMapping("prescripteurs")
    public Long deletePrescripteurs() {
        return prescripteurRepository.deleteAll();
    }

    @PutMapping("prescripteur")
    public Prescripteur putPrescripteur(@RequestBody Prescripteur prescripteur) {
        return prescripteurRepository.update(prescripteur);
    }

    @PutMapping("prescripteurs")
    public Long putPrescripteur(@RequestBody List<Prescripteur> prescripteurs) {
        return prescripteurRepository.update(prescripteurs);
    }

    @ExceptionHandler(RuntimeException.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    public final Exception handleAllExceptions(RuntimeException e) {
        LOGGER.error("Internal server error.", e);
        return e;
    }
}
