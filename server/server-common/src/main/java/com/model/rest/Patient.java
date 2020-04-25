package com.model.rest;

public class Patient {
    public String id;
    public String firstname;
    public String name;
    public String age;
    public String weight;
    public String img;
    public String email;
    public Patient() {}
    public Patient(String id, String firstname, String name, String age,
                   String weight, String img, String email) {
        this.id = id;
        this.firstname = firstname;
        this.name = name;
        this.age = age;
        this.weight = weight;
        this.img = img;
        this.email = email;
    }
    public void setId(String id) { this.id = id; }
    public String getId() { return this.id; }
    public void setAge(String age) { this.age = age; }
    public String getAge() { return age; }
    public void setFirstname(String firstname) { this.firstname = firstname; }
    public String getFirstname() { return firstname; }
    public void setName(String name) { this.name = name; }
    public String getName() { return name; }
    public void setWeight(String weight) { this.weight = weight; }
    public String getWeight() { return weight; }
    public void setImg(String img) { this.img = img; }
    public String getImg() { return img; }
    public void setEmail(String email) { this.email = email; }
    public String getEmail() { return email; }
}