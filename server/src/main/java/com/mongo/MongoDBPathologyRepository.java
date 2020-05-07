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
import com.model.Pathology;
import com.repository.PathologyRepository;
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
public class MongoDBPathologyRepository implements PathologyRepository {

    private static final TransactionOptions txnOptions = TransactionOptions.builder()
            .readPreference(ReadPreference.primary())
            .readConcern(ReadConcern.MAJORITY)
            .writeConcern(WriteConcern.MAJORITY)
            .build();
    @Autowired
    private MongoClient client;
    private MongoCollection<Pathology> pathologyCollection;

    @PostConstruct
    void init() {
        pathologyCollection = client.getDatabase("medinotes").getCollection("pathologies", Pathology.class);
    }

    @Override
    public Pathology save(Pathology pathology) {
        pathology.setId(new ObjectId());
        pathologyCollection.insertOne(pathology);
        return pathology;
    }

    @Override
    public List<Pathology> saveAll(List<Pathology> pathologies) {
        try (ClientSession clientSession = client.startSession()) {
            return clientSession.withTransaction(() -> {
                pathologies.forEach(p -> p.setId(new ObjectId()));
                pathologyCollection.insertMany(clientSession, pathologies);
                return pathologies;
            }, txnOptions);
        }
    }

    @Override
    public List<Pathology> findAll() {
        return pathologyCollection.find().into(new ArrayList<>());
    }

    @Override
    public List<Pathology> findAll(List<String> ids) {
        return pathologyCollection.find(in("_id", mapToObjectIds(ids))).into(new ArrayList<>());
    }

    @Override
    public Pathology findOne(String id) {
        return pathologyCollection.find(eq("_id", new ObjectId(id))).first();
    }

    @Override
    public long count() {
        return pathologyCollection.countDocuments();
    }

    @Override
    public long delete(String id) {
        return pathologyCollection.deleteOne(eq("_id", new ObjectId(id))).getDeletedCount();
    }

    @Override
    public long delete(List<String> ids) {
        try (ClientSession clientSession = client.startSession()) {
            return clientSession.withTransaction(
                    () -> pathologyCollection.deleteMany(clientSession, in("_id", mapToObjectIds(ids))).getDeletedCount(),
                    txnOptions);
        }
    }

    @Override
    public long deleteAll() {
        try (ClientSession clientSession = client.startSession()) {
            return clientSession.withTransaction(
                    () -> pathologyCollection.deleteMany(clientSession, new BsonDocument()).getDeletedCount(), txnOptions);
        }
    }

    @Override
    public Pathology update(Pathology pathology) {
        FindOneAndReplaceOptions options = new FindOneAndReplaceOptions().returnDocument(AFTER);
        return pathologyCollection.findOneAndReplace(eq("_id", pathology.getId()), pathology, options);
    }

    @Override
    public long update(List<Pathology> pathologies) {
        List<WriteModel<Pathology>> writes = pathologies.stream()
                .map(p -> new ReplaceOneModel<>(eq("_id", p.getId()), p))
                .collect(Collectors.toList());
        try (ClientSession clientSession = client.startSession()) {
            return clientSession.withTransaction(
                    () -> pathologyCollection.bulkWrite(clientSession, writes).getModifiedCount(), txnOptions);
        }
    }

    private List<ObjectId> mapToObjectIds(List<String> ids) {
        return ids.stream().map(ObjectId::new).collect(Collectors.toList());
    }
}
