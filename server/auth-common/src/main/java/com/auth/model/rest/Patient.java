package com.auth.model.rest;

public class Patient {
    public String _id;
    public String name;
    public String age;
    public Patient() {}
    public Patient(String _id, String name, String age) {
        this._id = _id;
        this.name = name;
        this.age = age;
    }
    public void set_id(String _id) { this._id = _id; }
    public String get_id() { return this._id; }
    public void setAge(String age) { this.age = age; }
    public String getAge() { return age; }
    public void setName(String name) { this.name = name; }
    public String getName() { return name; }
}