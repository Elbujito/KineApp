package com.rest;

import java.util.Optional;
import java.util.stream.Collectors;
import java.util.List;

import com.model.provider.connector.IAuthConnectorProvider;
import com.model.provider.roles.IAuthRolesProvider;
import com.provider.token.IAuthTokenProvider;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.slf4j.Marker;
import org.slf4j.MarkerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.client.BilanClient;
import com.model.rest.Bilan;
import com.repository.BilanRepository;

@RestController
@RequestMapping("/bilan")
@SuppressWarnings("PMD.ExcessiveImports")
public final class BilanController implements BilanClient {

    private static final Marker PUBLIC = MarkerFactory.getMarker("PUBLIC");

    private static final Logger LOG = LoggerFactory.getLogger(BilanController.class);

    private static BilanRepository.DbBilanRepository repo = new BilanRepository.DbBilanRepository();

    @SuppressWarnings("checkstyle:parameternumber")
    public BilanController()
    {

    }

    @Override
    @GetMapping("/all")
    public List<Bilan> getBilans() {
        try {
            return this.repo.getBilans().stream().collect(Collectors.toList());
        }
        catch (Exception e) {
            throw e;
        }
    }
}
