package com.model;


public class AuthException extends RuntimeException {

    private static final long serialVersionUID = 4760282276998975651L;

    public AuthException() {
        super();
    }

    public AuthException(String message) {
        super(message);
    }

    public AuthException(Exception cause) {
        super(cause);
    }
}
