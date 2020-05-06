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
import com.model.rest.Mouvement;
import com.repository.MouvementRepository;
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
public class MongoDBMouvementRepository implements MouvementRepository {

    private static final TransactionOptions txnOptions = TransactionOptions.builder()
            .readPreference(ReadPreference.primary())
            .readConcern(ReadConcern.MAJORITY)
            .writeConcern(WriteConcern.MAJORITY)
            .build();
    @Autowired
    private MongoClient client;
    private MongoCollection<Mouvement> mouvementCollection;

    @PostConstruct
    void init() {
        mouvementCollection = client.getDatabase("medinotes").getCollection("mouvements", Mouvement.class);
    }

    @Override
    public Mouvement save(Mouvement mouvement) {
        mouvement.setId(new ObjectId());
        mouvementCollection.insertOne(mouvement);
        return mouvement;
    }

    @Override
    public List<Mouvement> saveAll(List<Mouvement> mouvements) {
        try (ClientSession clientSession = client.startSession()) {
            return clientSession.withTransaction(() -> {
                mouvements.forEach(p -> p.setId(new ObjectId()));
                mouvementCollection.insertMany(clientSession, mouvements);
                return mouvements;
            }, txnOptions);
        }
    }

    @Override
    public List<Mouvement> findAll() {
        return mouvementCollection.find().into(new ArrayList<>());
    }

    @Override
    public List<Mouvement> findAll(List<String> ids) {
        return mouvementCollection.find(in("_id", mapToObjectIds(ids))).into(new ArrayList<>());
    }

    @Override
    public Mouvement findOne(String id) {
        return mouvementCollection.find(eq("_id", new ObjectId(id))).first();
    }

    @Override
    public long count() {
        return mouvementCollection.countDocuments();
    }

    @Override
    public long delete(String id) {
        return mouvementCollection.deleteOne(eq("_id", new ObjectId(id))).getDeletedCount();
    }

    @Override
    public long delete(List<String> ids) {
        try (ClientSession clientSession = client.startSession()) {
            return clientSession.withTransaction(
                    () -> mouvementCollection.deleteMany(clientSession, in("_id", mapToObjectIds(ids))).getDeletedCount(),
                    txnOptions);
        }
    }

    @Override
    public long deleteAll() {
        try (ClientSession clientSession = client.startSession()) {
            return clientSession.withTransaction(
                    () -> mouvementCollection.deleteMany(clientSession, new BsonDocument()).getDeletedCount(), txnOptions);
        }
    }

    @Override
    public Mouvement update(Mouvement mouvement) {
        FindOneAndReplaceOptions options = new FindOneAndReplaceOptions().returnDocument(AFTER);
        return mouvementCollection.findOneAndReplace(eq("_id", mouvement.getId()), mouvement, options);
    }

    @Override
    public long update(List<Mouvement> mouvements) {
        List<WriteModel<Mouvement>> writes = mouvements.stream()
                .map(p -> new ReplaceOneModel<>(eq("_id", p.getId()), p))
                .collect(Collectors.toList());
        try (ClientSession clientSession = client.startSession()) {
            return clientSession.withTransaction(
                    () -> mouvementCollection.bulkWrite(clientSession, writes).getModifiedCount(), txnOptions);
        }
    }

    private List<ObjectId> mapToObjectIds(List<String> ids) {
        return ids.stream().map(ObjectId::new).collect(Collectors.toList());
    }
}
