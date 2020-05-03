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
import com.model.rest.BilanAlgique;
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
public class MongoDBBilanAlgiqueRepository implements BilanAlgiqueRepository {

    private static final TransactionOptions txnOptions = TransactionOptions.builder()
            .readPreference(ReadPreference.primary())
            .readConcern(ReadConcern.MAJORITY)
            .writeConcern(WriteConcern.MAJORITY)
            .build();
    @Autowired
    private MongoClient client;
    private MongoCollection<BilanAlgique> bilanAlgiqueCollection;

    @PostConstruct
    void init() {
        bilanAlgiqueCollection = client.getDatabase("medinotes").getCollection("bilanAlgiques", BilanAlgique.class);
    }

    @Override
    public BilanAlgique save(BilanAlgique bilanAlgique) {
        bilanAlgique.setId(new ObjectId());
        bilanAlgiqueCollection.insertOne(bilanAlgique);
        return bilanAlgique;
    }

    @Override
    public List<BilanAlgique> saveAll(List<BilanAlgique> bilanAlgiques) {
        try (ClientSession clientSession = client.startSession()) {
            return clientSession.withTransaction(() -> {
                bilanAlgiques.forEach(p -> p.setId(new ObjectId()));
                bilanAlgiqueCollection.insertMany(clientSession, bilanAlgiques);
                return bilanAlgiques;
            }, txnOptions);
        }
    }

    @Override
    public List<BilanAlgique> findAll() {
        return bilanAlgiqueCollection.find().into(new ArrayList<>());
    }

    @Override
    public List<BilanAlgique> findAll(List<String> ids) {
        return bilanAlgiqueCollection.find(in("_id", mapToObjectIds(ids))).into(new ArrayList<>());
    }

    @Override
    public BilanAlgique findOne(String id) {
        return bilanAlgiqueCollection.find(eq("_id", new ObjectId(id))).first();
    }

    @Override
    public long count() {
        return bilanAlgiqueCollection.countDocuments();
    }

    @Override
    public long delete(String id) {
        return bilanAlgiqueCollection.deleteOne(eq("_id", new ObjectId(id))).getDeletedCount();
    }

    @Override
    public long delete(List<String> ids) {
        try (ClientSession clientSession = client.startSession()) {
            return clientSession.withTransaction(
                    () -> bilanAlgiqueCollection.deleteMany(clientSession, in("_id", mapToObjectIds(ids))).getDeletedCount(),
                    txnOptions);
        }
    }

    @Override
    public long deleteAll() {
        try (ClientSession clientSession = client.startSession()) {
            return clientSession.withTransaction(
                    () -> bilanAlgiqueCollection.deleteMany(clientSession, new BsonDocument()).getDeletedCount(), txnOptions);
        }
    }

    @Override
    public BilanAlgique update(BilanAlgique bilanAlgique) {
        FindOneAndReplaceOptions options = new FindOneAndReplaceOptions().returnDocument(AFTER);
        return bilanAlgiqueCollection.findOneAndReplace(eq("_id", bilanAlgique.getId()), bilanAlgique, options);
    }

    @Override
    public long update(List<BilanAlgique> bilanAlgiques) {
        List<WriteModel<BilanAlgique>> writes = bilanAlgiques.stream()
                .map(p -> new ReplaceOneModel<>(eq("_id", p.getId()), p))
                .collect(Collectors.toList());
        try (ClientSession clientSession = client.startSession()) {
            return clientSession.withTransaction(
                    () -> bilanAlgiqueCollection.bulkWrite(clientSession, writes).getModifiedCount(), txnOptions);
        }
    }

    private List<ObjectId> mapToObjectIds(List<String> ids) {
        return ids.stream().map(ObjectId::new).collect(Collectors.toList());
    }
}
