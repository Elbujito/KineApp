package com.model.provider.connector;


import java.util.Optional;
import java.util.stream.Stream;
import com.model.AuthException;
import com.model.exception.InvalidCredentialsException;
import com.model.login.ChangePassword;
import com.model.login.LoginPassword;
import com.model.provider.roles.IAuthRolesProvider;
import com.model.user.User;


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
