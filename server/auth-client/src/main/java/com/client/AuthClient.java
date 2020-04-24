package com.auth.client;


import java.util.List;
import com.auth.model.jwt.Token;
import com.auth.model.jwt.TokenPayload;
import com.auth.model.login.ChangePassword;
import com.auth.model.login.LoginPassword;
import com.auth.model.rest.Connector;
import com.auth.model.rest.Patient;
import com.auth.model.rest.Bilan;
import com.auth.model.user.User;
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

    @RequestLine("GET /patients")
    List<Patient> getPatients();

    @RequestLine("GET /bilans")
    List<Bilan> getBilans();

    @RequestLine("GET /bilans/{id}")
    List<Bilan> getBilansByPatientId(@Param("id") String id);
}
