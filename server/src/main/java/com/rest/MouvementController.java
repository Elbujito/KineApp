package com.rest;

import com.model.Mouvement;
import com.repository.MouvementRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static java.util.Arrays.asList;

@RestController
@RequestMapping("/")
public class MouvementController {

    private final static Logger LOGGER = LoggerFactory.getLogger(MouvementController.class);
    private final MouvementRepository mouvementRepository;

    public MouvementController(MouvementRepository mouvementRepository) {
        this.mouvementRepository = mouvementRepository;
    }

    @PostMapping("mouvement")
    @ResponseStatus(HttpStatus.CREATED)
    public Mouvement postMouvement(@RequestBody Mouvement mouvement) {
        return mouvementRepository.save(mouvement);
    }

    @PostMapping("mouvements")
    @ResponseStatus(HttpStatus.CREATED)
    public List<Mouvement> postMouvements(@RequestBody List<Mouvement> mouvements) {
        return mouvementRepository.saveAll(mouvements);
    }

    @GetMapping("mouvements")
    public List<Mouvement> getMouvements() {
        return mouvementRepository.findAll();
    }

    @GetMapping("mouvement/{id}")
    public ResponseEntity<Mouvement> getMouvement(@PathVariable String id) {
        Mouvement mouvement = mouvementRepository.findOne(id);
        if (mouvement == null)
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        return ResponseEntity.ok(mouvement);
    }

    @GetMapping("mouvements/{ids}")
    public List<Mouvement> getMouvements(@PathVariable String ids) {
        List<String> listIds = asList(ids.split(","));
        return mouvementRepository.findAll(listIds);
    }

    @GetMapping("mouvements/count")
    public Long getCount() {
        return mouvementRepository.count();
    }

    @DeleteMapping("mouvement/{id}")
    public Long deleteMouvement(@PathVariable String id) {
        return mouvementRepository.delete(id);
    }

    @DeleteMapping("mouvements/{ids}")
    public Long deleteMouvements(@PathVariable String ids) {
        List<String> listIds = asList(ids.split(","));
        return mouvementRepository.delete(listIds);
    }

    @DeleteMapping("mouvements")
    public Long deleteMouvements() {
        return mouvementRepository.deleteAll();
    }

    @PutMapping("mouvement")
    public Mouvement putMouvement(@RequestBody Mouvement mouvement) {
        return mouvementRepository.update(mouvement);
    }

    @PutMapping("mouvements")
    public Long putMouvement(@RequestBody List<Mouvement> mouvements) {
        return mouvementRepository.update(mouvements);
    }

    @ExceptionHandler(RuntimeException.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    public final Exception handleAllExceptions(RuntimeException e) {
        LOGGER.error("Internal server error.", e);
        return e;
    }
}
