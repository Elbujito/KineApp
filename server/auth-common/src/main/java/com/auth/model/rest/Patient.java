package com.auth.model.rest;

public class Patient {
    public String id;
    public String name;
    public String age;
    public Patient() {}
    public Patient(String id, String name, String age) {
        this.id = id;
        this.name = name;
        this.age = age;
    }
    public void setId(String id) { this.id = id; }
    public String getId() { return this.id; }
    public void setAge(String age) { this.age = age; }
    public String getAge() { return age; }
    public void setName(String name) { this.name = name; }
    public String getName() { return name; }
}