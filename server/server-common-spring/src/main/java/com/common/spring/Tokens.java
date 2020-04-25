package com.common.spring;


import java.nio.charset.StandardCharsets;
import java.util.Objects;
import java.util.Optional;
import javax.servlet.http.HttpServletRequest;
import org.springframework.http.HttpHeaders;
import org.springframework.util.Base64Utils;
import com.client.AuthClient;
import com.model.login.LoginPassword;
import static java.util.stream.Stream.concat;
import static java.util.stream.Stream.of;


public final class Tokens {

    private static final String X_AUTHORIZATION = "X-Authorization";
    private static final String BASIC_AUTH_PREFIX = "Basic ";
    private static final String BEARER_AUTH_PREFIX = "Bearer ";

    private Tokens() {
    }

    public static Optional<String> extractToken(HttpServletRequest request, AuthClient client) {
        return concat(of(HttpHeaders.AUTHORIZATION, X_AUTHORIZATION).map(request::getHeader), //
            of(request.getParameter("token"))) //
            .filter(Objects::nonNull) //
            .filter(string -> !string.chars().allMatch(Character::isWhitespace)) //
            .map(header -> getToken(header, client)) //
            .findFirst();
    }

    private static String getToken(String header, AuthClient client) {
        return header.startsWith(BASIC_AUTH_PREFIX) ? client.authenticate(getBasicLoginPassword(header)).getToken() : formatHeader(header);
    }

    private static LoginPassword getBasicLoginPassword(String header) {
        String encoded = header.replace(BASIC_AUTH_PREFIX, "");
        String[] loginPassword = new String(Base64Utils.decodeFromString(encoded), StandardCharsets.ISO_8859_1).split(":");
        return new LoginPassword() //
            .setLogin(loginPassword[0]) //
            .setPassword(loginPassword[1].toCharArray());
    }

    private static String formatHeader(String header) {
        return header.replace(BEARER_AUTH_PREFIX, "").trim();
    }
}
