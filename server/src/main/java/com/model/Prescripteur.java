package com.model.rest;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.databind.ser.std.ToStringSerializer;
import org.bson.types.ObjectId;

import java.util.Objects;

@JsonInclude(Include.NON_NULL)
public class Prescripteur {

    @JsonSerialize(using = ToStringSerializer.class)
    private ObjectId id;
    private String name;
    private String company;
    private String email;
    private String phoneNumber;

    public String getCompany() {
        return company;
    }

    public void setCompany(String company) {
        this.company = company;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
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

    public Prescripteur setId(ObjectId id) {
        this.id = id;
        return this;
    }

    @Override
    public String toString() {
        return "Prescripteur{" + "id=" + id
                + ", name='" + name +'\'' +", company='" + company + '\''
                + ", email='" + email + '\'' +", phoneNumber='" + phoneNumber + '\'' +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o)
            return true;
        if (o == null || getClass() != o.getClass())
            return false;
        Prescripteur prescripteur = (Prescripteur) o;
        return name == prescripteur.name && Objects.equals(id, prescripteur.id)
                && Objects.equals(company,prescripteur.company)
                && Objects.equals(email,prescripteur.email)
                && Objects.equals(phoneNumber,prescripteur.phoneNumber);
    }
    @Override
    public int hashCode() {
        return Objects.hash(id, name, company, email, phoneNumber);
    }
}