package com.model.rest;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.databind.ser.std.ToStringSerializer;
import org.bson.types.ObjectId;

import java.util.Date;
import java.util.List;
import java.util.Objects;

@JsonInclude(Include.NON_NULL)
public class Patient {

    @JsonSerialize(using = ToStringSerializer.class)
    private ObjectId id;
    private String firstName;
    private String lastName;
    private int age;
    private Address address;
    private String email;
    private Date createdAt = new Date();
    private Boolean active;
    private List<Pathology> pathologies;

    public ObjectId getId() {
        return id;
    }

    public Patient setId(ObjectId id) {
        this.id = id;
        return this;
    }

    public String getFirstName() {
        return firstName;
    }

    public Patient setFirstName(String firstName) {
        this.firstName = firstName;
        return this;
    }

    public String getLastName() {
        return lastName;
    }

    public Patient setLastName(String lastName) {
        this.lastName = lastName;
        return this;
    }

    public int getAge() {
        return age;
    }

    public Patient setAge(int age) {
        this.age = age;
        return this;
    }

    public Address getAddress() {
        return address;
    }

    public Patient setAddress(Address address) {
        this.address = address;
        return this;
    }

    public Date getCreatedAt() {
        return createdAt;
    }

    public Patient setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
        return this;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getDisplayedName() {
        return this.firstName + ' ' + this.lastName;
    }

    public Boolean getActive() {
        return active;
    }

    public Patient setActive(Boolean active) {
        this.active = active;
        return this;
    }

    public List<Pathology> getPathologies() {
        return pathologies;
    }

    public Patient setPathologies(List<Pathology> pathologies) {
        this.pathologies = pathologies;
        return this;
    }

    @Override
    public String toString() {
        return "Patient{" + "id=" + id + ", firstName='" + '\'' + firstName + ", lastName='" + lastName + '\'' + ", age=" + age
                + ", address=" + address + ", email='" + email + '\'' + ", createdAt=" + createdAt
                + ", active=" + active + ", pathologies=" + pathologies + '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o)
            return true;
        if (o == null || getClass() != o.getClass())
            return false;
        Patient patient = (Patient) o;
        return age == patient.age && Objects.equals(id, patient.id)
                && Objects.equals(firstName,patient.firstName) && Objects.equals(lastName, patient.lastName)
                && Objects.equals(address, patient.address) && Objects.equals(email, patient.email)
                && Objects.equals(createdAt, patient.createdAt) && Objects.equals(active, patient.active)
                && Objects.equals(pathologies, patient.pathologies);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, firstName, lastName, age, address, email, createdAt, active, pathologies);
    }

}