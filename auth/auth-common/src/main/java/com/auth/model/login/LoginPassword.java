package com.auth.model.login;


import java.util.Arrays;


public class LoginPassword {
    private String login;
    private char[] password;
    private String connector;
    private String hostname;

    public LoginPassword() {
        super();
    }

    public LoginPassword(String login, char... password) {
        this(login, password, null);
    }

    public LoginPassword(String login, char[] password, final String connector) {
        this();
        this.login = login;
        this.password = Arrays.copyOf(password, password.length);
        this.connector = connector;
    }

    @Override
    public String toString() {
        return String.format("LoginPassword{login='%s'}", login);
    }

    public String getLogin() {
        return login;
    }

    public LoginPassword setLogin(String login) {
        this.login = login;
        return this;
    }

    public char[] getPassword() {
        return Arrays.copyOf(password, password.length);
    }

    public String getPasswordAsString() {
        return new String(password);
    }

    public LoginPassword setPassword(char... password) {
        this.password = Arrays.copyOf(password, password.length);
        return this;
    }

    public String getConnector() {
        return connector;
    }

    public LoginPassword setConnector(String connector) {
        this.connector = connector;
        return this;
    }

    public String getHostname() {
        return hostname;
    }

    public LoginPassword setHostname(String hostname) {
        this.hostname = hostname;
        return this;
    }

}
