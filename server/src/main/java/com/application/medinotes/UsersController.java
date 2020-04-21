package com.application.medinotes;

import  com.application.medinotes.models.Users;
import  com.application.medinotes.repositories.UsersRepository;

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
@RequestMapping("/")
public class UsersController {
    @Autowired
    private UsersRepository repository;
}