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
import com.model.rest.Prescripteur;
import com.repository.PrescripteurRepository;
import org.bson.BsonDocument;
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
public class MongoDBPrescripteurRepository implements PrescripteurRepository {

    private static final TransactionOptions txnOptions = TransactionOptions.builder()
            .readPreference(ReadPreference.primary())
            .readConcern(ReadConcern.MAJORITY)
            .writeConcern(WriteConcern.MAJORITY)
            .build();
    @Autowired
    private MongoClient client;
    private MongoCollection<Prescripteur> prescripteurCollection;

    @PostConstruct
    void init() {
        prescripteurCollection = client.getDatabase("medinotes").getCollection("prescripteurs", Prescripteur.class);
    }

    @Override
    public Prescripteur save(Prescripteur prescripteur) {
        prescripteur.setId(new ObjectId());
        prescripteurCollection.insertOne(prescripteur);
        return prescripteur;
    }

    @Override
    public List<Prescripteur> saveAll(List<Prescripteur> prescripteurs) {
        try (ClientSession clientSession = client.startSession()) {
            return clientSession.withTransaction(() -> {
                prescripteurs.forEach(p -> p.setId(new ObjectId()));
                prescripteurCollection.insertMany(clientSession, prescripteurs);
                return prescripteurs;
            }, txnOptions);
        }
    }

    @Override
    public List<Prescripteur> findAll() {
        return prescripteurCollection.find().into(new ArrayList<>());
    }

    @Override
    public List<Prescripteur> findAll(List<String> ids) {
        return prescripteurCollection.find(in("_id", mapToObjectIds(ids))).into(new ArrayList<>());
    }

    @Override
    public Prescripteur findOne(String id) {
        return prescripteurCollection.find(eq("_id", new ObjectId(id))).first();
    }

    @Override
    public long count() {
        return prescripteurCollection.countDocuments();
    }

    @Override
    public long delete(String id) {
        return prescripteurCollection.deleteOne(eq("_id", new ObjectId(id))).getDeletedCount();
    }

    @Override
    public long delete(List<String> ids) {
        try (ClientSession clientSession = client.startSession()) {
            return clientSession.withTransaction(
                    () -> prescripteurCollection.deleteMany(clientSession, in("_id", mapToObjectIds(ids))).getDeletedCount(),
                    txnOptions);
        }
    }

    @Override
    public long deleteAll() {
        try (ClientSession clientSession = client.startSession()) {
            return clientSession.withTransaction(
                    () -> prescripteurCollection.deleteMany(clientSession, new BsonDocument()).getDeletedCount(), txnOptions);
        }
    }

    @Override
    public Prescripteur update(Prescripteur prescripteur) {
        FindOneAndReplaceOptions options = new FindOneAndReplaceOptions().returnDocument(AFTER);
        return prescripteurCollection.findOneAndReplace(eq("_id", prescripteur.getId()), prescripteur, options);
    }

    @Override
    public long update(List<Prescripteur> prescripteurs) {
        List<WriteModel<Prescripteur>> writes = prescripteurs.stream()
                .map(p -> new ReplaceOneModel<>(eq("_id", p.getId()), p))
                .collect(Collectors.toList());
        try (ClientSession clientSession = client.startSession()) {
            return clientSession.withTransaction(
                    () -> prescripteurCollection.bulkWrite(clientSession, writes).getModifiedCount(), txnOptions);
        }
    }

    private List<ObjectId> mapToObjectIds(List<String> ids) {
        return ids.stream().map(ObjectId::new).collect(Collectors.toList());
    }
}
