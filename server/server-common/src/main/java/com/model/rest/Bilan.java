package com.model.rest;

public class Bilan {
    public String id;
    public String title;
    public String date;
    public String description;
    public Bilan() {}
    public Bilan(String id, String title, String date, String description) {
        this.id =id;
        this.title = title;
        this.date = date;
        this.description = description;
    }
    public void setId(String id) { this.id = id; }
    public String getId() { return this.id; }
    public void setTitle(String title) { this.title = title; }
    public String getTitle() { return title; }
    public void setDate(String date) { this.date = date; }
    public String getDate() { return date; }
    public void setDescription(String description) { this.description = description; }
    public String getDescription() { return description; }
}