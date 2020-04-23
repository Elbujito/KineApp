package com.auth.exception;


import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;
import com.auth.model.AuthException;


@ResponseStatus(value = HttpStatus.NOT_FOUND, reason = "Resource not found")
public class ResourceNotFoundException extends AuthException {

    private static final long serialVersionUID = 166352089556767512L;

    public ResourceNotFoundException() {
        super();
    }
}