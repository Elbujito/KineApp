package com.model.rest;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.databind.ser.std.ToStringSerializer;
import org.bson.types.ObjectId;

import java.util.Objects;
import java.util.Date;

@JsonInclude(Include.NON_NULL)
public class BilanMusculaire {

    @JsonSerialize(using = ToStringSerializer.class)
    private ObjectId id;
    private Date date;
    private Muscle muscle;
    private int cotation;
    private String observation;

    public Muscle getMuscle() {
        return muscle;
    }

    public void setMuscle(Muscle muscle) {
        this.muscle = muscle;
    }

    public int getCotation() {
        return cotation;
    }

    public void setCotation(int cotation) {
        this.cotation = cotation;
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

    public BilanMusculaire setId(ObjectId id) {
        this.id = id;
        return this;
    }

    @Override
    public String toString() {
        return "BilanMusculaire{" + "id=" + id + ", date="
                + date + ", muscle=" + muscle +
                ", cotation=" + cotation +
                ", observation='" + observation + '\'' +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o)
            return true;
        if (o == null || getClass() != o.getClass())
            return false;
        BilanMusculaire bilanMusculaire = (BilanMusculaire) o;
        return muscle == bilanMusculaire.muscle && Objects.equals(id, bilanMusculaire.id)
                && Objects.equals(cotation,bilanMusculaire.cotation)
                && Objects.equals(observation,bilanMusculaire.observation)
                && Objects.equals(date,bilanMusculaire.date);

    }

    @Override
    public int hashCode() {
        return Objects.hash(id, date, muscle, cotation, observation);
    }

}