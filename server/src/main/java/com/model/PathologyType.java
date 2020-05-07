package com.model;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.databind.ser.std.ToStringSerializer;
import org.bson.types.ObjectId;

import java.util.Objects;

@JsonInclude(Include.NON_NULL)
public class PathologyType {

    @JsonSerialize(using = ToStringSerializer.class)
    private ObjectId id;
    private String name;
    private NoteTemplate template;
    private String observation;
    private int level;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getObservation() {
        return observation;
    }

    public void setObservation(String observation) {
        this.observation = observation;
    }

    public int getLevel() {
        return level;
    }

    public void setLevel(int level) {
        this.level = level;
    }

    public NoteTemplate getTemplate() {
        return template;
    }

    public void setTemplate(NoteTemplate template) {
        this.template = template;
    }

    public ObjectId getId() {
        return id;
    }

    public PathologyType setId(ObjectId id) {
        this.id = id;
        return this;
    }

    @Override
    public String toString() {
        return "PathologyType{" + "id=" + id + ", name='"
                + name + '\'' + ", template=" + template +", observation='" + observation + '\'' + ", level=" + level + '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o)
            return true;
        if (o == null || getClass() != o.getClass())
            return false;
        PathologyType pathologyType = (PathologyType) o;
        return name == pathologyType.name && Objects.equals(id, pathologyType.id)
                && Objects.equals(observation,pathologyType.observation)
                && Objects.equals(level, pathologyType.level)
                && Objects.equals(template,pathologyType.template) ;
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, name, template, observation,level);
    }
}