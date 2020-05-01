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
import com.model.rest.NoteTemplate;
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
public class MongoDBNoteTemplateRepository implements NoteTemplateRepository {

    private static final TransactionOptions txnOptions = TransactionOptions.builder()
            .readPreference(ReadPreference.primary())
            .readConcern(ReadConcern.MAJORITY)
            .writeConcern(WriteConcern.MAJORITY)
            .build();
    @Autowired
    private MongoClient client;
    private MongoCollection<NoteTemplate> noteTemplateCollection;

    @PostConstruct
    void init() {
        noteTemplateCollection = client.getDatabase("medinotes").getCollection("noteTemplates", NoteTemplate.class);
    }

    @Override
    public NoteTemplate save(NoteTemplate noteTemplate) {
        noteTemplate.setId(new ObjectId());
        noteTemplateCollection.insertOne(noteTemplate);
        return noteTemplate;
    }

    @Override
    public List<NoteTemplate> saveAll(List<NoteTemplate> noteTemplates) {
        try (ClientSession clientSession = client.startSession()) {
            return clientSession.withTransaction(() -> {
                noteTemplates.forEach(p -> p.setId(new ObjectId()));
                noteTemplateCollection.insertMany(clientSession, noteTemplates);
                return noteTemplates;
            }, txnOptions);
        }
    }

    @Override
    public List<NoteTemplate> findAll() {
        return noteTemplateCollection.find().into(new ArrayList<>());
    }

    @Override
    public List<NoteTemplate> findAll(List<String> ids) {
        return noteTemplateCollection.find(in("_id", mapToObjectIds(ids))).into(new ArrayList<>());
    }

    @Override
    public NoteTemplate findOne(String id) {
        return noteTemplateCollection.find(eq("_id", new ObjectId(id))).first();
    }

    @Override
    public long count() {
        return noteTemplateCollection.countDocuments();
    }

    @Override
    public long delete(String id) {
        return noteTemplateCollection.deleteOne(eq("_id", new ObjectId(id))).getDeletedCount();
    }

    @Override
    public long delete(List<String> ids) {
        try (ClientSession clientSession = client.startSession()) {
            return clientSession.withTransaction(
                    () -> noteTemplateCollection.deleteMany(clientSession, in("_id", mapToObjectIds(ids))).getDeletedCount(),
                    txnOptions);
        }
    }

    @Override
    public long deleteAll() {
        try (ClientSession clientSession = client.startSession()) {
            return clientSession.withTransaction(
                    () -> noteTemplateCollection.deleteMany(clientSession, new BsonDocument()).getDeletedCount(), txnOptions);
        }
    }

    @Override
    public NoteTemplate update(NoteTemplate noteTemplate) {
        FindOneAndReplaceOptions options = new FindOneAndReplaceOptions().returnDocument(AFTER);
        return noteTemplateCollection.findOneAndReplace(eq("_id", noteTemplate.getId()), noteTemplate, options);
    }

    @Override
    public long update(List<NoteTemplate> noteTemplates) {
        List<WriteModel<NoteTemplate>> writes = noteTemplates.stream()
                .map(p -> new ReplaceOneModel<>(eq("_id", p.getId()), p))
                .collect(Collectors.toList());
        try (ClientSession clientSession = client.startSession()) {
            return clientSession.withTransaction(
                    () -> noteTemplateCollection.bulkWrite(clientSession, writes).getModifiedCount(), txnOptions);
        }
    }

    private List<ObjectId> mapToObjectIds(List<String> ids) {
        return ids.stream().map(ObjectId::new).collect(Collectors.toList());
    }
}
