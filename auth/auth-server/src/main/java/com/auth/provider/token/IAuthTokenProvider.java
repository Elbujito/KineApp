package com.auth.provider.token;


import com.auth.model.jwt.TokenPayload;
import com.auth.model.user.User;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.JwtBuilder;


public interface IAuthTokenProvider {

    JwtBuilder setToken(JwtBuilder builder, User user, String hostname);

    TokenPayload parseToken(Jws<Claims> claims);

    User findByToken(TokenPayload token);
}
