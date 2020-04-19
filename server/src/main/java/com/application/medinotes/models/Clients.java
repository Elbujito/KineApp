package com.application.medinotes.models;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;

public class Clients {
    @Id
    public ObjectId _id;

    public String name;
    public String age;
    public String status;

    // Constructors
    public Clients() {}

    public Clients(ObjectId _id, String name, String age, String status) {
        this._id = _id;
        this.name = name;
        this.age = age;
        this.status = status;
    }

    // ObjectId needs to be converted to string
    public String get_id() { return _id.toHexString(); }
    public void set_id(ObjectId _id) { this._id = _id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getAge() { return age; }
    public void setAge(String age) { this.age = age; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
}