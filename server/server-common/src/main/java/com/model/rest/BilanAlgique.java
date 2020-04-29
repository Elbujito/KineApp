package com.model.rest;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.databind.ser.std.ToStringSerializer;
import org.bson.types.ObjectId;

import java.util.Objects;
import java.util.Date;

@JsonInclude(Include.NON_NULL)
public class BilanAlgique {

    @JsonSerialize(using = ToStringSerializer.class)
    private ObjectId id;
    private Date date;
    private int level;
    private String observation;

    public int getLevel() {
        return level;
    }

    public void setLevel(int level) {
        this.level = level;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public String getObservation() {
        return observation;
    }

    public void setObservation(String observation) {
        this.observation = observation;
    }

    public ObjectId getId() {
        return id;
    }

    public BilanAlgique setId(ObjectId id) {
        this.id = id;
        return this;
    }

    @Override
    public String toString() {
        return "BilanAlgique{" + "id=" + id + ", date="
                + date +
                ", level=" + level +
                ", observation='" + observation + '\'' +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o)
            return true;
        if (o == null || getClass() != o.getClass())
            return false;
        BilanAlgique bilanAlgique = (BilanAlgique) o;
        return date == bilanAlgique.date && Objects.equals(id, bilanAlgique.id)
                && Objects.equals(level,bilanAlgique.level)
                && Objects.equals(observation,bilanAlgique.observation);

    }

    @Override
    public int hashCode() {
        return Objects.hash(id, date, level, observation);
    }

}