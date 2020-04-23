package com.auth.rest;


import java.security.KeyManagementException;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.security.cert.X509Certificate;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.AbstractMap.SimpleEntry;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.Date;
import java.util.HashSet;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import javax.net.ssl.KeyManager;
import javax.net.ssl.SSLContext;
import javax.net.ssl.TrustManager;
import javax.net.ssl.X509TrustManager;
import javax.servlet.http.HttpServletRequest;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.slf4j.Marker;
import org.slf4j.MarkerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.auth.client.AuthClient;
import com.auth.common.spring.ConditionalOnArrayProperty;
import com.auth.common.spring.Tokens;
import com.auth.exception.NoSuchConnectorException;
import com.auth.exception.PasswordExpiredException;
import com.auth.exception.TokenExpiredException;
import com.auth.exception.WrongFormatException;
import com.auth.model.AuthException;
import com.auth.model.exception.InvalidCredentialsException;
import com.auth.model.jwt.Token;
import com.auth.model.jwt.TokenPayload;
import com.auth.model.login.ChangePassword;
import com.auth.model.login.LoginPassword;
import com.auth.model.provider.connector.IAuthConnectorProvider;
import com.auth.model.provider.roles.IAuthRolesProvider;
import com.auth.model.rest.Connector;
import com.auth.model.rest.Patient;
import com.auth.model.user.User;
import com.auth.provider.token.IAuthTokenProvider;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.JwtBuilder;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import static java.lang.String.format;
import static java.util.stream.Collectors.toList;
import static java.util.stream.Collectors.toMap;


@RestController
@RequestMapping("/auth")
@SuppressWarnings("PMD.ExcessiveImports")
public final class Auth implements AuthClient {

    private static final Marker PUBLIC = MarkerFactory.getMarker("PUBLIC");

    private static final Logger LOG = LoggerFactory.getLogger(Auth.class);

    private static final SignatureAlgorithm JWT_ALGORITHM = SignatureAlgorithm.HS512;

    private final Map<String, IAuthConnectorProvider> connectors;
    private final Map<String, IAuthRolesProvider> additionalRolesProviders;
    private final AuthProperties properties;
    private final IAuthTokenProvider tokenProvider;

    @SuppressWarnings("checkstyle:parameternumber")
    public Auth(AuthProperties properties, //
                IAuthTokenProvider tokenProvider, //
                List<IAuthConnectorProvider> availableConnectors, //
                Optional<List<IAuthRolesProvider>> rolesProviders, //
                @Value("#{'${auth.providers.connector:FILE}'.split('\\s*,\\s*')}") List<String> connectorsKeys, //
                @Value("#{'${auth.providers.additional.roles:}'.split('\\s*,\\s*')}") List<String> rolesProvidersKeys) {
        this.properties = properties;
        this.tokenProvider = tokenProvider;
        additionalRolesProviders = initialiseAdditionalRolesProviders(rolesProviders, rolesProvidersKeys);
        connectors = initialiseConnectors(availableConnectors, connectorsKeys);
        if (!properties.isCertificate()) {
            ignoreUnsignedCertificate();
        }
    }

    private Map<String, IAuthRolesProvider> initialiseAdditionalRolesProviders(Optional<List<IAuthRolesProvider>> rolesProviders,
                                                                               List<String> rolesProvidersKeys) {
        return rolesProviders.orElseGet(ArrayList::new).stream() //
                             .map(provider -> new SimpleEntry<>(getKey(provider.getClass()), provider)) //
                             .filter(entry -> rolesProvidersKeys.contains(entry.getKey())) //
                             .peek(entry -> LOG.info("Loading additional roles provider: {}", entry.getKey())) //
                             .collect(toMap(SimpleEntry::getKey, SimpleEntry::getValue, this::merge, LinkedHashMap::new));
    }

    private Map<String, IAuthConnectorProvider> initialiseConnectors(List<IAuthConnectorProvider> availableConnectors, List<String> connectorsKeys) {
        return availableConnectors.stream() //
                                  .map(connector -> new SimpleEntry<>(getKey(connector.getClass()), connector)) //
                                  .filter(entry -> connectorsKeys.contains(entry.getKey())) //
                                  .sorted(Comparator.comparing(entry -> connectorsKeys.indexOf(entry.getKey()))) // Keep the same order as in providersKeys
                                  .peek(entry -> LOG.info("Loading authentication connector: {}", entry.getKey())) //
                                  .collect(toMap(SimpleEntry::getKey, SimpleEntry::getValue, this::merge, LinkedHashMap::new));
    }

    private <T> T merge(T u, T v) {
        throw new IllegalStateException(format("Duplicate key %s|%s", u, v));
    }

    private String getKey(Class<?> clazz) {
        return clazz.getAnnotation(ConditionalOnArrayProperty.class).havingValue();
    }

    @Override
    @PostMapping
    public Token authenticate(@RequestBody final LoginPassword loginPassword) {
        try {
            IAuthConnectorProvider connector = getConnector(loginPassword.getConnector());
            User user = connector.authenticate(loginPassword);
            addRoles(user, connector);
            Token token = createToken(user, loginPassword.getHostname());
            LOG.info(PUBLIC, "User '{}' authentication successful: token created for connector {}", //
                     user.getLogin(), //
                     connector.getConnectorName());
            return token;
        }
        catch (Exception e) {
            LOG.error(PUBLIC, "User '{}' authentication failed: {}", //
                      loginPassword.getLogin(), //
                      e.getMessage() == null ? e.getClass().getSimpleName() : e.getMessage(), //
                      e);
            throw e;
        }
    }

    private void addRoles(User user, IAuthConnectorProvider connector) {
        connector.getRolesProvider().ifPresent(provider -> addRolesFromRolesProvider(user, provider));
        additionalRolesProviders.values().stream() //
                                .filter(
                                    provider -> !connector.getRolesProvider().isPresent() || connector.getRolesProvider().isPresent() && provider != connector
                                        .getRolesProvider().get()) //
                                .forEach(provider -> addRolesFromRolesProvider(user, provider));
    }

    private void addRolesFromRolesProvider(User user, IAuthRolesProvider provider) {
        try {
            user.getRoles().addAll(provider.getRoles(user));
        }
        catch (AuthException e) {
            LOG.warn("An error occurred while fetching roles from provider '{}'", getKey(provider.getClass()));
        }
    }

    @Override
    @PostMapping("/change")
    public Token changePassword(@RequestBody final ChangePassword changePassword) {
        try {
            validate(changePassword);
            authenticate(changePassword);
        }
        catch (PasswordExpiredException ignored) {
            // nothing to do
        }
        checkPassword(changePassword);
        IAuthConnectorProvider connector = getConnector(changePassword.getConnector());
        User user = connector.changePassword(changePassword);
        addRoles(user, connector);
        return createToken(user, changePassword.getHostname());
    }

    private void validate(ChangePassword changePassword) {
        if (!changePassword.getNewPasswordAsString().equals(changePassword.getNewPasswordConfirmationAsString())) {
            LOG.warn("Entered passwords do not match");
            throw new WrongFormatException("Entered passwords do not match");
        }
    }

    @GetMapping
    public TokenPayload checkToken(final HttpServletRequest request) throws InvalidCredentialsException {
        return checkToken(extractToken(request));
    }

    private String extractToken(final HttpServletRequest request) throws InvalidCredentialsException {
        return Tokens.extractToken(request, this).orElseThrow(() -> new InvalidCredentialsException("Missing user token or credentials"));
    }

    @Override
    public TokenPayload checkToken(final String token) {
        Jws<Claims> jws = parseClaims(token);
        return tokenProvider.parseToken(jws);
    }

    private Jws<Claims> parseClaims(String token) {
        try {
            Jws<Claims> jws = Jwts.parser() //
                                  .setSigningKey(properties.getJwtKey()) //
                                  .parseClaimsJws(token);
            LOG.trace("Token OK {}", token);
            return jws;
        }
        catch (ExpiredJwtException e) {
            LOG.warn("Expired token {}", token);
            throw new TokenExpiredException(e);
        }
        catch (Exception e) {
            LOG.warn("Invalid token {}", token);
            throw new InvalidCredentialsException(e);
        }
    }

    @Override
    public User getUser(final String token) {
        return tokenProvider.findByToken(checkToken(token));
    }

    @GetMapping("/user")
    public User getUser(final HttpServletRequest request) throws InvalidCredentialsException {
        return getUser(extractToken(request));
    }

    private void checkPassword(final ChangePassword changePassword) throws WrongFormatException {
        if (changePassword.getNewPassword().length == 0) {
            LOG.warn("New password for user '{}' is empty", changePassword.getLogin());
            throw new WrongFormatException("New password should not be empty");
        }
        AuthProperties.Password password = properties.getPassword();
        if (changePassword.getNewPassword().length < password.getMin()) {
            LOG.warn("New password for user '{}' is less than {} characters", changePassword.getLogin(), password.getMin());
            throw new WrongFormatException(format("New password should be more than %d characters", password.getMin()));
        }
        if (changePassword.getNewPassword().length > password.getMax()) {
            LOG.warn("New password for user '{}' is more than {} characters", changePassword.getLogin(), password.getMax());
            throw new WrongFormatException(format("New password should be less than %d characters", password.getMax()));
        }
        if (!changePassword.getNewPasswordAsString().matches(password.getRule())) {
            LOG.warn("New password for user '{}' does not match the right format", changePassword.getLogin());
            throw new WrongFormatException(password.getHelp());
        }
    }

    private Token createToken(final User user, String hostname) {
        JwtBuilder builder = Jwts.builder() //
                                 .setExpiration(Date.from(Instant.now().plus(properties.getExpiration().getMinutes(), ChronoUnit.MINUTES)));
        String token = tokenProvider.setToken(builder, user, hostname) //
                                    .signWith(JWT_ALGORITHM, properties.getJwtKey()) //
                                    .compact();

        return new Token(token);
    }

    private void ignoreUnsignedCertificate() {
        try {
            SSLContext context = SSLContext.getInstance("TLS");
            context.init(new KeyManager[0], new TrustManager[] {new X509TrustManager() {
                @Override
                public void checkClientTrusted(final X509Certificate[] chain, final String authType) {
                    //accept all
                }

                @Override
                public void checkServerTrusted(final X509Certificate[] chain, final String authType) {
                    //accept all
                }

                @Override
                public X509Certificate[] getAcceptedIssuers() {
                    return new X509Certificate[0];
                }
            }}, new SecureRandom());
            SSLContext.setDefault(context);
        }
        catch (NoSuchAlgorithmException | KeyManagementException e) {
            LOG.warn("Ignored exception ?", e);
        }
    }

    @Override
    @GetMapping("/connectors")
    public List<Connector> getConnectors() {
        return connectors.entrySet().stream() //
                         .map(entry -> new Connector().setId(entry.getKey()).setName(entry.getValue().getConnectorName())) //
                         .collect(toList());
    }

    @Override
    @GetMapping("/patients")
    public List<Patient> getPatients() {

        List<Patient> patients = new ArrayList() {
            {
                add(new Patient("1","Adrien Roques", "25"));
                add(new Patient("2","Rafael Cecotti", "23"));
                add(new Patient("3","Thomas Benetti", "25"));
                add(new Patient("4","Victor Chamontin", "24"));
            }};

        try {
            return patients;
        }
        catch (Exception e) {
            throw e;
        }
    }

    public IAuthConnectorProvider getConnector(String connectorId) {
        return Optional.ofNullable(connectors.get(connectorId)).orElse(connectors.values().stream().findAny().orElseThrow(NoSuchConnectorException::new));
    }

    @Override
    @GetMapping("/{role:.+}/users")
    public List<User> getUsers(@PathVariable String role) {
        return connectors.values().stream() //
                         .flatMap(provider -> provider.getUsers(role)) //
                         .distinct() //
                         .sorted(Comparator.comparing(User::getLogin)) //
                         .map(user -> user.setRoles(new HashSet<>())) //
                         .collect(toList());
    }

    @GetMapping("/refresh")
    public Token refresh(final HttpServletRequest request) throws InvalidCredentialsException {
        return refresh(extractToken(request));
    }

    public Token refresh(final String token) {
        User user = getUser(token);
        return createToken(user, user.getName());
    }
}
