package com.rest;

import com.model.rest.Patient;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.slf4j.Marker;
import org.slf4j.MarkerFactory;
import org.springframework.web.bind.annotation.*;
import com.client.BilanClient;
import com.model.rest.Bilan;
import com.repository.BilanRepository;
import java.util.List;

@RestController
@RequestMapping("/bilan")
@SuppressWarnings("PMD.ExcessiveImports")
public final class BilanController implements BilanClient {

    private static final Marker PUBLIC = MarkerFactory.getMarker("PUBLIC");

    private static final Logger LOG = LoggerFactory.getLogger(BilanController.class);

    private static BilanRepository.DbBilanRepository repo = new BilanRepository.DbBilanRepository();

    @SuppressWarnings("checkstyle:parameternumber")
    public BilanController()
    {

    }

    @Override
    @PostMapping("/findAll")
    public List<Bilan> findBilansByPatientId(@RequestBody final String patientId)
    {
        LOG.info(" findBilansByPatientId " + patientId);
        try {
            return this.repo.findBilansByPatientId(Long.parseLong(patientId));
        }
        catch (Exception e) {
            throw e;
        }
    }

    @Override
    @PostMapping("/find")
    public Bilan findBilanById(@RequestBody final String bilanId)
    {
        LOG.info(" findBilanById " + bilanId);
        try {
            return this.repo.findBilanById(Long.parseLong(bilanId));
        }
        catch (Exception e) {
            throw e;
        }
    }

    @Override
    @PostMapping("/delete")
    public Boolean removeBilan(@RequestBody final Bilan bilan)
    {
        LOG.info(" removeBilan " + bilan);
        try {
            this.repo.displayList();
            Boolean result = this.repo.removeBilan(bilan);
            this.repo.displayList();
            return result;
        }
        catch (Exception e) {
            throw e;
        }
    }

    @Override
    @PostMapping("/add")
    public Boolean addBilan(@RequestBody Bilan bilan)
    {
        LOG.info(" addBilan " + bilan);
        try {
            bilan.setId(-1L);
            this.repo.displayList();
            Boolean result = this.repo.addBilan(bilan);
            this.repo.displayList();

            return result;
        }
        catch (Exception e) {
            throw e;
        }
    }

    @Override
    @PostMapping("/update")
    public Boolean updateBilan(@RequestBody final Bilan bilan)
    {
        LOG.info(" updateBilan " + bilan);
        try {
            this.repo.displayList();
            Bilan currentBilan = this.repo.findBilanById(bilan.getId());
            if(currentBilan != null) {
                Boolean result = this.repo.updateBilan(bilan);
                this.repo.displayList();
                return result;
            }
            return false;
        }
        catch (Exception e) {
            throw e;
        }
    }
}
