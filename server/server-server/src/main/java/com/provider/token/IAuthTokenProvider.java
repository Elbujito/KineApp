package com.provider.token;


import com.model.jwt.TokenPayload;
import com.model.user.User;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.JwtBuilder;


public interface IAuthTokenProvider {

    JwtBuilder setToken(JwtBuilder builder, User user, String hostname);

    TokenPayload parseToken(Jws<Claims> claims);

    User findByToken(TokenPayload token);
}
