package com.auth.model.provider.connector;


import java.util.Optional;
import java.util.stream.Stream;
import com.auth.model.AuthException;
import com.auth.model.exception.InvalidCredentialsException;
import com.auth.model.login.ChangePassword;
import com.auth.model.login.LoginPassword;
import com.auth.model.provider.roles.IAuthRolesProvider;
import com.auth.model.user.User;


public interface IAuthConnectorProvider {

    String getConnectorName();

    User authenticate(LoginPassword loginPassword) throws AuthException;

    User changePassword(ChangePassword changePassword) throws AuthException;

    Optional<User> findByLogin(String login);

    Optional<IAuthRolesProvider> getRolesProvider();

    static String checkIsNotEmpty(String value) {
        if (value == null || value.isEmpty()) {
            throw new InvalidCredentialsException();
        }
        else {
            return value;
        }
    }

    Stream<User> getUsers(String role);
}
