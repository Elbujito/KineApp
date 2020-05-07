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
import com.model.Muscle;
import com.repository.MuscleRepository;
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
public class MongoDBMuscleRepository implements MuscleRepository {

    private static final TransactionOptions txnOptions = TransactionOptions.builder()
            .readPreference(ReadPreference.primary())
            .readConcern(ReadConcern.MAJORITY)
            .writeConcern(WriteConcern.MAJORITY)
            .build();
    @Autowired
    private MongoClient client;
    private MongoCollection<Muscle> muscleCollection;

    @PostConstruct
    void init() {
        muscleCollection = client.getDatabase("medinotes").getCollection("muscles", Muscle.class);
    }

    @Override
    public Muscle save(Muscle muscle) {
        muscle.setId(new ObjectId());
        muscleCollection.insertOne(muscle);
        return muscle;
    }

    @Override
    public List<Muscle> saveAll(List<Muscle> muscles) {
        try (ClientSession clientSession = client.startSession()) {
            return clientSession.withTransaction(() -> {
                muscles.forEach(p -> p.setId(new ObjectId()));
                muscleCollection.insertMany(clientSession, muscles);
                return muscles;
            }, txnOptions);
        }
    }

    @Override
    public List<Muscle> findAll() {
        return muscleCollection.find().into(new ArrayList<>());
    }

    @Override
    public List<Muscle> findAll(List<String> ids) {
        return muscleCollection.find(in("_id", mapToObjectIds(ids))).into(new ArrayList<>());
    }

    @Override
    public Muscle findOne(String id) {
        return muscleCollection.find(eq("_id", new ObjectId(id))).first();
    }

    @Override
    public long count() {
        return muscleCollection.countDocuments();
    }

    @Override
    public long delete(String id) {
        return muscleCollection.deleteOne(eq("_id", new ObjectId(id))).getDeletedCount();
    }

    @Override
    public long delete(List<String> ids) {
        try (ClientSession clientSession = client.startSession()) {
            return clientSession.withTransaction(
                    () -> muscleCollection.deleteMany(clientSession, in("_id", mapToObjectIds(ids))).getDeletedCount(),
                    txnOptions);
        }
    }

    @Override
    public long deleteAll() {
        try (ClientSession clientSession = client.startSession()) {
            return clientSession.withTransaction(
                    () -> muscleCollection.deleteMany(clientSession, new BsonDocument()).getDeletedCount(), txnOptions);
        }
    }

    @Override
    public Muscle update(Muscle muscle) {
        FindOneAndReplaceOptions options = new FindOneAndReplaceOptions().returnDocument(AFTER);
        return muscleCollection.findOneAndReplace(eq("_id", muscle.getId()), muscle, options);
    }

    @Override
    public long update(List<Muscle> muscles) {
        List<WriteModel<Muscle>> writes = muscles.stream()
                .map(p -> new ReplaceOneModel<>(eq("_id", p.getId()), p))
                .collect(Collectors.toList());
        try (ClientSession clientSession = client.startSession()) {
            return clientSession.withTransaction(
                    () -> muscleCollection.bulkWrite(clientSession, writes).getModifiedCount(), txnOptions);
        }
    }

    private List<ObjectId> mapToObjectIds(List<String> ids) {
        return ids.stream().map(ObjectId::new).collect(Collectors.toList());
    }
}
