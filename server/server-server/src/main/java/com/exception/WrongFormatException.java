package com.exception;


import com.model.AuthException;


public class WrongFormatException extends AuthException {

    private static final long serialVersionUID = -5019432334098841422L;

    public WrongFormatException(final String message) {
        super(message);
    }
}
