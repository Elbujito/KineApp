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
import com.model.BilanMusculaire;
import com.repository.BilanMusculaireRepository;
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
public class MongoDBBilanMusculaireRepository implements BilanMusculaireRepository {

    private static final TransactionOptions txnOptions = TransactionOptions.builder()
            .readPreference(ReadPreference.primary())
            .readConcern(ReadConcern.MAJORITY)
            .writeConcern(WriteConcern.MAJORITY)
            .build();
    @Autowired
    private MongoClient client;
    private MongoCollection<BilanMusculaire> bilanMusculaireCollection;

    @PostConstruct
    void init() {
        bilanMusculaireCollection = client.getDatabase("medinotes").getCollection("bilanMusculaires", BilanMusculaire.class);
    }

    @Override
    public BilanMusculaire save(BilanMusculaire bilanMusculaire) {
        bilanMusculaire.setId(new ObjectId());
        bilanMusculaireCollection.insertOne(bilanMusculaire);
        return bilanMusculaire;
    }

    @Override
    public List<BilanMusculaire> saveAll(List<BilanMusculaire> bilanMusculaires) {
        try (ClientSession clientSession = client.startSession()) {
            return clientSession.withTransaction(() -> {
                bilanMusculaires.forEach(p -> p.setId(new ObjectId()));
                bilanMusculaireCollection.insertMany(clientSession, bilanMusculaires);
                return bilanMusculaires;
            }, txnOptions);
        }
    }

    @Override
    public List<BilanMusculaire> findAll() {
        return bilanMusculaireCollection.find().into(new ArrayList<>());
    }

    @Override
    public List<BilanMusculaire> findAll(List<String> ids) {
        return bilanMusculaireCollection.find(in("_id", mapToObjectIds(ids))).into(new ArrayList<>());
    }

    @Override
    public BilanMusculaire findOne(String id) {
        return bilanMusculaireCollection.find(eq("_id", new ObjectId(id))).first();
    }

    @Override
    public long count() {
        return bilanMusculaireCollection.countDocuments();
    }

    @Override
    public long delete(String id) {
        return bilanMusculaireCollection.deleteOne(eq("_id", new ObjectId(id))).getDeletedCount();
    }

    @Override
    public long delete(List<String> ids) {
        try (ClientSession clientSession = client.startSession()) {
            return clientSession.withTransaction(
                    () -> bilanMusculaireCollection.deleteMany(clientSession, in("_id", mapToObjectIds(ids))).getDeletedCount(),
                    txnOptions);
        }
    }

    @Override
    public long deleteAll() {
        try (ClientSession clientSession = client.startSession()) {
            return clientSession.withTransaction(
                    () -> bilanMusculaireCollection.deleteMany(clientSession, new BsonDocument()).getDeletedCount(), txnOptions);
        }
    }

    @Override
    public BilanMusculaire update(BilanMusculaire bilanMusculaire) {
        FindOneAndReplaceOptions options = new FindOneAndReplaceOptions().returnDocument(AFTER);
        return bilanMusculaireCollection.findOneAndReplace(eq("_id", bilanMusculaire.getId()), bilanMusculaire, options);
    }

    @Override
    public long update(List<BilanMusculaire> bilanMusculaires) {
        List<WriteModel<BilanMusculaire>> writes = bilanMusculaires.stream()
                .map(p -> new ReplaceOneModel<>(eq("_id", p.getId()), p))
                .collect(Collectors.toList());
        try (ClientSession clientSession = client.startSession()) {
            return clientSession.withTransaction(
                    () -> bilanMusculaireCollection.bulkWrite(clientSession, writes).getModifiedCount(), txnOptions);
        }
    }

    private List<ObjectId> mapToObjectIds(List<String> ids) {
        return ids.stream().map(ObjectId::new).collect(Collectors.toList());
    }
}
