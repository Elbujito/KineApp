package com.exception;


import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;
import com.model.AuthException;


@ResponseStatus(value = HttpStatus.UNAUTHORIZED, reason = "Password expired")
public class PasswordExpiredException extends AuthException {

    private static final long serialVersionUID = 803571476366380028L;
}
