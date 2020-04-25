package com.model.rest;

public class BilanPatient {
    public String id;

    public String getIdPatient() {
        return idPatient;
    }

    public String getIdBilan() {
        return idBilan;
    }

    public String idPatient;
    public String idBilan;
    public BilanPatient() {}
    public BilanPatient(String id, String idPatient, String idBilan) {
        this.id = id;
        this.idPatient = idPatient;
        this.idBilan = idBilan;
    }
}