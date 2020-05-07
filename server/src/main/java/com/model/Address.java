package com.model;

import java.util.Objects;

public class Address {
    private int streetNumber;
    private String street;
    private String postcode;
    private String city;
    private String country;

    public Address() {
    }

    public int getStreetNumber() {
        return streetNumber;
    }

    public Address setStreetNumber(int streetNumber) {
        this.streetNumber = streetNumber;
        return this;
    }

    public String getStreet() {
        return street;
    }

    public Address setStreet(String street) {
        this.street = street;
        return this;
    }

    public String getPostcode() {
        return postcode;
    }

    public Address setPostcode(String postcode) {
        this.postcode = postcode;
        return this;
    }

    public String getCity() {
        return city;
    }

    public Address setCity(String city) {
        this.city = city;
        return this;
    }

    public String getCountry() {
        return country;
    }

    public Address setCountry(String country) {
        this.country = country;
        return this;
    }

    @Override
    public String toString() {
        return "Address{" + "streetNumber=" + streetNumber + ", street='" + street + '\'' + ", postcode='" + postcode + '\'' + ", city='" + city + '\'' + ", country='" + country + '\'' + '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o)
            return true;
        if (o == null || getClass() != o.getClass())
            return false;
        Address address = (Address) o;
        return streetNumber == address.streetNumber && Objects.equals(street, address.street) && Objects.equals(postcode,
                                                                                                    address.postcode) && Objects
                .equals(city, address.city) && Objects.equals(country, address.country);
    }

    @Override
    public int hashCode() {
        return Objects.hash(streetNumber, street, postcode, city, country);
    }
}
