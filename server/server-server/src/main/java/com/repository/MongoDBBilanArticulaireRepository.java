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
import com.model.rest.BilanArticulaire;
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
public class MongoDBBilanArticulaireRepository implements BilanArticulaireRepository {

    private static final TransactionOptions txnOptions = TransactionOptions.builder()
            .readPreference(ReadPreference.primary())
            .readConcern(ReadConcern.MAJORITY)
            .writeConcern(WriteConcern.MAJORITY)
            .build();
    @Autowired
    private MongoClient client;
    private MongoCollection<BilanArticulaire> bilanArticulaireCollection;

    @PostConstruct
    void init() {
        bilanArticulaireCollection = client.getDatabase("medinotes").getCollection("bilanArticulaires", BilanArticulaire.class);
    }

    @Override
    public BilanArticulaire save(BilanArticulaire bilanArticulaire) {
        bilanArticulaire.setId(new ObjectId());
        bilanArticulaireCollection.insertOne(bilanArticulaire);
        return bilanArticulaire;
    }

    @Override
    public List<BilanArticulaire> saveAll(List<BilanArticulaire> bilanArticulaires) {
        try (ClientSession clientSession = client.startSession()) {
            return clientSession.withTransaction(() -> {
                bilanArticulaires.forEach(p -> p.setId(new ObjectId()));
                bilanArticulaireCollection.insertMany(clientSession, bilanArticulaires);
                return bilanArticulaires;
            }, txnOptions);
        }
    }

    @Override
    public List<BilanArticulaire> findAll() {
        return bilanArticulaireCollection.find().into(new ArrayList<>());
    }

    @Override
    public List<BilanArticulaire> findAll(List<String> ids) {
        return bilanArticulaireCollection.find(in("_id", mapToObjectIds(ids))).into(new ArrayList<>());
    }

    @Override
    public BilanArticulaire findOne(String id) {
        return bilanArticulaireCollection.find(eq("_id", new ObjectId(id))).first();
    }

    @Override
    public long count() {
        return bilanArticulaireCollection.countDocuments();
    }

    @Override
    public long delete(String id) {
        return bilanArticulaireCollection.deleteOne(eq("_id", new ObjectId(id))).getDeletedCount();
    }

    @Override
    public long delete(List<String> ids) {
        try (ClientSession clientSession = client.startSession()) {
            return clientSession.withTransaction(
                    () -> bilanArticulaireCollection.deleteMany(clientSession, in("_id", mapToObjectIds(ids))).getDeletedCount(),
                    txnOptions);
        }
    }

    @Override
    public long deleteAll() {
        try (ClientSession clientSession = client.startSession()) {
            return clientSession.withTransaction(
                    () -> bilanArticulaireCollection.deleteMany(clientSession, new BsonDocument()).getDeletedCount(), txnOptions);
        }
    }

    @Override
    public BilanArticulaire update(BilanArticulaire bilanArticulaire) {
        FindOneAndReplaceOptions options = new FindOneAndReplaceOptions().returnDocument(AFTER);
        return bilanArticulaireCollection.findOneAndReplace(eq("_id", bilanArticulaire.getId()), bilanArticulaire, options);
    }

    @Override
    public long update(List<BilanArticulaire> bilanArticulaires) {
        List<WriteModel<BilanArticulaire>> writes = bilanArticulaires.stream()
                .map(p -> new ReplaceOneModel<>(eq("_id", p.getId()), p))
                .collect(Collectors.toList());
        try (ClientSession clientSession = client.startSession()) {
            return clientSession.withTransaction(
                    () -> bilanArticulaireCollection.bulkWrite(clientSession, writes).getModifiedCount(), txnOptions);
        }
    }

    private List<ObjectId> mapToObjectIds(List<String> ids) {
        return ids.stream().map(ObjectId::new).collect(Collectors.toList());
    }
}
