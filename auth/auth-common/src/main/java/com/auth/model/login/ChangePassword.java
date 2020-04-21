package com.auth.model.login;


import java.util.Arrays;


public class ChangePassword extends LoginPassword {

    private char[] newPassword;
    private char[] newPasswordConfirmation;

    public ChangePassword() {
        super();
    }

    public ChangePassword(String login, char[] password, char[] newPassword, char[] newPasswordConfirmation) {
        super(login, password);
        this.newPassword = Arrays.copyOf(newPassword, newPassword.length);
        this.newPasswordConfirmation = Arrays.copyOf(newPassword, newPasswordConfirmation.length);
    }

    public char[] getNewPassword() {
        return Arrays.copyOf(newPassword, newPassword.length);
    }

    public ChangePassword setNewPassword(char... newPassword) {
        this.newPassword = Arrays.copyOf(newPassword, newPassword.length);
        return this;
    }

    public char[] getNewPasswordConfirmation() {
        return Arrays.copyOf(newPasswordConfirmation, newPasswordConfirmation.length);
    }

    public ChangePassword setNewPasswordConfirmation(char... newPasswordConfirmation) {
        this.newPasswordConfirmation = Arrays.copyOf(newPasswordConfirmation, newPasswordConfirmation.length);
        return this;
    }

    public String getNewPasswordAsString() {
        return new String(newPassword);
    }

    public String getNewPasswordConfirmationAsString() {
        return new String(newPasswordConfirmation);
    }

}
