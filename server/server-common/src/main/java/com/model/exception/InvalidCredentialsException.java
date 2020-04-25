package com.model.exception;


import com.model.AuthException;


public class InvalidCredentialsException extends AuthException {
    private static final long serialVersionUID = 8047720459246021657L;

    public InvalidCredentialsException() {
        super();
    }

    public InvalidCredentialsException(Exception cause) {
        super(cause);
    }

    public InvalidCredentialsException(String message) {
        super(message);
    }
}
