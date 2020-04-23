package com.auth.exception;


import java.io.IOException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.ServletWebRequest;
import com.auth.model.exception.InvalidCredentialsException;


@ControllerAdvice
public class AuthExceptionHandler {

    @ExceptionHandler(WrongFormatException.class)
    public void handleWrongFormat(ServletWebRequest req, WrongFormatException e) throws IOException {
        req.getResponse().sendError(HttpStatus.BAD_REQUEST.value(), e.getMessage());
    }

    @ExceptionHandler(InvalidCredentialsException.class)
    public void handleInvalidCredentials(ServletWebRequest req, InvalidCredentialsException e) throws IOException {
        req.getResponse().sendError(HttpStatus.UNAUTHORIZED.value(), e.getMessage() == null ? "Invalid login or password" : e.getMessage());
    }
}
