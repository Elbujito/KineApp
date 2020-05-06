package com.mongo;

import com.mongodb.ReadConcern;
import com.mongodb.ReadPreference;
import com.mongodb.TransactionOptions;
import com.mongodb.WriteConcern;
import com.mongodb.client.ClientSession;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.model.FindOneAndReplaceOptions;
import com.mongodb.client.model.ReplaceOneModel;
import com.mongodb.client.model.WriteModel;
import com.model.Localisation;
import com.repository.LocalisationRepository;
import org.bson.BsonDocument;
import org.bson.BsonNull;
import org.bson.conversions.Bson;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import javax.annotation.PostConstruct;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import static com.mongodb.client.model.Accumulators.avg;
import static com.mongodb.client.model.Aggregates.group;
import static com.mongodb.client.model.Aggregates.project;
import static com.mongodb.client.model.Filters.eq;
import static com.mongodb.client.model.Filters.in;
import static com.mongodb.client.model.Projections.excludeId;
import static com.mongodb.client.model.ReturnDocument.AFTER;
import static java.util.Arrays.asList;

@Repository
public class MongoDBLocalisationRepository implements LocalisationRepository {

    private static final TransactionOptions txnOptions = TransactionOptions.builder()
            .readPreference(ReadPreference.primary())
            .readConcern(ReadConcern.MAJORITY)
            .writeConcern(WriteConcern.MAJORITY)
            .build();
    @Autowired
    private MongoClient client;
    private MongoCollection<Localisation> localisationCollection;

    @PostConstruct
    void init() {
        localisationCollection = client.getDatabase("medinotes").getCollection("localisations", Localisation.class);
    }

    @Override
    public Localisation save(Localisation localisation) {
        localisation.setId(new ObjectId());
        localisationCollection.insertOne(localisation);
        return localisation;
    }

    @Override
    public List<Localisation> saveAll(List<Localisation> localisations) {
        try (ClientSession clientSession = client.startSession()) {
            return clientSession.withTransaction(() -> {
                localisations.forEach(p -> p.setId(new ObjectId()));
                localisationCollection.insertMany(clientSession, localisations);
                return localisations;
            }, txnOptions);
        }
    }

    @Override
    public List<Localisation> findAll() {
        return localisationCollection.find().into(new ArrayList<>());
    }

    @Override
    public List<Localisation> findAll(List<String> ids) {
        return localisationCollection.find(in("_id", mapToObjectIds(ids))).into(new ArrayList<>());
    }

    @Override
    public Localisation findOne(String id) {
        return localisationCollection.find(eq("_id", new ObjectId(id))).first();
    }

    @Override
    public long count() {
        return localisationCollection.countDocuments();
    }

    @Override
    public long delete(String id) {
        return localisationCollection.deleteOne(eq("_id", new ObjectId(id))).getDeletedCount();
    }

    @Override
    public long delete(List<String> ids) {
        try (ClientSession clientSession = client.startSession()) {
            return clientSession.withTransaction(
                    () -> localisationCollection.deleteMany(clientSession, in("_id", mapToObjectIds(ids))).getDeletedCount(),
                    txnOptions);
        }
    }

    @Override
    public long deleteAll() {
        try (ClientSession clientSession = client.startSession()) {
            return clientSession.withTransaction(
                    () -> localisationCollection.deleteMany(clientSession, new BsonDocument()).getDeletedCount(), txnOptions);
        }
    }

    @Override
    public Localisation update(Localisation localisation) {
        FindOneAndReplaceOptions options = new FindOneAndReplaceOptions().returnDocument(AFTER);
        return localisationCollection.findOneAndReplace(eq("_id", localisation.getId()), localisation, options);
    }

    @Override
    public long update(List<Localisation> localisations) {
        List<WriteModel<Localisation>> writes = localisations.stream()
                .map(p -> new ReplaceOneModel<>(eq("_id", p.getId()), p))
                .collect(Collectors.toList());
        try (ClientSession clientSession = client.startSession()) {
            return clientSession.withTransaction(
                    () -> localisationCollection.bulkWrite(clientSession, writes).getModifiedCount(), txnOptions);
        }
    }

    private List<ObjectId> mapToObjectIds(List<String> ids) {
        return ids.stream().map(ObjectId::new).collect(Collectors.toList());
    }
}
