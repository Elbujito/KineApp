package com.repository;

import com.model.rest.Patient;
import com.rest.PatientController;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
import java.util.*;
import java.util.function.*;

public class PatientRepository
{
    public static class DbPatientRepository {

        private static final Logger LOG = LoggerFactory.getLogger(DbPatientRepository.class);

        public List<Patient> patientList;

        public DbPatientRepository()
        {
            this.patientList = new ArrayList();
            this.patientList.add(new Patient(1L,"Adrien", "Roques", "25", "64", "adrien.roques@medinotes.fr", ""));
            this.patientList.add(new Patient(2L,"Rafael", "Cecotti", "23", "74", "rafael.cecotti@medinotes.fr", ""));
            this.patientList.add(new Patient(3L,"Thomas", "Benetti", "25", "54", "thomas.benetti@medinotes.fr", ""));
            this.patientList.add(new Patient(4L,"Victor", "Chamontin", "24", "70", "victor.chamontin@medinotes.fr", ""));
            this.patientList.add(new Patient(5L,"Romain", "Roques", "24", "64", "romain.roques@medinotes.fr", ""));
            this.patientList.add(new Patient(6L,"Maxime", "Cecotti", "89", "74", "maxime.cecotti@medinotes.fr", ""));
            this.patientList.add(new Patient(7L,"Thibault", "Benetti", "67", "54", "thibault.benetti@medinotes.fr", ""));
            this.patientList.add(new Patient(8L,"Hugo", "Torry", "65", "70", "hugo.torry@medinotes.fr", ""));
        }

        public void displayList()
        {
            LOG.info(" addPatient " + this.patientList);
        }

        public List<Patient> getPatients()
        {
            return this.patientList;
        }

        public Boolean addPatient(Patient patient)
        {
            List<Long> ids = this.patientList.stream()
                    .map(Patient::getId).collect(Collectors.toList());
            patient.setId(ids.stream()
                    .reduce(Long::max)
                    .get()+1);
            return this.patientList.add(patient);
        }

        public Boolean removePatient(Patient patient)
        {
            Patient patientToRemove = findPatientById(patient.getId());
            int itemIndex = this.patientList.indexOf(patientToRemove);
            if (itemIndex != -1) {
                return this.patientList.remove(patient);
            }
            return false;
        }

        public Patient findPatientById(Long id)
        {
            System.out.println(id);
            return this.patientList.stream()
                    .filter(patient -> id.equals(patient.getId()))
                    .findFirst()
                    .get();
        }


        public Boolean updatePatient(Patient patient) {
            int itemIndex = this.patientList.indexOf(patient);
            if (itemIndex != -1) {
                this.patientList.set(itemIndex, patient);
                return true;
            }
            return false;
        }
    }
}
