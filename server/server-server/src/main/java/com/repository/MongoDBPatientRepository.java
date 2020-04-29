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
import com.model.rest.Patient;
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
public class MongoDBPatientRepository implements PatientRepository {

    private static final TransactionOptions txnOptions = TransactionOptions.builder()
            .readPreference(ReadPreference.primary())
            .readConcern(ReadConcern.MAJORITY)
            .writeConcern(WriteConcern.MAJORITY)
            .build();
    @Autowired
    private MongoClient client;
    private MongoCollection<Patient> patientCollection;

    @PostConstruct
    void init() {
        patientCollection = client.getDatabase("medinotes").getCollection("patients", Patient.class);
    }

    @Override
    public Patient save(Patient patient) {
        patient.setId(new ObjectId());
        patientCollection.insertOne(patient);
        return patient;
    }

    @Override
    public List<Patient> saveAll(List<Patient> patients) {
        try (ClientSession clientSession = client.startSession()) {
            return clientSession.withTransaction(() -> {
                patients.forEach(p -> p.setId(new ObjectId()));
                patientCollection.insertMany(clientSession, patients);
                return patients;
            }, txnOptions);
        }
    }

    @Override
    public List<Patient> findAll() {
        return patientCollection.find().into(new ArrayList<>());
    }

    @Override
    public List<Patient> findAll(List<String> ids) {
        return patientCollection.find(in("_id", mapToObjectIds(ids))).into(new ArrayList<>());
    }

    @Override
    public Patient findOne(String id) {
        return patientCollection.find(eq("_id", new ObjectId(id))).first();
    }

    @Override
    public long count() {
        return patientCollection.countDocuments();
    }

    @Override
    public long delete(String id) {
        return patientCollection.deleteOne(eq("_id", new ObjectId(id))).getDeletedCount();
    }

    @Override
    public long delete(List<String> ids) {
        try (ClientSession clientSession = client.startSession()) {
            return clientSession.withTransaction(
                    () -> patientCollection.deleteMany(clientSession, in("_id", mapToObjectIds(ids))).getDeletedCount(),
                    txnOptions);
        }
    }

    @Override
    public long deleteAll() {
        try (ClientSession clientSession = client.startSession()) {
            return clientSession.withTransaction(
                    () -> patientCollection.deleteMany(clientSession, new BsonDocument()).getDeletedCount(), txnOptions);
        }
    }

    @Override
    public Patient update(Patient patient) {
        FindOneAndReplaceOptions options = new FindOneAndReplaceOptions().returnDocument(AFTER);
        return patientCollection.findOneAndReplace(eq("_id", patient.getId()), patient, options);
    }

    @Override
    public long update(List<Patient> patients) {
        List<WriteModel<Patient>> writes = patients.stream()
                .map(p -> new ReplaceOneModel<>(eq("_id", p.getId()), p))
                .collect(Collectors.toList());
        try (ClientSession clientSession = client.startSession()) {
            return clientSession.withTransaction(
                    () -> patientCollection.bulkWrite(clientSession, writes).getModifiedCount(), txnOptions);
        }
    }

    @Override
    public double getAverageAge() {
        List<Bson> pipeline = asList(group(new BsonNull(), avg("averageAge", "$age")), project(excludeId()));
        return patientCollection.aggregate(pipeline, AverageAgeDTO.class).first().getAverageAge();
    }

    private List<ObjectId> mapToObjectIds(List<String> ids) {
        return ids.stream().map(ObjectId::new).collect(Collectors.toList());
    }
}
