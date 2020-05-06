package com.model.rest;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.databind.ser.std.ToStringSerializer;
import org.bson.types.ObjectId;

import java.util.Objects;

@JsonInclude(Include.NON_NULL)
public class Localisation {

    @JsonSerialize(using = ToStringSerializer.class)
    private ObjectId id;
    private String name;
    private String sousLocalisation;

    public String getSousLocalisation() {
        return sousLocalisation;
    }

    public void setSousLocalisation(String sousLocalisation) {
        this.sousLocalisation = sousLocalisation;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public ObjectId getId() {
        return id;
    }

    public Localisation setId(ObjectId id) {
        this.id = id;
        return this;
    }

    @Override
    public String toString() {
        return "Localisation{" + "id=" + id + ", name='"
                + name + '\'' + ", sousLocalisation='" + sousLocalisation + '\'' + '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o)
            return true;
        if (o == null || getClass() != o.getClass())
            return false;
        Localisation localisation = (Localisation) o;
        return name == localisation.name && Objects.equals(id, localisation.id)
                && Objects.equals(sousLocalisation,localisation.sousLocalisation);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, name, sousLocalisation);
    }

}