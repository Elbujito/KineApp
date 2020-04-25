package com.exception;


import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;
import com.model.AuthException;


@ResponseStatus(value = HttpStatus.SERVICE_UNAVAILABLE, reason = "Unknown connector")
public class NoSuchConnectorException extends AuthException {

    private static final long serialVersionUID = 7378369393114584591L;

    public NoSuchConnectorException() {
        super();
    }

    public NoSuchConnectorException(Exception cause) {
        super(cause);
    }

}
