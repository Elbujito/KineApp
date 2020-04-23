package com.auth.model.jwt;

public class Token {

    private String token;

    public Token(final String token) {
        this.token = token;
    }

    public String getToken() {
        return token;
    }

    public Token setToken(final String token) {
        this.token = token;
        return this;
    }
}
