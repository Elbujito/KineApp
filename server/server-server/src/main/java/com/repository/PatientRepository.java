package com.repository;

import com.model.rest.Patient;

import java.util.ArrayList;
import java.util.List;

public class PatientRepository
{
    public static class DbPatientRepository {

        public List<Patient> patientList;

        public DbPatientRepository()
        {
            this.patientList = new ArrayList();
            this.patientList.add(new Patient("1","Adrien", "Roques", "25", "64", "", "adrien.roques@medinotes.fr"));
            this.patientList.add(new Patient("2","Rafael", "Cecotti", "23", "74", "", "rafael.cecotti@medinotes.fr"));
            this.patientList.add(new Patient("3","Thomas", "Benetti", "25", "54", "", "thomas.benetti@medinotes.fr"));
            this.patientList.add(new Patient("4","Victor", "Chamontin", "24", "70", "", "victor.chamontin@medinotes.fr"));
            this.patientList.add(new Patient("5","Romain", "Roques", "24", "64", "", "romain.roques@medinotes.fr"));
            this.patientList.add(new Patient("6","Maxime", "Cecotti", "89", "74", "", "maxime.cecotti@medinotes.fr"));
            this.patientList.add(new Patient("7","Thibault", "Benetti", "67", "54", "", "thibault.benetti@medinotes.fr"));
            this.patientList.add(new Patient("8","Hugo", "Torry", "65", "70", "", "hugo.torry@medinotes.fr"));
        }

        public List<Patient> getPatients()
        {
            return this.patientList;
        }

        public void addPatient(Patient patient)
        {
            this.patientList.add(patient);
        }

        public void removePatient(Patient patient)
        {
            this.patientList.remove(patient);
        }

        public Patient findPatientById(String id)
        {
            return this.patientList.stream()
                    .filter(patient -> id.equals(patient.getId()))
                    .findAny()
                    .orElse(null);
        }

        public void removePatientById(String id)
        {
            removePatient(this.patientList.stream()
                    .filter(patient -> id.equals(patient.getId()))
                    .findAny()
                    .orElse(null));
        }
    }
}
