package com.model;
import org.bson.types.ObjectId;
import java.io.Serializable;
import java.util.Objects;

public class Note implements Serializable {

    public ObjectId id;
    public ObjectId patientId;
    public String title;
    public String date;
    public String description;

    public Note(ObjectId id, ObjectId patientId, String title, String date, String description) {
        this();
        this.id = id;
        this.patientId = patientId;
        this.title = title;
        this.date = date;
        this.description = description;
    }

    public Note() {
        super();
    }

    public ObjectId getId() {
        return id;
    }

    public void setId(ObjectId id) {
        this.id = id;
    }

    public ObjectId getPatientId() {
        return patientId;
    }

    public void setPatientId(ObjectId patientId) {
        this.patientId = patientId;
    }

    public String getTitle() {
        return title;
    }

    public String getDate() {
        return date;
    }

    public String getDescription() {
        return description;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        Note note = (Note) o;
        if (note.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), note.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Note{" +
                "id=" + getId() +
                ", patientId=" + getPatientId() +
                ", title='" + getTitle() + "'" +
                ", date='" + getDate() + "'" +
                ", description='" + getDescription() + "'" +
                "}";
    }
}