package com.model.rest;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.databind.ser.std.ToStringSerializer;
import org.bson.types.ObjectId;

import java.util.Objects;
import java.util.Date;

@JsonInclude(Include.NON_NULL)
public class BilanArticulaire {

    @JsonSerialize(using = ToStringSerializer.class)
    private ObjectId id;
    private Date date;
    private Mouvement mouvement;
    private int amplitude;
    private String observation;

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public Mouvement getMouvement() {
        return mouvement;
    }

    public void setMouvement(Mouvement mouvement) {
        this.mouvement = mouvement;
    }

    public int getAmplitude() {
        return amplitude;
    }

    public void setAmplitude(int amplitude) {
        this.amplitude = amplitude;
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

    public BilanArticulaire setId(ObjectId id) {
        this.id = id;
        return this;
    }

    @Override
    public String toString() {
        return "BilanArticulaire{" + "id=" + id + ", date="
                + date + ", mouvement=" + mouvement +
                ", amplitude=" + amplitude +
                ", observation='" + observation + '\'' +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o)
            return true;
        if (o == null || getClass() != o.getClass())
            return false;
        BilanArticulaire bilanArticulaire = (BilanArticulaire) o;
        return mouvement == bilanArticulaire.mouvement && Objects.equals(id, bilanArticulaire.id)
                && Objects.equals(amplitude,bilanArticulaire.amplitude)
                && Objects.equals(observation,bilanArticulaire.observation)
                && Objects.equals(date,bilanArticulaire.date);

    }

    @Override
    public int hashCode() {
        return Objects.hash(id, date, mouvement, amplitude, observation);
    }

}