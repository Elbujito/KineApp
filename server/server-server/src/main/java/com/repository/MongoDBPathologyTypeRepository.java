package com.repository;

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
import com.model.dtos.AverageAgeDTO;
import com.model.rest.PathologyType;
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
public class MongoDBPathologyTypeRepository implements PathologyTypeRepository {

    private static final TransactionOptions txnOptions = TransactionOptions.builder()
            .readPreference(ReadPreference.primary())
            .readConcern(ReadConcern.MAJORITY)
            .writeConcern(WriteConcern.MAJORITY)
            .build();
    @Autowired
    private MongoClient client;
    private MongoCollection<PathologyType> pathologyTypeCollection;

    @PostConstruct
    void init() {
        pathologyTypeCollection = client.getDatabase("medinotes").getCollection("pathologyTypes", PathologyType.class);
    }

    @Override
    public PathologyType save(PathologyType pathologyType) {
        pathologyType.setId(new ObjectId());
        pathologyTypeCollection.insertOne(pathologyType);
        return pathologyType;
    }

    @Override
    public List<PathologyType> saveAll(List<PathologyType> pathologyTypes) {
        try (ClientSession clientSession = client.startSession()) {
            return clientSession.withTransaction(() -> {
                pathologyTypes.forEach(p -> p.setId(new ObjectId()));
                pathologyTypeCollection.insertMany(clientSession, pathologyTypes);
                return pathologyTypes;
            }, txnOptions);
        }
    }

    @Override
    public List<PathologyType> findAll() {
        return pathologyTypeCollection.find().into(new ArrayList<>());
    }

    @Override
    public List<PathologyType> findAll(List<String> ids) {
        return pathologyTypeCollection.find(in("_id", mapToObjectIds(ids))).into(new ArrayList<>());
    }

    @Override
    public PathologyType findOne(String id) {
        return pathologyTypeCollection.find(eq("_id", new ObjectId(id))).first();
    }

    @Override
    public long count() {
        return pathologyTypeCollection.countDocuments();
    }

    @Override
    public long delete(String id) {
        return pathologyTypeCollection.deleteOne(eq("_id", new ObjectId(id))).getDeletedCount();
    }

    @Override
    public long delete(List<String> ids) {
        try (ClientSession clientSession = client.startSession()) {
            return clientSession.withTransaction(
                    () -> pathologyTypeCollection.deleteMany(clientSession, in("_id", mapToObjectIds(ids))).getDeletedCount(),
                    txnOptions);
        }
    }

    @Override
    public long deleteAll() {
        try (ClientSession clientSession = client.startSession()) {
            return clientSession.withTransaction(
                    () -> pathologyTypeCollection.deleteMany(clientSession, new BsonDocument()).getDeletedCount(), txnOptions);
        }
    }

    @Override
    public PathologyType update(PathologyType pathologyType) {
        FindOneAndReplaceOptions options = new FindOneAndReplaceOptions().returnDocument(AFTER);
        return pathologyTypeCollection.findOneAndReplace(eq("_id", pathologyType.getId()), pathologyType, options);
    }

    @Override
    public long update(List<PathologyType> pathologyTypes) {
        List<WriteModel<PathologyType>> writes = pathologyTypes.stream()
                .map(p -> new ReplaceOneModel<>(eq("_id", p.getId()), p))
                .collect(Collectors.toList());
        try (ClientSession clientSession = client.startSession()) {
            return clientSession.withTransaction(
                    () -> pathologyTypeCollection.bulkWrite(clientSession, writes).getModifiedCount(), txnOptions);
        }
    }

    private List<ObjectId> mapToObjectIds(List<String> ids) {
        return ids.stream().map(ObjectId::new).collect(Collectors.toList());
    }
}
