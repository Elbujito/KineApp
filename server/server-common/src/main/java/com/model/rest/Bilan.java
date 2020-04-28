package com.model.rest;

import java.io.Serializable;
import java.util.Objects;

public class Bilan implements Serializable {

    public Long id;
    public Long patientId;
    public String title;
    public String date;
    public String description;

    public Bilan(Long id, Long patientId, String title, String date, String description) {
        this();
        this.id = id;
        this.patientId = patientId;
        this.title = title;
        this.date = date;
        this.description = description;
    }

    public Bilan() {
        super();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getPatientId() {
        return patientId;
    }

    public void setPatientId(Long patientId) {
        this.patientId = patientId;
    }

    public String getTitle() { return title; }
    public String getDate() { return date; }
    public String getDescription() { return description; }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        Bilan bilan = (Bilan) o;
        if(bilan.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), bilan.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Bilan{" +
                "id=" + getId() +
                ", patientId=" + getPatientId() +
                ", title='" + getTitle() + "'" +
                ", date='" + getDate() + "'" +
                ", description='" + getDescription() + "'" +
                "}";
    }
}