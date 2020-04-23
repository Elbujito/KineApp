package com.auth.provider.token.simple;


import java.util.HashSet;
import java.util.List;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.stereotype.Component;
import com.auth.model.jwt.TokenPayload;
import com.auth.model.user.User;
import com.auth.provider.token.IAuthTokenProvider;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.JwtBuilder;


@ConditionalOnProperty(name = "auth.providers.token", havingValue = "SIMPLE", matchIfMissing = true)
@Component
public class SimpleTokenProvider implements IAuthTokenProvider {

    private static final String CLAIM_NAME = "name";
    private static final String CLAIM_EMAIL = "email";
    private static final String CLAIM_ROLES = "roles";
    private static final String CLAIM_HOSTNAME = "hostname";

    @Override
    public JwtBuilder setToken(final JwtBuilder builder, final User user, final String hostname) {
        return builder //
                       .setSubject(user.getLogin()) //
                       .claim(CLAIM_NAME, user.getName()) //
                       .claim(CLAIM_EMAIL, user.getEmail()) //
                       .claim(CLAIM_ROLES, user.getRoles()) //
                       .claim(CLAIM_HOSTNAME, hostname);
    }

    @Override
    @SuppressWarnings("unchecked")
    public TokenPayload parseToken(final Jws<Claims> claims) {
        return new TokenPayload() //
                                  .setLogin(claims.getBody().getSubject()) //
                                  .setName(claims.getBody().get(CLAIM_NAME, String.class)) //
                                  .setEmail(claims.getBody().get(CLAIM_EMAIL, String.class)) //
                                  .setRoles(new HashSet<>((List<String>) claims.getBody().get(CLAIM_ROLES))) //
                                  .setHostname(claims.getBody().get(CLAIM_HOSTNAME, String.class));
    }

    @Override
    public User findByToken(final TokenPayload tokenPayload) {
        return new User() //
                          .setLogin(tokenPayload.getLogin()) //
                          .setName(tokenPayload.getName()) //
                          .setEmail(tokenPayload.getEmail()) //
                          .setRoles(tokenPayload.getRoles());
    }

}
