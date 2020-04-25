package com.model.user;

import java.util.HashSet;
import java.util.Objects;
import java.util.Set;


public class User {

    private String id;
    private String login;
    private String name;
    private String email;
    private String img;
    private Set<String> roles = new HashSet<>();

    public String getId() {
        return id;
    }

    public User setId(final String id) {
        this.id = id;
        return this;
    }

    public String getLogin() {
        return login;
    }

    public User setLogin(final String login) {
        this.login = login;
        return this;
    }

    public String getEmail() {
        return email;
    }

    public User setEmail(final String email) {
        this.email = email;
        return this;
    }

    @Override
    public boolean equals(final Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof User)) {
            return false;
        }
        final User user = (User) o;
        return Objects.equals(login, user.login);
    }

    @Override
    public int hashCode() {
        return login.hashCode();
    }

    public User setName(final String name) {
        this.name = name;
        return this;
    }

    public String getName() {
        return name;
    }

    public Set<String> getRoles() {
        return roles;
    }

    public User setRoles(final Set<String> roles) {
        this.roles = roles;
        return this;
    }

    public String getImg() {
        return img;
    }

    public User setImg(final String img) {
        this.img = img;
        return this;
    }
}
