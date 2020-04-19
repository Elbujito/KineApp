package com.application.medinotes.repositories;

import com.application.medinotes.models.Clients;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ClientsRepository extends MongoRepository<Clients, String> {
    Clients findBy_id(ObjectId _id);
}