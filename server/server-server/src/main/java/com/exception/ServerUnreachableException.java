package com.exception;


import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;
import com.model.AuthException;


@ResponseStatus(value = HttpStatus.BAD_REQUEST, reason = "Server unreachable")
public class ServerUnreachableException extends AuthException {

    private static final long serialVersionUID = -2622413071304133350L;

    public ServerUnreachableException() {
        super();
    }
}
