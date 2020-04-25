package com.model.rest;


public class Connector {

    private String id;
    private String name;

    public Connector() {}

    public String getId() {
        return id;
    }

    public Connector setId(String id) {
        this.id = id;
        return this;
    }

    public String getName() {
        return name;
    }

    public Connector setName(String name) {
        this.name = name;
        return this;
    }

}
