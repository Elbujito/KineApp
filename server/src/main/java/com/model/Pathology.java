package com.model;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.databind.ser.std.ToStringSerializer;
import org.bson.types.ObjectId;

import java.util.Date;
import java.util.List;
import java.util.Objects;

@JsonInclude(Include.NON_NULL)
public class Pathology {

    @JsonSerialize(using = ToStringSerializer.class)
    private ObjectId id;
    private String name;
    private PathologyType pathologyType;
    private String observationArticulaire;
    private String observationMusculaire;
    private Date createdAt = new Date();
    private Date lastModification = new Date();
    private Prescripteur prescripteur;
    private Localisation localisation;
    private Boolean discover;
    private Boolean active;
    private List<BilanArticulaire> bilanArticulaires;
    private List<BilanMusculaire> bilanMusculaires;
    private List<BilanAlgique> bilanAlgiques;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public PathologyType getPathologyType() {
        return pathologyType;
    }

    public void setPathologyType(PathologyType pathologyType) {
        this.pathologyType = pathologyType;
    }

    public String getObservationArticulaire() {
        return observationArticulaire;
    }

    public void setObservationArticulaire(String observationArticulaire) {
        this.observationArticulaire = observationArticulaire;
    }

    public String getObservationMusculaire() {
        return observationMusculaire;
    }

    public void setObservationMusculaire(String observationMusculaire) {
        this.observationMusculaire = observationMusculaire;
    }

    public Date getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }

    public Prescripteur getPrescripteur() {
        return prescripteur;
    }

    public void setPrescripteur(Prescripteur prescripteur) {
        this.prescripteur = prescripteur;
    }

    public Boolean getDiscover() {
        return discover;
    }

    public void setDiscover(Boolean discover) {
        this.discover = discover;
    }

    public Boolean getActive() {
        return active;
    }

    public void setActive(Boolean active) {
        this.active = active;
    }

    public List<BilanArticulaire> getBilanArticulaires() {
        return bilanArticulaires;
    }

    public void setBilanArticulaires(List<BilanArticulaire> bilanArticulaires) {
        this.bilanArticulaires = bilanArticulaires;
    }

    public List<BilanMusculaire> getBilanMusculaires() {
        return bilanMusculaires;
    }

    public void setBilanMusculaires(List<BilanMusculaire> bilanMusculaires) {
        this.bilanMusculaires = bilanMusculaires;
    }

    public List<BilanAlgique> getBilanAlgiques() {
        return bilanAlgiques;
    }

    public void setBilanAlgiques(List<BilanAlgique> bilanAlgiques) {
        this.bilanAlgiques = bilanAlgiques;
    }

    public Localisation getLocalisation() {
        return localisation;
    }

    public void setLocalisation(Localisation localisation) {
        this.localisation = localisation;
    }

    public Date getLastModification() {
        return lastModification;
    }

    public void setLastModification(Date lastModification) {
        this.lastModification = lastModification;
    }

    public ObjectId getId() {
        return id;
    }

    public Pathology setId(ObjectId id) {
        this.id = id;
        return this;
    }

    @Override
    public String toString() {
        return "Pathology{" + "id=" + id + ", name='"
                + name + '\'' + ", pathologyType='" + pathologyType + '\''
                + ", observationArticulaire='" + observationArticulaire + '\'' + ", observationMusculaire='" + observationMusculaire + '\''
                + ", createdAt=" + createdAt
                + ", lastModification=" + lastModification + ", prescripteur=" + prescripteur
                + ", localisation=" + localisation + ", discover=" + discover
                + ", active=" + active + ", bilanArticulaires=" + bilanArticulaires
                + ", bilanMusculaires=" + bilanMusculaires + ", bilanAlgiques=" + bilanAlgiques +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o)
            return true;
        if (o == null || getClass() != o.getClass())
            return false;
        Pathology pathology = (Pathology) o;
        return name == pathology.name && Objects.equals(id, pathology.id)
                && Objects.equals(pathologyType,pathology.pathologyType) && Objects.equals(observationArticulaire, pathology.observationArticulaire)
                && Objects.equals(observationMusculaire, pathology.observationMusculaire)
                && Objects.equals(createdAt, pathology.createdAt) && Objects.equals(lastModification, pathology.lastModification)
                && Objects.equals(prescripteur, pathology.prescripteur) && Objects.equals(localisation, pathology.localisation)
                && Objects.equals(discover, pathology.discover) && Objects.equals(active, pathology.active)
                && Objects.equals(bilanArticulaires, pathology.bilanArticulaires) && Objects.equals(bilanMusculaires, pathology.bilanMusculaires)
                && Objects.equals(bilanAlgiques, pathology.bilanAlgiques);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, name, pathologyType, observationArticulaire,observationMusculaire,
                createdAt, lastModification, prescripteur, active, localisation,
                discover, active, bilanArticulaires, bilanMusculaires, bilanAlgiques
        );
    }

}