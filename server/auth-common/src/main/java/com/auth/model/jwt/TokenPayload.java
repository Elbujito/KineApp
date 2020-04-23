package com.auth.model.jwt;


import java.util.HashSet;
import java.util.Set;


public class TokenPayload {

    private String login;
    private String name;
    private String email;
    private Set<String> roles = new HashSet<>();
    private String hostname;

    public String getLogin() {
        return login;
    }

    public TokenPayload setLogin(final String login) {
        this.login = login;
        return this;
    }

    public String getName() {
        return name;
    }

    public TokenPayload setName(final String name) {
        this.name = name;
        return this;
    }

    public String getEmail() {
        return email;
    }

    public TokenPayload setEmail(final String email) {
        this.email = email;
        return this;
    }

    public Set<String> getRoles() {
        return roles;
    }

    public TokenPayload setRoles(final Set<String> roles) {
        this.roles = roles;
        return this;
    }

    public String getHostname() {
        return hostname;
    }

    public TokenPayload setHostname(final String hostname) {
        this.hostname = hostname;
        return this;
    }

    @Override
    public String toString() {
        return String.format("TokenPayload{login='%s', name='%s', email='%s', roles='%s', hostname='%s'}", //
                             login, //
                             name, //
                             email, //
                             roles, //
                             hostname);
    }
}
