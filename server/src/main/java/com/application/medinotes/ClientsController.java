package com.application.medinotes;

import  com.application.medinotes.models.Clients;
import  com.application.medinotes.repositories.ClientsRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;
import java.util.List;
import org.bson.types.ObjectId;

@RestController
@RequestMapping("/clients")
public class ClientsController {
    @Autowired
    private ClientsRepository repository;

    @RequestMapping(value = "/", method = RequestMethod.GET)
    public List<Clients> getAllClients() {
        return repository.findAll();
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public Clients getClientById(@PathVariable("id") ObjectId id) {
        return repository.findBy_id(id);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.PUT)
    public void modifyClientById(@PathVariable("id") ObjectId id, @Valid @RequestBody Clients clients) {
        clients.set_id(id);
        repository.save(clients);
    }

    @RequestMapping(value = "/", method = RequestMethod.POST)
    public Clients createClient(@Valid @RequestBody Clients clients) {
        clients.set_id(ObjectId.get());
        repository.save(clients);
        return clients;
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    public void deleteClient(@PathVariable ObjectId id) {
        repository.delete(repository.findBy_id(id));
    }
}