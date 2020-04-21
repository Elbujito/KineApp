package com.auth.exception;


import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;
import com.auth.model.AuthException;


@ResponseStatus(value = HttpStatus.UNAUTHORIZED, reason = "Token expired")
public class TokenExpiredException extends AuthException {
    private static final long serialVersionUID = -6490046589891306103L;

    public TokenExpiredException() {
        super();
    }

    public TokenExpiredException(Exception cause) {
        super(cause);
    }

}
