package com.auth.rest;


import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;


@Configuration
@ConfigurationProperties("auth")
public class AuthProperties {

    private Password password = new Password();
    private Expiration expiration = new Expiration();

    private static final String JWT_KEY_DEFAULT = "VxdWNMeU8g6TDeNBjBQACSZ5R7I0l5yzGf96BElfA7xB04WZ9gufFmzRWodLogqfM9JOZSTzoGuaBkfj7ybJbzdcUQXDr9lgKrDG4QwnkYwQAY4N7rywR1soor8w7rbk";
    private String jwtKey = JWT_KEY_DEFAULT;
    private long expirationDelay;
    private boolean certificate = true;


    public static class Password {

        private String help = "Only alphanumeric characters";
        private String rule = "[a-zA-Z0-9_ !\\-\\.@]+";
        private static final int MIN_DEFAULT = 6;
        private int min = MIN_DEFAULT;
        private static final int MAX_DEFAULT = 30;
        private int max = MAX_DEFAULT;

        public String getRule() {
            return rule;
        }

        public Password setRule(String rule) {
            this.rule = rule;
            return this;
        }

        public int getMin() {
            return min;
        }

        public Password setMin(int min) {
            this.min = min;
            return this;
        }

        public int getMax() {
            return max;
        }

        public Password setMax(int max) {
            this.max = max;
            return this;
        }

        public String getHelp() {
            return help;
        }

        public Password setHelp(String help) {
            this.help = help;
            return this;
        }
    }


    public static class Expiration {

        private static final int MINUTES_DEFAULT = 60;
        private long minutes = MINUTES_DEFAULT;

        public long getMinutes() {
            return minutes;
        }

        public Expiration setMinutes(long minutes) {
            this.minutes = minutes;
            return this;
        }
    }

    public Password getPassword() {
        return password;
    }

    public AuthProperties setPassword(Password password) {
        this.password = password;
        return this;
    }

    public Expiration getExpiration() {
        return expiration;
    }

    public AuthProperties setExpiration(Expiration expiration) {
        this.expiration = expiration;
        return this;
    }

    public String getJwtKey() {
        return jwtKey;
    }

    public AuthProperties setJwtKey(String jwtKey) {
        this.jwtKey = jwtKey;
        return this;
    }

    public long getExpirationDelay() {
        return expirationDelay;
    }

    public AuthProperties setExpirationDelay(long expirationDelay) {
        this.expirationDelay = expirationDelay;
        return this;
    }

    public boolean isCertificate() {
        return certificate;
    }

    public AuthProperties setCertificate(boolean certificate) {
        this.certificate = certificate;
        return this;
    }
}
