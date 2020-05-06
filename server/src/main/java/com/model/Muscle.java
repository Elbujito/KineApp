package com.model.rest;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.databind.ser.std.ToStringSerializer;
import org.bson.types.ObjectId;

import java.util.Objects;

@JsonInclude(Include.NON_NULL)
public class Muscle {

    @JsonSerialize(using = ToStringSerializer.class)
    private ObjectId id;
    private String name;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public ObjectId getId() {
        return id;
    }

    public Muscle setId(ObjectId id) {
        this.id = id;
        return this;
    }

    @Override
    public String toString() {
        return "Muscle{" + "id=" + id + ", name='"
                + name + '\'' + '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o)
            return true;
        if (o == null || getClass() != o.getClass())
            return false;
        Muscle muscle = (Muscle) o;
        return name == muscle.name && Objects.equals(id, muscle.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, name);
    }

}