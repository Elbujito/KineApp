package com.client;


import java.util.List;
import com.model.jwt.Token;
import com.model.jwt.TokenPayload;
import com.model.login.ChangePassword;
import com.model.login.LoginPassword;
import com.model.rest.Connector;
import com.model.user.User;
import feign.Headers;
import feign.Param;
import feign.RequestLine;


@Headers("Content-type: application/json;charset=UTF-8")
public interface AuthClient {

    String AUTHORIZATION = "Authorization";
    String USER = "X-User";
    String ROLES = "X-Roles";

    @RequestLine("POST /")
    Token authenticate(LoginPassword loginPassword);

    @RequestLine("POST /password")
    Token changePassword(ChangePassword changePassword);

    @RequestLine("GET /")
    @Headers(AUTHORIZATION + ": {token}")
    TokenPayload checkToken(@Param("token") String token);

    @RequestLine("GET /user")
    @Headers(AUTHORIZATION + ": {token}")
    User getUser(@Param("token") String token);

    @RequestLine("GET /refresh")
    @Headers(AUTHORIZATION + ": {token}")
    Token refresh(@Param("token") String token);

    @RequestLine("GET /{role}/users")
    List<User> getUsers(@Param("role") String role);

    @RequestLine("GET /connectors")
    List<Connector> getConnectors();
}
