package com.auth.provider.connector.file;


import java.io.BufferedReader;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Stream;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import com.auth.common.spring.ConditionalOnArrayProperty;
import com.auth.model.AuthException;
import com.auth.model.exception.InvalidCredentialsException;
import com.auth.model.login.ChangePassword;
import com.auth.model.login.LoginPassword;
import com.auth.model.provider.connector.IAuthConnectorProvider;
import com.auth.model.provider.roles.IAuthRolesProvider;
import com.auth.model.user.User;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;


@ConditionalOnArrayProperty(properties = "auth.providers.connector", havingValue = "FILE", matchIfMissing = true)
@Component
public class FileAuthConnectorProvider implements IAuthConnectorProvider {

    private static final TypeReference<List<FileUser>> USER_LIST_TYPE = new TypeReference<List<FileUser>>() {};
    private static final Logger LOG = LoggerFactory.getLogger(FileAuthConnectorProvider.class);
    private final List<FileUser> users = new ArrayList<>();

    @Autowired
    public FileAuthConnectorProvider(ObjectMapper mapper, @Value("${auth.file.path:src/main/resources/users.json}") String filePath) {
        try (BufferedReader bufferedReader = Files.newBufferedReader(Paths.get(filePath))) {
            users.addAll(mapper.readValue(bufferedReader, USER_LIST_TYPE));
        }
        catch (IOException e) {
            LOG.warn(e.getMessage(), e);
        }
    }

    @Override
    public User authenticate(final LoginPassword loginPassword) throws AuthException {
        return users.stream() //
                    .filter(fileUser -> fileUser.matches(loginPassword)) //
                    .findFirst() //
                    .map(FileUser::toUser) //
                    .orElseThrow(InvalidCredentialsException::new);
    }

    @Override
    public User changePassword(final ChangePassword changePassword) throws AuthException {
        users.stream() //
             .filter(fileUser -> fileUser.matches(changePassword)) //
             .findFirst() //
             .orElseThrow(InvalidCredentialsException::new) //
             .setPassword(changePassword.getNewPasswordAsString());
        changePassword.setPassword(changePassword.getNewPassword());
        return authenticate(changePassword);
    }

    @Override
    public Optional<User> findByLogin(final String login) {
        return users.stream() //
                    .filter(user -> login.equals(user.getLogin())) //
                    .map(FileUser::toUser) //
                    .findFirst();
    }

    @Override
    public Stream<User> getUsers(final String role) {
        return users.stream() //
                    .filter(user -> user.getRoles().contains(role)) //
                    .map(FileUser::toUser);
    }

    @Override
    public String getConnectorName() {
        return "Local";
    }

    @Override
    public Optional<IAuthRolesProvider> getRolesProvider() {
        return Optional.empty();
    }

}
