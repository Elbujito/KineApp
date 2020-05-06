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
import com.model.rest.Note;
import com.repository.NoteRepository;
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
public class MongoDBNoteRepository implements NoteRepository {

    private static final TransactionOptions txnOptions = TransactionOptions.builder()
            .readPreference(ReadPreference.primary())
            .readConcern(ReadConcern.MAJORITY)
            .writeConcern(WriteConcern.MAJORITY)
            .build();
    @Autowired
    private MongoClient client;
    private MongoCollection<Note> noteCollection;

    @PostConstruct
    void init() {
        noteCollection = client.getDatabase("medinotes").getCollection("notes", Note.class);
    }

    @Override
    public Note save(Note note) {
        note.setId(new ObjectId());
        noteCollection.insertOne(note);
        return note;
    }

    @Override
    public List<Note> saveAll(List<Note> notes) {
        try (ClientSession clientSession = client.startSession()) {
            return clientSession.withTransaction(() -> {
                notes.forEach(p -> p.setId(new ObjectId()));
                noteCollection.insertMany(clientSession, notes);
                return notes;
            }, txnOptions);
        }
    }

    @Override
    public List<Note> findAll() {
        return noteCollection.find().into(new ArrayList<>());
    }

    @Override
    public List<Note> findAll(List<String> ids) {
        return noteCollection.find(in("_id", mapToObjectIds(ids))).into(new ArrayList<>());
    }

    @Override
    public Note findOne(String id) {
        return noteCollection.find(eq("_id", new ObjectId(id))).first();
    }

    @Override
    public long count() {
        return noteCollection.countDocuments();
    }

    @Override
    public long delete(String id) {
        return noteCollection.deleteOne(eq("_id", new ObjectId(id))).getDeletedCount();
    }

    @Override
    public long delete(List<String> ids) {
        try (ClientSession clientSession = client.startSession()) {
            return clientSession.withTransaction(
                    () -> noteCollection.deleteMany(clientSession, in("_id", mapToObjectIds(ids))).getDeletedCount(),
                    txnOptions);
        }
    }

    @Override
    public long deleteAll() {
        try (ClientSession clientSession = client.startSession()) {
            return clientSession.withTransaction(
                    () -> noteCollection.deleteMany(clientSession, new BsonDocument()).getDeletedCount(), txnOptions);
        }
    }

    @Override
    public Note update(Note note) {
        FindOneAndReplaceOptions options = new FindOneAndReplaceOptions().returnDocument(AFTER);
        return noteCollection.findOneAndReplace(eq("_id", note.getId()), note, options);
    }

    @Override
    public long update(List<Note> notes) {
        List<WriteModel<Note>> writes = notes.stream()
                .map(p -> new ReplaceOneModel<>(eq("_id", p.getId()), p))
                .collect(Collectors.toList());
        try (ClientSession clientSession = client.startSession()) {
            return clientSession.withTransaction(
                    () -> noteCollection.bulkWrite(clientSession, writes).getModifiedCount(), txnOptions);
        }
    }

    private List<ObjectId> mapToObjectIds(List<String> ids) {
        return ids.stream().map(ObjectId::new).collect(Collectors.toList());
    }
}
