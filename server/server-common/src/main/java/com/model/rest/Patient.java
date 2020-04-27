package com.model.rest;
import java.io.Serializable;
import java.util.Objects;

public class Patient implements Serializable {
    public Long id;
    public String firstname;
    public String name;
    public String age;
    public String weight;
    public String email;
    public String img;

    public Patient(Long id, String firstname, String name, String age,
                   String weight, String email, String img) {
        this();
        this.id = id;
        this.firstname = firstname;
        this.name = name;
        this.age = age;
        this.weight = weight;
        this.email = email;
        this.img = img;
    }

    public Patient() {
        super();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getAge() { return age; }
    public String getFirstname() { return firstname; }
    public String getName() { return name; }
    public String getWeight() { return weight; }
    public String getImg() { return img; }
    public String getEmail() { return email; }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        Patient patient = (Patient) o;
        if(patient.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), patient.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Patient{" +
                "id=" + getId() +
                ", firstname='" + getFirstname() + "'" +
                ", name='" + getName() + "'" +
                ", age='" + getAge() + "'" +
                ", weight='" + getWeight() + "'" +
                ", email='" + getEmail() + "'" +
                ", img='" + getImg() + "'" +
                "}";
    }
}