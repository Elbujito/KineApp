package com.repository;

import com.model.rest.Bilan;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
import java.util.function.Predicate;

public class BilanRepository
{
    public static class DbBilanRepository {

        public List<Bilan> bilanList;

        private static final Logger LOG = LoggerFactory.getLogger(BilanRepository.DbBilanRepository.class);

        public DbBilanRepository()
        {
            this.bilanList = new ArrayList();
            this.bilanList.add(new Bilan(1L, 1L,"Bilan 1","06/10/20","Adrien va bien"));
            this.bilanList.add(new Bilan(2L,2L,"Bilan 2","10/11/20","Rafael va moins bien"));
            this.bilanList.add(new Bilan(3L, 3L, "Bilan 3",  "05/08/20","Thomas va très bien"));
            this.bilanList.add(new Bilan(4L,4L,"Bilan 4", "021/10/20","Victor va pas bien"));
        }

        public void displayList()
        {
            LOG.info(" Bilans " + this.bilanList);
        }

        public List<Bilan> getBilans()
        {
            return this.bilanList;
        }

        public Boolean addBilan(Bilan bilan)
        {
            List<Long> ids = this.bilanList.stream()
                    .map(Bilan::getId).collect(Collectors.toList());
            bilan.setId(ids.stream()
                    .reduce(Long::max)
                    .get()+1);
            return this.bilanList.add(bilan);
        }

        public Boolean removeBilan(Bilan bilan)
        {
            Bilan bilanToRemove = findBilanById(bilan.getId());
            int itemIndex = this.bilanList.indexOf(bilanToRemove);
            if (itemIndex != -1) {
                return this.bilanList.remove(bilan);
            }
            return false;
        }

        public Bilan findBilanById(Long id)
        {
            System.out.println(id);
            return this.bilanList.stream()
                    .filter(bilan -> id.equals(bilan.getId()))
                    .findFirst()
                    .get();
        }

        public List<Bilan> findBilansByPatientId(Long patientId)
        {
            Predicate<Bilan> isPatientExist = e -> e.getPatientId() == patientId;

            return this.bilanList.stream()
                    .filter(isPatientExist).collect(Collectors.toList());
        }

        public void removeBilansByPatientId(Long patientId)
        {
            //Predicate<Bilan> isPatientExist = e -> e.getPatientId() == patientId;

            //this.bilanList.remove(this.bilanList.stream().filter(isPatientExist));
        }

        public Boolean updateBilan(Bilan bilan) {
            int itemIndex = this.bilanList.indexOf(bilan);
            if (itemIndex != -1) {
                this.bilanList.set(itemIndex, bilan);
                return true;
            }
            return false;
        }
    }
}
