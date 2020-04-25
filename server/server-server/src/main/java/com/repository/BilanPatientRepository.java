package com.repository;

import com.model.rest.BilanPatient;

import java.util.ArrayList;
import java.util.List;
import java.util.function.Predicate;
import java.util.stream.Collectors;

public class BilanPatientRepository
{
    public static class DbBilanPatientRepository {

        public List<BilanPatient> bilanPatientList;

        public DbBilanPatientRepository()
        {
            this.bilanPatientList = new ArrayList();
            this.bilanPatientList.add(new BilanPatient("1", "1","2"));
            this.bilanPatientList.add(new BilanPatient("2", "2","3"));
            this.bilanPatientList.add(new BilanPatient("3", "3","1"));
            this.bilanPatientList.add(new BilanPatient("4", "1","3"));
        }

        public void addBilanPatient(String patientId, String bilanId)
        {
            this.bilanPatientList.add(new BilanPatient("-1", patientId, bilanId));
        }

        public BilanPatient findByBilanIdAndPatiendId(String bilanId, String patientId)
        {
            Predicate<BilanPatient> isBilanExist = e -> e.getIdBilan() == bilanId;
            Predicate<BilanPatient> isPatientExist = e -> e.getIdPatient() == patientId;

            return this.bilanPatientList.stream().filter(isBilanExist.and(isPatientExist))
                    .findAny()
                    .orElse(null);
        }

        public void removeBilanById(String bilanId, String patientId)
        {
            Predicate<BilanPatient> isBilanExist = e -> e.getIdBilan() == bilanId;
            Predicate<BilanPatient> isPatientExist = e -> e.getIdPatient() == patientId;

            this.bilanPatientList.remove(this.bilanPatientList.stream().filter(isBilanExist.and(isPatientExist))
                    .findAny()
                    .orElse(null));
        }

        public List<BilanPatient> findAllBilanByPatientId(String patientId)
        {
            return this.bilanPatientList.stream()
                    .filter(p -> p.getIdPatient() == patientId).collect(Collectors.toList());
        }
    }
}
