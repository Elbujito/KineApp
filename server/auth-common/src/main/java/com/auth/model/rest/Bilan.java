package com.auth.model.rest;

public class Bilan {
    public String id;
    public String patientId;
    public String title;
    public String date;
    public String description;
    public Bilan() {}
    public Bilan(String id, String patientId, String title, String date, String description) {
        this.id =id;
        this.patientId = patientId;
        this.title = title;
        this.date = date;
        this.description = description;
    }
    public void setId(String id) { this.id = id; }
    public String getId() { return this.id; }
    public void setPatientId(String patientId) { this.patientId = patientId; }
    public String getPatientId() { return this.patientId; }
    public void setTitle(String title) { this.title = title; }
    public String getTitle() { return title; }
    public void setDate(String date) { this.date = date; }
    public String getDate() { return date; }
    public void setDescription(String description) { this.description = description; }
    public String getDescription() { return description; }
}