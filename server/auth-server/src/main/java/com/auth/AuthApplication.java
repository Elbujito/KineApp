package com.auth;

import java.security.NoSuchAlgorithmException;
import javax.crypto.NoSuchPaddingException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;

@Configuration
@SuppressWarnings("checkstyle:hideutilityclassconstructor")
@SpringBootApplication
@PropertySource("classpath:/auth.properties")
public class AuthApplication {

    public static void main(final String[] args) {
        new SpringApplication(AuthApplication.class).run(args);
    }
}

