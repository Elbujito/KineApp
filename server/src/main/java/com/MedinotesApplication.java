package com;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;

@Configuration
@SuppressWarnings("checkstyle:hideutilityclassconstructor")
@SpringBootApplication
@PropertySource("classpath:/application.properties")
public class MedinotesApplication {

    public static void main(final String[] args) {
        new SpringApplication(MedinotesApplication.class).run(args);
    }
}

