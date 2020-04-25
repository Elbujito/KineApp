package com.provider.connector.file;


import java.util.HashSet;
import java.util.Set;
import com.model.login.LoginPassword;
import com.model.user.User;


public class FileUser {

    private String login;
    private String password;
    private String name;
    private String email;
    private String img;
    private Set<String> roles = new HashSet<>();

    public String getLogin() {
        return login;
    }

    public FileUser setLogin(final String login) {
        this.login = login;
        return this;
    }

    public String getPassword() {
        return password;
    }

    public FileUser setPassword(final String password) {
        this.password = password;
        return this;
    }

    public String getName() {
        return name;
    }

    public FileUser setName(final String name) {
        this.name = name;
        return this;
    }

    public String getEmail() {
        return email;
    }

    public FileUser setEmail(final String email) {
        this.email = email;
        return this;
    }

    public String getImg() {
        return img;
    }

    public FileUser setImg(final String img) {
        this.img = img;
        return this;
    }

    public Set<String> getRoles() {
        return roles;
    }

    public FileUser setRoles(Set<String> roles) {
        this.roles = roles;
        return this;
    }

    public User toUser() {
        return new User().setLogin(getLogin()) //
                         .setName(getName()) //
                         .setEmail(getEmail()) //
                         .setRoles(getRoles())
                         .setImg(getImg());
    }

    public boolean matches(LoginPassword loginPassword) {
        return getLogin().equals(loginPassword.getLogin()) //
               && getPassword().equals(loginPassword.getPasswordAsString());
    }
}
