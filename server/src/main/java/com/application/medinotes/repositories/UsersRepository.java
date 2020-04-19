package com.application.medinotes.repositories;

import com.application.medinotes.models.Users;
import org.springframework.data.mongodb.repository.MongoRepository;
public interface UsersRepository extends MongoRepository<Users, String> {
    Users findByUsername(String username);
}