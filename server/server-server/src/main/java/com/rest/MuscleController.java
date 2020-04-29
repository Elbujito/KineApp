package com.rest;

import com.model.rest.Muscle;
import com.repository.MuscleRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static java.util.Arrays.asList;

@RestController
@RequestMapping("/")
public class MuscleController {

    private final static Logger LOGGER = LoggerFactory.getLogger(MuscleController.class);
    private final MuscleRepository muscleRepository;

    public MuscleController(MuscleRepository muscleRepository) {
        this.muscleRepository = muscleRepository;
    }

    @PostMapping("muscle")
    @ResponseStatus(HttpStatus.CREATED)
    public Muscle postMuscle(@RequestBody Muscle muscle) {
        return muscleRepository.save(muscle);
    }

    @PostMapping("muscles")
    @ResponseStatus(HttpStatus.CREATED)
    public List<Muscle> postMuscles(@RequestBody List<Muscle> muscles) {
        return muscleRepository.saveAll(muscles);
    }

    @GetMapping("muscles")
    public List<Muscle> getMuscles() {
        return muscleRepository.findAll();
    }

    @GetMapping("muscle/{id}")
    public ResponseEntity<Muscle> getMuscle(@PathVariable String id) {
        Muscle muscle = muscleRepository.findOne(id);
        if (muscle == null)
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        return ResponseEntity.ok(muscle);
    }

    @GetMapping("muscles/{ids}")
    public List<Muscle> getMuscles(@PathVariable String ids) {
        List<String> listIds = asList(ids.split(","));
        return muscleRepository.findAll(listIds);
    }

    @GetMapping("muscles/count")
    public Long getCount() {
        return muscleRepository.count();
    }

    @DeleteMapping("muscle/{id}")
    public Long deleteMuscle(@PathVariable String id) {
        return muscleRepository.delete(id);
    }

    @DeleteMapping("muscles/{ids}")
    public Long deleteMuscles(@PathVariable String ids) {
        List<String> listIds = asList(ids.split(","));
        return muscleRepository.delete(listIds);
    }

    @DeleteMapping("muscles")
    public Long deleteMuscles() {
        return muscleRepository.deleteAll();
    }

    @PutMapping("muscle")
    public Muscle putMuscle(@RequestBody Muscle muscle) {
        return muscleRepository.update(muscle);
    }

    @PutMapping("muscles")
    public Long putMuscle(@RequestBody List<Muscle> muscles) {
        return muscleRepository.update(muscles);
    }

    @ExceptionHandler(RuntimeException.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    public final Exception handleAllExceptions(RuntimeException e) {
        LOGGER.error("Internal server error.", e);
        return e;
    }
}
